# Utilisez une image de base Node.js
FROM node:18.14.2

# Créez un répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de votre application dans le répertoire de travail
COPY . .

# Compilez votre code TypeScript (assurez-vous d'avoir `tsc` installé localement)
RUN npm run build

# Exposez le port sur lequel votre application Express écoute (remspotz 3000 par le port réel)
EXPOSE 3000

# NODE_ENV = production

# ACCESS_JWT_SECRET = my-32-character-ultra-secure-and-ultra-long-secret-for-access-token
# REFRESH_JWT_SECRET = my-32-character-ultra-secure-and-ultra-long-secret-for-refresh-token

# ACCESS_EXPIRES_IN = '1d'
# REFRESH_EXPIRES_IN = '7d'

# # LOG
# LOG_FORMAT = dev
# LOG_DIR = ../logs

# # CORS
# ORIGIN = *
# CREDENTIALS = true

# # API
# URL = http://api-domain-name/api/v1
# PORT = 3000

# # MONGODB URL
# DB_URI = "mongodb://user:password@server:port/db?authSource=admin"

# # MQTT Broker
# MQTT_HOST = "host"
# MQTT_PORT = 8883
# MQTT_PROTOCOL = "mqtts"
# MQTT_USERNAME = "username"
# MQTT_PASSWORD = "password"

# Commande pour exécuter votre application
CMD [ "npm", "run", "start" ]  
