import { sum } from "./sample.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { shortUrlGenerator } from "../utils/shortUrlGenerator.js";


//sample test
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

//password.js
it("hashedPassword verify should be true", async () => {
  const hashedPassword = await hashPassword("abc");
  expect(verifyPassword(hashedPassword, "abc")).toBeTruthy();
});

it("hashedPassword verify should be false", async () => {
  const hashedPassword = await hashPassword("abc");
  expect(await verifyPassword(hashedPassword, "cba")).toBeFalsy();
});

//shortUrlGenerator.js
it("shortUrlGenerator should generate 7 letter base64 string",  () => {
  expect(shortUrlGenerator()).toMatch(/^[0-9A-Za-z_-]{7}$/gm);
})
