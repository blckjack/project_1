#!/bin/sh
HOST=localhost:27017
DB=avangard
COLLECTION=latest
REGION=eu-central-1

aws s3 cp s3://$DB/$COLLECTION.json - --region=$REGION | mongoimport -h $HOST -d $DB -c $COLLECTION --jsonArray
