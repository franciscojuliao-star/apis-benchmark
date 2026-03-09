# APIs REST - Projetos

Quatro APIs conectadas ao mesmo banco PostgreSQL (`projetos_db`).

> **Importante:** Por um conflito de rede no Windows (proxy WSL2), o PostgreSQL só responde via IPv6 (`::1`). Todos os projetos já estão configurados para isso.

---

## FastAPI (Python) — Porta 8005

```bash
cd fastapi
venv/Scripts/activate
uvicorn main:app --port 8005 --host 0.0.0.0
```

- API: http://localhost:8005/projetos/
- Swagger: http://localhost:8005/docs

---

## Node.js (Express) — Porta 3000

```bash
cd node
node src/app.js
```

- API: http://localhost:3000/projetos
- Swagger: http://localhost:3000/api-docs

---

## Ruby on Rails — Porta 3001

```bash
cd rails
bundle exec rails server -p 3001 -b 0.0.0.0
```

- API: http://localhost:3001/projetos
- Swagger: http://localhost:3001/api-docs/index.html

---

## Spring Boot (Java) — Porta 8082

```bash
cd spring
apache-maven-3.9.6/bin/mvn spring-boot:run
```

- API: http://localhost:8082/projetos
- Swagger: http://localhost:8082/swagger-ui

---

## Monitoramento de Memória (PowerShell)

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

---

## Parar os Servidores (PowerShell)

```powershell
Stop-Process -Name python -Force  # FastAPI
Stop-Process -Name java -Force    # Spring Boot
Stop-Process -Name node -Force    # Node.js
Stop-Process -Name ruby -Force    # Rails
```

---

## Banco de Dados

- PostgreSQL 18
- Host: `::1` (IPv6 localhost)
- Porta: `5432`
- Banco: `projetos_db`
- Usuário: `postgres`
- Senha: `1234`