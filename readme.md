# PARK-IT API Project
Park It! API
Welcome to the Park It! API documentation! This API is the core of the ParkIT! connected parking system. It is a smart parking project developed as part of the 5th year engineering project at Polytech Lyon. 

The API facilitates communication between the mobile application, ESP32 microcontrollers, and the MongoDB database. It offers functionalities to manage parking lots, reservations, and obtain real-time parking space availability.

(learn more about the [parkit project](https://issamsisbane.github.io/portfolio/en/projects/park-it/))

## Installation
1. Clone this repository to your local machine.
2. Run `npm install` to install the dependencies.
3. Start the server with `npm` start.

## Deployment
To deploy this project, simply build the Docker image and deploy it in a container. Then, access the API via port 3000.

For the project to work, you need a MongoDB database and an MQTT broker. Add their configuration to the config file, which should include all the elements mentioned in the Dockerfile.

## Definition
To see the available routes, better understand, and test the API, the swagger file can be used. When the application is launched, the swagger is available at the following path: `/api/v1/docs/#`.

Here is a hosted version of the API: `https://parkit-api.onrender.com/api/v1/docs/#/`

(it can be slow due to it serverless nature)

## Security
The API uses JSON Web Tokens (JWT) for authentication. Make sure to include the token in the header of each protected request. You first need to create an account and log in to retrieve the token via the '/auth' routes.