import axios from "axios";
import { createUrl, updateCustomUrl, getUrlById } from "../models/url_model.js";
import { shortUrlGenerator } from "../../util/shortUrlGenerator.js";
import { crawImgs } from "../../util/crawler.js";
import { setUrlCache } from "../../util/cache.js";
const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } =
  process.env;
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

const createShortUrl = async (req, res) => {
  const { long_url } = req.body;
  let company_id = 1;
  if (req.body.company_id) {
    company_id = req.body.company_id;
  }
  if (req.headers["referer"].split("/")[4]) {
    company_id = req.headers["referer"].split("/")[4];
  }

  const uniqueUrl = await generateUniqueUrl(company_id, long_url);

  const setCache = await setUrlCache(
    uniqueUrl,
    `${uniqueUrl.insertId} ${long_url}`
  );
  return res.status(200).redirect(`/url/modify/${uniqueUrl.insertId}`);
};

async function generateUniqueUrl(company_id, long_url) {
  let short_url;
  let url;
  while (!url || url.errno === 1062) {
    try {
      short_url = shortUrlGenerator();
      url = await createUrl(company_id, short_url, long_url);
    } catch (error) {
      console.error(error);
      continue;
    }
  }
  return url;
}

const updateShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const { short_url, long_url, title, description, picture_url } = req.body;
  let picture = "";
  if (req.file) {
    picture = req.file.key;
  } else if (picture_url) {
    try {
      const response = await axios.get(picture_url, {
        responseType: "arraybuffer",
      });
      const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${Date.now()}-${Math.round(Math.random() * 10000)}`,
        Body: response.data,
      };
      const command = new PutObjectCommand(params);
      const uploadResult = await s3Client.send(command);
      picture = params.Key;
    } catch (error) {
      console.error(error);
    }
  }
  try {
    const url = await updateCustomUrl(
      url_id,
      short_url,
      long_url,
      picture,
      title,
      description
    );
  } catch (err) {
    if (err.errno == 1062) {
      return res.status(403).json("Short Url Already Exist");
    }
  }
  const setCache = await setUrlCache(short_url, `${url_id} ${long_url}`);
  const urlInfo = await getUrlById(url_id);
  const companyId = urlInfo[0].company_id;

  return res.status(200).redirect(`/company/${companyId}`);
};

const getShortUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[4];
  const url = await getUrlById(url_id);
  const meta = await crawImgs(url[0].long_url);
  url[0].meta = meta;
  res.status(200).json(url);
};

export { createShortUrl, updateShortUrl, getShortUrl };
