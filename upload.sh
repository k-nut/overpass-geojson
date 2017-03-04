rm index.zip
zip -r index.zip . -x *.sh
aws lambda update-function-code --function-name overPassGeoJson --zip-file fileb://index.zip --region us-west-2
