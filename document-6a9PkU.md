```yaml
# 🐳 AIUZ Infrastructure Configuration Suite v4.0

**[DOCUMENT_TYPE]:** Infrastructure_Config  
**[VERSION]:** 4.0.0  
**[AUTHOR_ID]:** AIUZ2025  
**[DATE_CREATED]:** 2025-07-16  
**[LANGUAGE_SCOPE]:** EN-∅  
**[HASH]:** INFRA4_[autogen_SHA256]  
**[SESSION_ID]:** AIUZ_INFRA_CONFIG_PROD_V4  
**[QR_SIGNATURE]:** AIUZ://infra/config/v4@aiuz2025.local

---

## 📋 ОБЗОР ДОКУМЕНТА

**Назначение:** Production-ready конфигурации Docker и Kubernetes  
**Статус:** Готов к deployment  
**Совместимость:** Docker 20+, Kubernetes 1.24+  
**Окружения:** Development, Staging, Production

---

# ========================
# Dockerfile for SemanticCore
# ========================
FROM python:3.11-slim as semantic-core

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user for security
RUN useradd --create-home --shell /bin/bash aiuz
RUN chown -R aiuz:aiuz /app
USER aiuz

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/semantic/health || exit 1

EXPOSE 8080

CMD ["uvicorn", "semantic_core:app", "--host", "0.0.0.0", "--port", "8080"]

---
# ========================
# requirements.txt
# ========================
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
redis==5.0.1
pydantic==2.5.0
cryptography==41.0.8
prometheus-client==0.19.0
structlog==23.2.0
httpx==0.25.2

---
# ========================
# docker-compose.yml for Development
# ========================
version: '3.8'

services:
  semantic-core:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgresql://aiuz:aiuz_pass@postgres:5432/aiuz_semantic
      - REDIS_URL=redis://redis:6379
      - BLOCKCHAIN_NODE=enabled
      - ENCRYPTION=quantum
      - LOG_LEVEL=INFO
    depends_on:
      - postgres
      - redis
    volumes:
      - ./logs:/app/logs
    networks:
      - aiuz-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=aiuz_semantic
      - POSTGRES_USER=aiuz
      - POSTGRES_PASSWORD=aiuz_pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - aiuz-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - aiuz-network

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/
```
