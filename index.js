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

        http.get(options, (response) => {
          let str = '';
          response.on('data', (chunk) => { str += chunk; });

          response.on('end', () => {
              try{
                  const data = JSON.parse(str);
                  done(null, osmtogeojson(data));
              }
              catch(err){
                 done(new Error(str));
              }
          });
        });
    };

    const handleGet = function(event){
      const data = _.get(event, "queryStringParameters.data");
      if (data){
          callOverpass(data);
      } else {
        done(new Error("You need to supply a `data` parameter."));
      }
    };

    const handlePost = function(event){
        const data = _.get(event, "body");
        console.log('=====data', data)
        if (data){
            callOverpass(data);
        } else {
            done(new Error("You need to send data in the function body."));
        }
    };

    switch (event.httpMethod) {
        case 'GET':
            handleGet(event);
            break;
        case 'POST':
            handlePost(event)
            break
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
