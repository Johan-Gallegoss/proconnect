<#
Script para ejecutar todas las pruebas unitarias y generar reportes de cobertura (Jacoco)
en los microservicios del backend de ProConnect.
#>

$services = @("microservicio-usuario", "microservicio-profesion", "microservicio-rol", "bff-api-gateway")
$basePath = ".\backend"

Write-Host "======================================================="
Write-Host "   Iniciando Ejecución de Pruebas Unitarias y Jacoco   "
Write-Host "======================================================="

foreach ($service in $services) {
    $servicePath = Join-Path -Path $basePath -ChildPath $service
    if (Test-Path $servicePath) {
        Write-Host "`n[+] Procesando $service ..."
        Push-Location $servicePath
        # Ejecutar Maven (ignorar errores para continuar con el resto en caso de fallo en uno)
        try {
            .\mvnw.cmd clean test jacoco:report
            Write-Host "[OK] Reporte generado para $service" -ForegroundColor Green
        } catch {
            Write-Host "[ERROR] Fallo al ejecutar pruebas en $service" -ForegroundColor Red
        }
        Pop-Location
    } else {
        Write-Host "[-] Directorio no encontrado: $servicePath" -ForegroundColor Yellow
    }
}

Write-Host "`n======================================================="
Write-Host " Ejecución completada. Los reportes HTML se encuentran"
Write-Host " en las carpetas: backend/<microservicio>/target/site/jacoco/"
Write-Host "======================================================="
