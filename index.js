'use strict';

let http = require('http');
let osmtogeojson = require('osmtogeojson');
const _ = require('lodash');


console.log('Loading function');

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });

    const callOverpass = function(queryString){
        let options = {
          host: 'overpass.osm.rambler.ru',
          path: '/cgi/interpreter?data=' + encodeURIComponent(queryString),
        };

        let callback = function(response) {
          let str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
              let data = "";
              try{
                  data = JSON.parse(str);
                  done(null, osmtogeojson(data));
              }
              catch(err){
                 console.log("ERROR OCCURED");
                 done(new Error(str));
              }
          });
        };

        http.request(options, callback).end();
    };

    const handleGet = function(event){
      const data = _.get(event, "queryStringParameters.data");
      if (data){
          callOverpass(data);
      } else {
        done(new Error("You need to supply a `data` parameter"));
      }
    };

    switch (event.httpMethod) {
        case 'GET':
            handleGet(event);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
