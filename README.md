# URL4U ![license](https://badgen.net/badge/license/MIT/blue)  ![release](https://badgen.net/github/release/flyingdog1310/url4u/)  

An easy-to-use URL shortener service with customizable preview and tracking feature, designed specifically for digital marketing. 

Website Link: <a href="https://url4u.today/" target="_blank">https://url4u.today/</a>

Project Demo: <a href="https://url4u.today/YouTube_demo" target="_blank">https://url4u.today/YouTube_demo</a>

## Table of Contents   
* [Features](#-features)
* [System Architecture Challenges](#-system-architecture-challenges)
  * [How to handle high read loads](#-how-to-handle-high-read-loads)
  * [How to handle high write loads](#-how-to-handle-high-write-loads)
  * [How to offer suggestion images by server-side crawler](#-how-to-offer-suggestion-images-by-serverside-crawler)
* [Load Test](#-load-test)
* [Resources planning](#-resources-planning)
* [Table Schema](#-table-schema)
* [Contact](#-contact)

## 💻 Features

1. Instantly shorten URLs with a single click.
2. Customize preview images and titles for short URLs on Facebook, Line, Discord, and Twitter.
3. Server-side crawler provides suggested previews for URL links.
4. Track URL clicks with detailed information including referrer, device, IP location, and time.
5. Efficiently compare URL performance with URL grouping and analytics dashboard.
6. Collaboration between marketing team and data analysts with group user management.
7. Reliable and scalable service capable of handling high traffic loads.  

## 💪 System Architecture Challenges

### 📖 How to handle high read loads

To allow for the freedom to define and modify short URLs, URL4U has chosen sharding as the mechanism for generating and storing short URLs.  
![Sharding](https://github.com/flyingdog1310/url4u/assets/116939147/e19ced2d-c67e-4cf0-b9ca-6e97b29f3f77)

### 📝 How to handle high write loads

URL tracking involves a large amount of click data that needs to be written and organized in real time.  
Since MySQL Replication cannot solve the write load issue, I decided to adopt the following system architecture: 

![PlanB](https://github.com/flyingdog1310/url4u/assets/116939147/84d52546-4dd2-4aa2-ba71-3eefce6376d5)

I use following tools to support high write load:  

[Apache Kafka](https://kafka.apache.org/) - a high-throughput, scalable, and reliable distributed messaging broker. It serve as a buffer for peak traffic to reduce the pressure on database writes. Additionally, it enables convenient multiple processing of data using consumers.

[Apache Cassandra](https://cassandra.apache.org/_/index.html) - a highly scalable, distributed NoSQL database system that supports real-time, high-concurrency write operations for log data.

[Redis](https://redis.io/) - known for its fast read and write capabilities. It organize and store real-time click data for one hour period.

Linux crontab - I scheduled a crontab job to fetch the aggregated data and store it in MySQL every hour. 

### 🔍 How to offer suggestion images by server-side crawler

In this project, two different methods can be chosen to fetch web page images for user reference, which can be configured in the .env file.

1. Axios with Googlebot header: This method involves directly requesting the HTML of the target web page using Axios with a Googlebot header. It offers fast response times and low server resource consumption. However, it has a limitation in that it cannot retrieve images that require running JavaScript or making API calls.

2. Playwright: This method involves using a headless browser, such as Playwright, on the server to access the target web page. The crawling process waits for the JavaScript and CSS to render completely before extracting the images. The advantage of this approach is that it can crawl images from almost any website. However, it comes with the drawback of slower speed and higher consumption of server CPU and RAM resources.  

## 🚀 Load Test
Request per min | Median res time | Capable time | EC2 instances |
----------------|-----------------|--------------|---------------|
 90,000         |    < 1sec       |  over 10 min |  t2.micro*5   |
 120,000        |    < 1sec       |  over 1 min  |  t2.micro*5   |

To ensure the stability of the URL shortening service under high redirect traffic, I conducted stress testing using k6. Since my development environment on Mac couldn't handle more than 50,000 requests per minute, I used an Amazon EC2 Ubuntu instance to install k6 for testing.

Based on the usage of five t2.micro servers, I observed that the servers were capable of consistently handling 90,000 redirect requests per minute, writing analytical data, and maintaining response times below one second for the median. Additionally, I monitored the CPU and RAM usage of each server and found it to remain stable below 80%.

The servers were able to handle peak loads of 120,000 redirect requests per minute , writing analytical data, and maintaining response times below one second for the median. However, it was observed that the server's RAM usage gradually increased after one minute, eventually reaching 100% utilization and necessitating a restart.

If there is a need to increase load performance, it is worth considering adding more servers to the setup.

## 🔑 Resources Planning

### URL collision rate  

7 letter base62 = 3.5216146e+12 unique short URL  
assume 200 URL is generated per second  
=> 17,280,000 URL is generated per day  
=> 6,307,200,000 URL is gernerated per year  

6,307,200,000/3.5216146e+12=0.00179099666  
collision rate in one year is roughly 0.002  

### Redis storage  

According to [Redis.io](https://redis.io/docs/getting-started/faq/)  
Redis can handle up to 2^32 keys, and was tested in practice to handle at least 250 million keys per instance.  
Every hash, list, set, and sorted set, can hold 2^32 elements.  

URL4U use redis for  
1. current hour click tracking data(expires in 2 hours)  
2. cache for last used long url(expires in 1 hours)  


## 📋 Table Schema

![TableSchema](/tableSchema.jpg)

## 📱 Contact

Email : liudahsing84@gmail.com  

Linkedin : https://url4u.today/Ed_Linkedin  

Phone : (+886) 923-588-981  
