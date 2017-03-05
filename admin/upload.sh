rm index.zip
zip index.zip -r index.js node_modules package.json
aws lambda update-function-code --function-name overPassGeoJson --zip-file fileb://index.zip --region us-west-2
