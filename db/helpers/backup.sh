#!/bin/sh
HOST=localhost:27017
DB=avangard
COLLECTION=latest
VOLUME_PATH=/data/db
HOST_BACKUP=${VOLUME_PATH}/${DB}.json

S3_PATH="s3://${DB}/"
S3_BACKUP=$S3_PATH`date +"%Y%m%d_%H%M%S"`.json

docker run --rm --network=${DB}_${DB} -v ${VOLUME_PATH}:${VOLUME_PATH} mongo /bin/sh -c "mongoexport -h '${HOST}' -d '${DB}' -c '${COLLECTION}' -o '${HOST_BACKUP}' --jsonArray"
aws s3 cp $HOST_BACKUP $S3_BACKUP
aws s3 cp $S3_BACKUP $S3_PATH/$COLLECTION.json
