# Guía de Pruebas Unitarias y Generación de Reportes

Esta guía detalla cómo ejecutar la suite de pruebas automatizadas del proyecto ProConnect y cómo visualizar las métricas de cobertura de código generadas por la herramienta **Jacoco**.

## Prerrequisitos
- Tener Java 17+ instalado y configurado en el PATH.
- (Opcional pero recomendado) PowerShell para ejecutar el script automatizado.

## Ejecución Automatizada (Recomendado)

En la raíz del proyecto, se ha provisto un script de PowerShell (`run-tests-coverage.ps1`) que se encarga de navegar por cada uno de los microservicios y ejecutar las pruebas junto con la generación del reporte.

Para ejecutarlo, abre PowerShell en la raíz del proyecto (`c:\Users\pitters\Desktop\proconnect`) y corre:

```powershell
.\run-tests-coverage.ps1
```

*(Nota: Si PowerShell te bloquea la ejecución por políticas de scripts, puedes usar el comando `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` antes de ejecutar).*

## Ejecución Manual por Microservicio

Si prefieres ejecutar las pruebas en un servicio específico (por ejemplo, el `microservicio-usuario`), sigue estos pasos en tu terminal:

1. Navega a la carpeta del microservicio:
   ```bash
   cd backend/microservicio-usuario
   ```
2. Ejecuta Maven usando el wrapper (`mvnw`):
   ```bash
   ./mvnw clean test jacoco:report
   ```

## Visualización de los Reportes de Cobertura (Métricas)

Una vez finalizadas las pruebas (ya sea automatizada o manualmente), Jacoco genera un reporte visual e interactivo en formato HTML que incluye:
- Porcentaje de cobertura de instrucciones (Lines of Code).
- Porcentaje de cobertura de ramas (Branches).
- Métricas de complejidad ciclomática.

**¿Dónde encontrar los gráficos e informes?**

Ve a la ruta generada dentro de la carpeta `target` de cada microservicio:
- `backend/microservicio-usuario/target/site/jacoco/index.html`
- `backend/microservicio-profesion/target/site/jacoco/index.html`
- `backend/microservicio-rol/target/site/jacoco/index.html`
- `backend/bff-api-gateway/target/site/jacoco/index.html`

Abre cualquiera de esos archivos `index.html` haciendo doble clic, o arrástralo a tu navegador web favorito (Chrome, Edge, Firefox). Allí podrás navegar por el código fuente en verde (probado) y rojo (no probado).

## Anexar como PDF

Para tu entrega académica, puedes:
1. Abrir el `index.html` de los microservicios en tu navegador.
2. Presionar `Ctrl + P` (Imprimir).
3. Seleccionar **"Guardar como PDF"**.
4. Adjuntar ese documento a tu trabajo final como evidencia clara de las métricas generadas por herramientas de testing.
