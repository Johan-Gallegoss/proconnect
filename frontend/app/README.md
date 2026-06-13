# ProConnect - Frontend

Este es el repositorio del cliente de usuario para ProConnect, construido con React, Vite y empaquetado mediante NPM.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- NPM (viene preinstalado con Node.js)

## Instalación de dependencias

Una vez clonado el repositorio, navega a esta carpeta (`frontend/app`) y ejecuta el siguiente comando para descargar e instalar todas las dependencias listadas en el `package.json`:

```bash
npm install
```

## Ejecución en entorno de desarrollo

Para iniciar el servidor de desarrollo con Hot-Module-Replacement (HMR), ejecuta:

```bash
npm run dev
```

Esto levantará el servidor, usualmente en `http://localhost:5173/`, donde podrás probar y visualizar la interfaz del usuario.

## Construcción para Producción

Para compilar y empaquetar la aplicación lista para un entorno de producción (generando archivos minificados en la carpeta `dist`), ejecuta:

```bash
npm run build
```

## Ejecutar pruebas (si están configuradas)

```bash
npm test
```

## Estructura del Proyecto
- `/src`: Contiene todo el código fuente, componentes React, estilos y utilidades.
- `/public`: Activos estáticos públicos que no requieren procesamiento de Webpack/Vite.
- `package.json`: Definición de dependencias y scripts de NPM.
- `vite.config.js`: Configuración del empaquetador Vite.
