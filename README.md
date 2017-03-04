# Overpass-geojson

A small script that wraps around the [overpass-api](http://overpass-api.de/) to return [geojson](http://geojson.org/) instead of the custom overpass json format for easier use in applications.

The live instance can be found at [https://giluifm80f.execute-api.us-west-2.amazonaws.com/dev/overPassGeoJson](https://giluifm80f.execute-api.us-west-2.amazonaws.com/dev/overPassGeoJson). 

An example query could look like this:  [https://giluifm80f.execute-api.us-west-2.amazonaws.com/dev/overPassGeoJson?data=%5Bout%3Ajson%5D%3B%0Anode%0A%20%20%5Bamenity%3Ddrinking_water%5D%0A%20%20%2852.495793744738634%2C13.426065444946289%2C52.540606032944865%2C13.487005233764648%29%3B%0Aout%3B](https://giluifm80f.execute-api.us-west-2.amazonaws.com/dev/overPassGeoJson?data=%5Bout%3Ajson%5D%3B%0Anode%0A%20%20%5Bamenity%3Ddrinking_water%5D%0A%20%20%2852.495793744738634%2C13.426065444946289%2C52.540606032944865%2C13.487005233764648%29%3B%0Aout%3B)

Note: currently only GET requests are supported.
