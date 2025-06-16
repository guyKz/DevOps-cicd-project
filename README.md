# Finance Tracker DevOps CI/CD Project

[![CI Pipeline](https://github.com/YOUR_USERNAME/DevOps-cicd-project/workflows/CI%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/DevOps-cicd-project/actions)
[![CD Pipeline](https://github.com/YOUR_USERNAME/DevOps-cicd-project/workflows/CD%20Pipeline/badge.svg)](https://github.com/YOUR_USERNAME/DevOps-cicd-project/actions)

## 📋 Project Overview

A fully automated CI/CD pipeline for a Finance Tracker API built with Node.js, featuring Docker containerization, GitHub Actions, and comprehensive monitoring with Prometheus and Grafana.

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Developer     │───▶│   GitHub     │───▶│  GitHub Actions │
│                 │    │  Repository  │    │    CI/CD        │
└─────────────────┘    └──────────────┘    └─────────────────┘
                                                   │
                                                   ▼
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Docker Hub    │◀───│     CI       │───▶│   Render.com    │
│   (Registry)    │    │   Pipeline   │    │   (Deployment)  │
└─────────────────┘    └──────────────┘    └─────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Monitoring Stack                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐│
│  │   Finance   │ │ Prometheus  │ │       Grafana           ││
│  │     API     │ │  (Metrics)  │ │    (Dashboards)         ││
│  └─────────────┘ └─────────────┘ └─────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Node Exporter (System Metrics)            ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Backend API
- **Node.js Express** application
- **3 API endpoints**: Health, Transactions, Dashboard
- **Prometheus metrics** integration
- **Comprehensive unit tests** with Jest

### CI/CD Pipeline
- **GitHub Actions** workflows
- **ESLint** code quality checks
- **Automated testing** with Jest
- **Docker image** building and pushing
- **Automated deployment** to Render

### Monitoring
- **Prometheus** metrics collection
- **Grafana** dashboards
- **Node Exporter** system metrics
- **Custom application** metrics

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| GET | `/metrics` | Prometheus metrics |
| POST | `/api/transactions` | Create transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/dashboard` | Dashboard overview |

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/DevOps-cicd-project.git
cd DevOps-cicd-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run tests:**
```bash
npm test
```

4. **Start the application:**
```bash
npm start
```

### Docker Compose (Full Stack)

1. **Start all services:**
```bash
docker-compose up
```

2. **Access services:**
- **Finance API**: http://localhost:3000
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)
- **Node Exporter**: http://localhost:9100

## 🔄 CI/CD Workflow

### Continuous Integration (CI)
Triggered on: **Pull Requests** and **Push to main**

1. **Code Quality**: ESLint checks
2. **Testing**: Jest unit tests
3. **Build**: Docker image creation
4. **Status**: Required for merge

### Continuous Deployment (CD)
Triggered on: **Push to main branch**

1. **Build**: Create Docker image
2. **Push**: Upload to Docker Hub
3. **Deploy**: Automatic deployment to Render
4. **Verify**: Health checks

## 📊 Monitoring & Metrics

### Application Metrics
- **Request Counter**: `finance_api_requests_total`
- **Response Time**: `finance_api_response_time_seconds`

### System Metrics
- **CPU Usage**: Node Exporter
- **Memory Usage**: Node Exporter
- **Disk I/O**: Node Exporter

### Grafana Dashboards
- Import dashboard from: `grafana/dashboards/finance-dashboard.json`
- Pre-configured panels for API and system metrics

## 🔒 Repository Rules

- ✅ **Pull Request Required** before merging
- ✅ **1 Required Approval**
- ✅ **Status Checks Must Pass**
- ✅ **Conversations Must Be Resolved**
- ✅ **Branches Must Be Up to Date**

## 🌐 Live Deployment

 [Your Render URL]

Test the live API:
```bash
curl https://your-app-name.onrender.com/health
```

## 📝 Development Workflow

1. **Create feature branch**
2. **Make changes**
3. **Run tests locally**
4. **Create Pull Request**
5. **CI pipeline runs**
6. **Get approval**
7. **Merge to main**
8. **CD pipeline deploys**

## 🧪 Testing

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run with coverage
npm test -- --coverage
```

## 📦 Docker

### Build image:
```bash
docker build -t finance-tracker-api .
```

### Run container:
```bash
docker run -p 3000:3000 finance-tracker-api
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit Pull Request


