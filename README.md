# URLShortner App – High-Throughput URL Shortener

[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

A robust MERN-stack service engineered for speed and security, capable of handling high-volume redirection requests with minimal latency.

## 🚀 Key Features
* [cite_start]**Extreme Low Latency**: Achieved a **70% reduction in redirection latency** by implementing a **cache-aside strategy** with Redis[cite: 43].
* [cite_start]**High Scalability**: Supports **100+ requests per minute** with O(1) lookup efficiency via in-memory caching[cite: 44].
* [cite_start]**Injection Protection**: Built a robust validation layer using **Joi and Validator.js**, reducing NoSQL injection risks by **95%**[cite: 45].
* [cite_start]**Dual-Layer Storage**: Combines MongoDB for persistent storage and Redis for high-speed caching[cite: 44].

## 🛠️ Tech Stack
* **Frontend**: React.js, TypeScript.
* **Backend**: Node.js, Express.js.
* **Caching**: Redis.
* **Database**: MongoDB.
* **Validation**: Joi, Validator.js.

## ⚙️ Installation
1. `git clone https://github.com/Harsh-Kumar-Mishra2006/URLShortner-frontend.git`
2. `npm install`
3. Configure `.env` with `REDIS_URL` and `MONGODB_URI`.
4. `npm run dev`
