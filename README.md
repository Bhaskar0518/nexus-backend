# NEXUS — Auto Scaling E-Commerce Website

> Full-stack cloud-based e-commerce platform deployed on AWS with real auto-scaling infrastructure.


## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Cloud | AWS EC2, Application Load Balancer, Auto Scaling Group |
| Process Manager | PM2 |

---

## ☁️ AWS Architecture

```
User (Browser)
     │
     ▼
Application Load Balancer (nexus-alb · port 80)
     │
     ├──────────────────────┐
     ▼                      ▼
EC2 Instance 1         EC2 Instance 2
(nexus-backend)        (Auto Scaled)
us-east-1d             us-east-1c
port 3001              port 3001
     │                      │
     └──────────┬───────────┘
                ▼
         MongoDB Atlas
          (nexusdb)
```

- ALB distributes traffic across multiple EC2 instances
- Auto Scaling Group launches/terminates instances based on CPU utilization
- Health checks ensure only healthy instances receive traffic
- Multi-AZ deployment across us-east-1c and us-east-1d
- Security groups allow ports 22, 80, 443, 3001

---

## ⚙️ Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/nexus-ecommerce-aws.git
cd nexus-ecommerce-aws
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
# Edit .env and add your MongoDB URI
```

### 4. Run locally
```bash
node server.js
# Visit http://localhost:3001
```

---

## 🌩️ AWS Deployment

### 1. Launch EC2 instance (t3.micro)
### 2. SSH into instance
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

### 3. Install Node.js and PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -g pm2
```

### 4. Upload files via SCP
```bash
scp -i "your-key.pem" -r ./nexus-ecommerce-aws ubuntu@your-ec2-ip:/home/ubuntu/
```

### 5. Start with PM2
```bash
cd /home/ubuntu/nexus-ecommerce-aws
npm install
pm2 start server.js --name nexus-backend
pm2 save
```

---

## 📁 Project Structure

```
nexus-ecommerce-aws/
├── server.js          # Node.js + Express backend
├── Nexus.html         # Frontend (HTML/CSS/JS)
├── package.json       # Dependencies
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
├── models/
│   └── Order.js       # MongoDB order schema
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Serves frontend |
| POST | /api/orders | Save new order to MongoDB |
| GET | /api/orders | Fetch all orders |

---

## 👨‍💻 Author

**Bhaskaran V** — Reg No. 43110145  
Dept. of CSE, Sathyabama Institute of Science & Technology

---

## 📄 License
MIT
