# ProConnect - Microservicio de Roles

Este microservicio se encarga de gestionar la lógica de permisos y roles (Ej. Cliente, Profesional, Administrador) de los usuarios en la plataforma ProConnect.

## Prerrequisitos
- Java 17 o superior
- Maven 3.8+ (o utilizar el wrapper incluido `./mvnw`)
- Base de datos MySQL en `localhost:3306` con la base de datos `proconnect_db`.

## Instalación y Ejecución

1. Clona el repositorio y navega a este directorio.
2. Compila el proyecto y descarga las dependencias:
   ```bash
   ./mvnw clean install -DskipTests
   ```
3. Ejecuta el microservicio (por defecto en el puerto 8083):
   ```bash
   ./mvnw spring-boot:run
   ```

## Pruebas Unitarias y Cobertura

Para ejecutar las pruebas unitarias y generar el informe de cobertura (Code Coverage):
```bash
./mvnw clean test jacoco:report
```
El informe de cobertura en formato HTML se generará en la ruta: `target/site/jacoco/index.html`. Abre este archivo en tu navegador para ver las métricas detalladas.
