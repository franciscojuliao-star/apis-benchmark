# apis-benchmark

Quatro APIs REST conectadas ao mesmo banco PostgreSQL (`projetos_db`), criadas para comparação de performance via JMeter.

| Framework | Linguagem | Porta |
|-----------|-----------|-------|
| FastAPI | Python | 8005 |
| Spring Boot | Java | 8082 |
| Node.js (Express) | JavaScript | 3000 |
| Ruby on Rails | Ruby | 3001 |

---

## Pré-requisitos

- PostgreSQL rodando em `localhost:5432` com o banco `projetos_db` criado
- Python 3.10+
- Java 17+
- Node.js 18+
- Ruby 3.2+ e Bundler

---

## FastAPI (Python) — Porta 8005

```bash
cd fastapi

# Criar e ativar ambiente virtual
python -m venv venv
venv/Scripts/activate        # Windows
# source venv/bin/activate   # Linux/Mac

# Instalar dependências
pip install -r requirements.txt

# Rodar
uvicorn main:app --host 0.0.0.0 --port 8005
```

- API: http://localhost:8005/projetos/
- Swagger: http://localhost:8005/docs

---

## Spring Boot (Java) — Porta 8082

```bash
cd spring

# Instalar dependências e rodar
apache-maven-3.9.6/bin/mvn spring-boot:run
```

> O Maven baixa as dependências automaticamente no primeiro run.

- API: http://localhost:8082/projetos
- Swagger: http://localhost:8082/swagger-ui

---

## Node.js (Express) — Porta 3000

```bash
cd node

# Instalar dependências
npm install

# Rodar
node src/app.js
```

- API: http://localhost:3000/projetos
- Swagger: http://localhost:3000/api-docs

---

## Ruby on Rails — Porta 3001

```bash
cd rails

# Instalar dependências
bundle install

# Rodar
rails server -p 3001 -b 0.0.0.0
```

- API: http://localhost:3001/projetos
- Swagger: http://localhost:3001/api-docs/index.html

---

## Banco de Dados

PostgreSQL 18 — configure as variáveis de ambiente antes de subir os projetos:

```bash
DB_HOST=localhost   # ou ::1 se usar WSL2
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
```

> **Windows + WSL2:** o PostgreSQL pode responder apenas via IPv6 (`::1`). Todos os projetos já estão configurados para isso como padrão.

---

## Monitoramento de RAM (PowerShell)

Rode em um PowerShell separado enquanto o JMeter estiver rodando:

```powershell
# FastAPI
while ($true) {
    $mem = (Get-Process -Name python -ErrorAction SilentlyContinue | Measure-Object WorkingSet64 -Sum).Sum / 1MB
    Write-Host "$(Get-Date -Format 'HH:mm:ss') | FastAPI RAM: $([math]::Round($mem,1)) MB"
    Start-Sleep -Seconds 2
}
```

```powershell
# Spring Boot
while ($true) {
    $mem = (Get-Process -Name java -ErrorAction SilentlyContinue | Measure-Object WorkingSet64 -Sum).Sum / 1MB
    Write-Host "$(Get-Date -Format 'HH:mm:ss') | Java RAM: $([math]::Round($mem,1)) MB"
    Start-Sleep -Seconds 2
}
```

```powershell
# Node.js
while ($true) {
    $mem = (Get-Process -Name node -ErrorAction SilentlyContinue | Measure-Object WorkingSet64 -Sum).Sum / 1MB
    Write-Host "$(Get-Date -Format 'HH:mm:ss') | Node RAM: $([math]::Round($mem,1)) MB"
    Start-Sleep -Seconds 2
}
```

```powershell
# Rails
while ($true) {
    $mem = (Get-Process -Name ruby -ErrorAction SilentlyContinue | Measure-Object WorkingSet64 -Sum).Sum / 1MB
    Write-Host "$(Get-Date -Format 'HH:mm:ss') | Rails RAM: $([math]::Round($mem,1)) MB"
    Start-Sleep -Seconds 2
}
```

---

## Parar os Servidores (PowerShell)

```powershell
Stop-Process -Name python -Force  # FastAPI
Stop-Process -Name java -Force    # Spring Boot
Stop-Process -Name node -Force    # Node.js
Stop-Process -Name ruby -Force    # Rails
```