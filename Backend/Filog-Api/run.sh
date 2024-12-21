#!/bin/bash

# Path to the env file
ENV_FILE="./api.env"

# Image name
IMAGE="raghvendra001/filog-api"

# Run the first container on port 8000 with explicit port mapping
docker run -d --name filog-api-1 --env-file "$ENV_FILE" -e PORT=8000 -p 8000:8000 "$IMAGE"

# Run the second container on port 8001 with explicit port mapping
docker run -d --name filog-api-2 --env-file "$ENV_FILE" -e PORT=8001 -p 8001:8001 "$IMAGE"

# Run the third container on port 8002 with explicit port mapping
docker run -d --name filog-api-3 --env-file "$ENV_FILE" -e PORT=8002 -p 8002:8002 "$IMAGE"

echo "Containers started with ports 8000, 8001, and 8002."

