# DominaTestJS

## Descripción
DominaTestJS es una aplicación diseñada para gestionar usuarios y tareas, construida con Node.js, MongoDB y Docker. Este proyecto ofrece una API RESTful para manejar operaciones de autenticación y gestión de tareas, junto con un frontend para interactuar con los servicios.

## Requisitos Técnicos
Para ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas:

- **Node.js** >= 22
- **MongoDB** >= 4.4.4
- **Docker** >= 28

## Ejecución del Proyecto

1. Clona el repositorio y navega a la carpeta raíz del proyecto:
   ```bash
   cd ./DominaTestJS/
2. Ejecuta el siguiente comando para construir y levantar los contenedores de Docker:
    ```bash
    docker-compose up --build
Este comando compilará la aplicación y levantará los servicios necesarios. 
Una vez completado, los servicios estarán disponibles en las siguientes rutas (si no se modifican los puertos en el archivo docker-compose.yml):
    * Servicio de Usuarios: http://localhost:5000
    * Ejemplo de ruta: http://localhost:5000/api/login
    * Servicio de Tareas: http://localhost:5001
    * Ejemplo de ruta: http://localhost:5001/api/task
    * Frontend: http://localhost:3000/

Modificación de Puertos: Si necesitas cambiar los puertos predeterminados, puedes hacerlo editando el archivo docker-compose.yml en la sección ports de cada servicio.

Documentación de la API
En la carpeta API DOCUMENTACION, encontrarás un archivo .json que puedes importar en Postman para obtener la documentación completa del backend. Este archivo incluye detalles sobre las rutas disponibles, la configuración necesaria y las respuestas esperadas.

## Importante primero debes crear un usuario en la opcion de registro