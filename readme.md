# Projet PARKITAPI

API Park It!
Bienvenue dans la documentation de l'API Park It! Cette API constitue le cœur du système ParkIT !. C'est un projet de parking connecté réalisé dans le cadre du projet tutoré de la 5e année d'ecole d'ingénieur à Polytech Lyon. L'api facilite la communication entre l'application mobile, les microcontrôleurs ESP32 et la base de données MongoDB. Elle offre des fonctionnalités pour gérer les parkings, les réservations et obtenir l'état en temps réel des places de stationnement.

## Installation

Clonez ce référentiel sur votre machine locale.
Exécutez `npm install` pour installer les dépendances.
Démarrez le serveur avec `npm start`.

## Deploiement 

Afin de deployer ce projet, il suffit de build l'image docker et de la deployer dans un conteneur. Ensuite, on accède à l'api via le port 3000.
Pour que le projet fonctionne, il faut une base de données mongoDB et un broker MQTT dont il faut ajouter la configuration au fichier de config qui doit être composé de tous les éléments mentionné dans le DockerFile.

## Definition

Pour voir les routes disponibles, mieux comprendre et tester l'api. Le fichier swagger peut-être utilisé. Lorsque l'application est lancée, le swagger se trouve au chemin suivant `/api/v1/docs/#`.

 Voici une version hebergé de l'api : `https://parkit-api.onrender.com/api/v1/docs/#/`

## Sécurité
L'API utilise JSON Web Tokens (JWT) pour l'authentification. Assurez-vous d'inclure le token dans l'en-tête de chaque requête protégée. Il faut d'abord crée un compte et se connecter pour récupèrer le token via les routes '/auth'.