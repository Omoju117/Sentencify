#!/bin/bash
SOURCEPATH=$PWD/client/src/api/generated
FRONTEND=$PWD/../frontend

docker run --rm -v $(pwd):/local \
    openapitools/openapi-generator-cli:v4.2.2 generate \
    -i /local/schema.yml \
    -g typescript-axios \
    -o /local/client/src/api/generated

cp ${SOURCEPATH}/api.ts ${SOURCEPATH}/base.ts ${SOURCEPATH}/index.ts ${SOURCEPATH}/configuration.ts ${FRONTEND}/schemes
