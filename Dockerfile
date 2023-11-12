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

# Exposez le port sur lequel votre application Express écoute (remplacez 3000 par le port réel)
EXPOSE 3000

# Commande pour exécuter votre application
CMD [ "npm", "run", "start" ]  
