'use strict';

let http = require('http');
// let osmtogeojson = require('osmtogeojson');


console.log('Loading function');

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const callOverpass = function(queryString){
        let options = {
          host: 'overpass.osm.rambler.ru',
          path: '/cgi/interpreter?data=' + encodeURIComponent(queryString),
        };

        //done(null, options);
        // return;

        let callback = function(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
              console.log(str);
              var data = "";
              try{
                  data = JSON.parse(str);
              }
              catch(err){
                 data = str;
              }
            //console.log(osmtogeojson(data));;
            done(null, data);
          });
        };

        http.request(options, callback).end();
    };

    switch (event.httpMethod) {
        case 'GET':
            callOverpass(event.queryStringParameters.data);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
