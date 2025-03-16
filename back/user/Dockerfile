# Usar una imagen base de Node.js
FROM node:22

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre el servicio
EXPOSE 5001

# Comando para ejecutar el servicio
CMD ["node", "server.mjs"]