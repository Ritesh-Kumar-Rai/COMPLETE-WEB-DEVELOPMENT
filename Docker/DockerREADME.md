# Some Great commands for docker

## How to build an image from a project

### Create a Dockerfile

then write:

```docker
FROM node:20-apline

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev]
```

### Command to build the image using the Dockerfile

- using cmd

```bash
docker build -t <name-of-image>:<version> .
```

## How to save the image to .tar file [locally]

- using cmd

```bash
docker save -o <file-name>.tar <image-name>:version
```

or

```bash
docker save -o <file-name>.<version>.tar <image-name>:version
```

```bash
# Where -o is for safety of file which prevents the file from corruption
```

## How to load the .tar file of image to again image

- using cmd

```bash
docker load -i <file-name>.tar
# this will convert the .tar file to image and store this to docker env.
# where -i is for reading/input the file
```

## How to create a network

- check network

```dash
docker network ls
```

```dash
docker network create <your-network-name>
```

## Create a mongodb container and serve to your host machine

- using bash terminal

```bash
docker run -d \
> -p 27017:27017 \
> --network mongo-express-network \
> -e MONGO_INITDB_ROOT_USERNAME=admin \
> -e MONGO_INITDB_ROOT_PASSWORD=qwerty \
> --name mongodb-new \
> mongo
```

## Create a mongo-express container and connect it to mongodb then serve it to local host machine

- using bash terminal

```bash
docker run -d \
> --name mongo-express-latest \
> -p 8081:8081 \
> --network mongo-express-network \
> -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
> -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty \
> -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongodb-new:27017" \
> mongo-express
```

now all is good

```bash
# check for container running status
docker ps
```

- and visit to browsers: `localhost:8081` to see mongo-express UI

## How to create a development docker image from React app

```bash
    # inside Dockerfile in React root project
    FROM node:16
    WORKDIR /app
    COPY ./package*.json ./
    RUN npm install
    COPY . .
    CMD ["npm", "run", "dev/start"]
```

- then build an image from it

```bash
docker build -t <name-of-image> .
```

- create a container from this image

```bash
docker run --rm --name <container-name> -d -p 3000:3000/5173:5173 -v $(pwd):/app <image-name>

# where --rm is used for future means in future when i again create a container from same image then this --rm will remove the existing container
# --name is for container-name
# -d is for detach mode
# -p here you can either use 3000:3000 for CRA & 5173:5173 for react-vite [where port:port  is  (__localhostport__:__containerport__)]
# -v is for mount where any changes done in localhost codebase it will get reflected to container where $(pwd) -> for project root location & :/app is for docker container location (-v used for hot-reloading)
```

- in case your `hot-reloading` will not work then use:

```bash
    -e CHOKIDAR_USEPOLLING=true in docker run command
```

example:

```bash
docker run --rm --name <container-name> -e CHOKIDAR_USEPOLLING=true -d -p 3000:3000 -v $(pwd):/app <image-name>
```

## How to connect a nodejs server container to mongodb and mongo-express containers

- First add a env variables in server.js/index.js/app.js

```js
MONGO_URL = process.env.MONGO_URL || "mongodb://admin:qwerty@mongodb-new:27017";
```

- then run the docker container of nodejs

```bash
docker run -p 5050:5050 --network mongo-express-network -e MONGO_URL=mongodb://admin:qwerty@mongodb-new:27017 -d node-server-test:latest
```

- It's done
