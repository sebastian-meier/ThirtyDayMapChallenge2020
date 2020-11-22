// (async() => {
//     const results = [];
//     for (let i = 1; i <= 72; i += 1) {
//         console.log(i);
//         await fetch(`https://wheelmap.org/api/nodes/?page=${i}&api_key=3s8GNQvBCmwm45zro_jP&per_page=1000&bbox=13.0883455540339000,52.3382431580727001,13.7611404702712008,52.6755077376257006&limit=99000`)
//             .then(response => response.json())
//             .then(data => {
//                 results.push(data);
//             });
//     }
//     console.save(results, 'results.json');
// })();

const results = require('./results.json');
const fs = require('fs');

let csv = 'lat,lon,wheelchair';
results.forEach((result) => {
    result.nodes.forEach((node) => {
        csv += `\n${node.lat},${node.lon},${node.wheelchair}`;
    });
});

fs.writeFileSync('points.csv', csv, 'utf8');