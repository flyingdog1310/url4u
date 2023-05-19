# URL4U ![license](https://badgen.net/badge/license/MIT/blue)  ![release](https://badgen.net/github/release/flyingdog1310/url4u/) 
---
An easy-to-use URL shortener service with customizable preview and tracking feature, designed specifically for digital marketing.
## Features
---
1. Instantly shorten URLs with a single click.
2. Customize preview images and titles for short URLs on Facebook, Line, Discord, and Twitter.
3. Server-side crawler provides suggested previews for URL links.
4. Track URL clicks with detailed information including referrer, device, IP location, and time.
5. Efficiently compare URL performance with URL grouping and analytics dashboard.
6. Collaboration between marketing team and data analysts with group user management.
7. Reliable and scalable service capable of handling high traffic loads.

## System Architecture challenges
---
### How to Handle high read loads
---
The reason I want to challenge this problem is because I want to tackle a high-traffic scenario.
Before the project, I collaborated with colleagues on three different URL shortening systems (as shown below). At that time, the functionality we implemented was URL generation and retrieval.
![Sharding](https://github.com/flyingdog1310/url4u/assets/116939147/e19ced2d-c67e-4cf0-b9ca-6e97b29f3f77)
![UGS](https://github.com/flyingdog1310/url4u/assets/116939147/6ad2b104-9f16-4d1f-95fa-aafa03e07b5b)
![AutoIncrement](https://github.com/flyingdog1310/url4u/assets/116939147/77547b68-fcce-4ba7-b09f-57b9bd659bf7)




In a simple URL shortening scenario, the database read operations (retrieving long URL) far outnumbered the write operations (generating short URL). We were able to address the high read load simply by using MySQL replication, where we set up a database for writing and multiple backup databases for reading.
However, high write load is much more complex to handle ...

### How to handle high write loads
---
URL tracking involves a large amount of click data that needs to be written and organized in real time.  
Since MySQL Replication cannot solve the write load issue, I decided to adopt the following system architecture: 

![PlanA](https://github.com/flyingdog1310/url4u/assets/116939147/c7fac91d-e2bd-4ceb-97a0-24ebd93d2d16)

I use following tools to support high write load:  
Apache Kafka - a high-throughput, scalable, and reliable distributed messaging broker. It serve as a buffer for peak traffic to reduce the pressure on database writes. Additionally, it enables convenient multiple processing of data using consumers.

Apache Cassandra - a highly scalable, distributed NoSQL database system that supports real-time, high-concurrency write operations for log data.

After completing the planning and setup of Kafka and Cassandra, I began studying Apache Flink and spent approximately three days learning the necessary Java and Maven skills. However, I soon realized that basic knowledge of Java alone was insufficient to write the scripts required for Apache Flink. As a result, I made the decisive decision to re-plan and switch to my current Plan B.

![PlanB](https://github.com/flyingdog1310/url4u/assets/116939147/84d52546-4dd2-4aa2-ba71-3eefce6376d5)

I replaced the original tasks that were supposed to be done with Apache Flink by using Redis and crontab. I utilized Redis, known for its fast read and write capabilities, to organize and store real-time data for one hour. Then, I scheduled a crontab job to fetch the aggregated data and store it in MySQL every hour. This way, I completed my backend architecture.

## Reliability
---
## How to set up dev
---
## Contact
---
