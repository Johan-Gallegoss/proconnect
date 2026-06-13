# ProConnect - API Gateway / BFF (Backend for Frontend)

Este componente actúa como la puerta de enlace (API Gateway) para la aplicación ProConnect. Se encarga de recibir las peticiones HTTP del frontend (React/Vite) y enrutarlas a los microservicios correspondientes, además de manejar políticas transversales como CORS y seguridad.

## Prerrequisitos
- Java 17 o superior
- Maven 3.8+ (o utilizar el wrapper incluido `./mvnw`)

## Instalación y Ejecución

1. Clona el repositorio y navega a este directorio.
2. Compila el proyecto y descarga las dependencias:
   ```bash
   ./mvnw clean install -DskipTests
   ```
3. Ejecuta el Gateway (por defecto en el puerto 8080):
   ```bash
   ./mvnw spring-boot:run
   ```

## Enrutamiento
Este servicio redirigirá automáticamente el tráfico de las rutas establecidas a los microservicios (`microservicio-usuario`, `microservicio-profesion`, `microservicio-rol`) que deben estar corriendo en sus respectivos puertos.

## Pruebas Unitarias y Cobertura

Para ejecutar las pruebas unitarias y generar el informe de cobertura (Code Coverage):
```bash
./mvnw clean test jacoco:report
```
El informe de cobertura en formato HTML se generará en la ruta: `target/site/jacoco/index.html`. Abre este archivo en tu navegador para ver las métricas detalladas.
