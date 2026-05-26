# ================================================
# Script para levantar todos los microservicios
# de Proconnect en ventanas separadas
# ================================================

$root = $PSScriptRoot

# Recrear base de datos desde cero al iniciar (cambiar a "update" para no borrar los datos existentes)
$env:DB_DDL_AUTO="create"

Write-Host "Iniciando BFF API Gateway en puerto 8080..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend\bff-api-gateway'; .\mvnw spring-boot:run"

Start-Sleep -Seconds 3

Write-Host "Iniciando Microservicio Usuario en puerto 8081..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend\microservicio-usuario'; .\mvnw spring-boot:run"

Start-Sleep -Seconds 3

Write-Host "Iniciando Microservicio Profesion en puerto 8082..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend\microservicio-profesion'; .\mvnw spring-boot:run"

Start-Sleep -Seconds 3

Write-Host "Iniciando Microservicio Rol en puerto 8083..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend\microservicio-rol'; .\mvnw spring-boot:run"

Write-Host "Iniciando Frontend (React/Vite) en puerto 5173..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend\app'; npm run dev"

Write-Host ""
Write-Host "================================================" -ForegroundColor White
Write-Host "  Todos los servicios iniciando..." -ForegroundColor White
Write-Host "------------------------------------------------" -ForegroundColor White
Write-Host "  Frontend     -> http://localhost:5173" -ForegroundColor Blue
Write-Host "  BFF Gateway  -> http://localhost:8080/api/gateway/status" -ForegroundColor Cyan
Write-Host "  Usuario      -> http://localhost:8081/api/users" -ForegroundColor Green
Write-Host "  Profesion    -> http://localhost:8082/api/professions" -ForegroundColor Yellow
Write-Host "  Rol          -> http://localhost:8083/api/roles" -ForegroundColor Magenta
Write-Host "================================================" -ForegroundColor White
