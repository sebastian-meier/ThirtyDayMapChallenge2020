const stations = require('./fire_stations.json')
const fs = require('fs')
const fetch = require('node-fetch')

const results = {
  "type": "FeatureCollection",
  "name": "fire_stations_isochrones",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  ]  
};

(async () => {

  for (let i = 0; i < stations.features.length; i += 1) {
    for (let j = 0; j < 2; j += 2) {

      const feature = stations.features[i];
      const coord = feature.geometry.coordinates;

      const body = {
        "locations":[{"lat":coord[1],"lon":coord[0]}],
        "costing":"auto",
        "contours":[
          {"time":10 + j * 40,"color":"ff0000"},
          {"time":20 + j * 40,"color":"ff0000"},
          {"time":30 + j * 40,"color":"ff0000"},
          {"time":40 + j * 40,"color":"ff0000"}
        ]
      };
    
      const response = await fetch('http://localhost:8002/isochrone', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
      });
      const json = await response.json();
    
      results.features = results.features.concat(json.features);
    }
  }
  fs.writeFileSync("results.json", JSON.stringify(results), "utf8")
})();