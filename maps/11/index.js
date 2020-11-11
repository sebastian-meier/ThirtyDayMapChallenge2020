const files = require('./files.json');
const request = require('request-promise');
const fs = require('fs').promises;
const fss = require('fs')
const unzipper = require('unzipper');
const command = require('command-promise');

(async () => {
    for (let i = 0; i < files.length; i += 1) {
        console.log(i);
        const file = files[i];
        const fileName = file.split('DGM1/')[1];
        const name = fileName.split('.')[0];
        await request.get({url: file, encoding: null})
            .then((res) => {
                return fs.writeFile('./temp/' + fileName, res);
            }).then(() => {
                return new Promise((resolve, reject) => {
                    const stream = fss.createReadStream('./temp/' + fileName)
                        .pipe(unzipper.Extract({ path: './temp/' + name }))
                        .promise()
                            .then( () => {
                                return fs.unlink('./temp/' + fileName)
                            })
                            .then(() => {
                                return command(`sort -k2,2n -l1,1n .temp/${name}/${name}.txt > .temp/${name}/${name}-sorted.txt`);
                            })
                            .then(() => {
                                return command(`sed '/^$/d' .temp/${name}/${name}-sorted.txt > .temp/${name}/${name}-cleaned.txt`);
                            })
                            .then(() => {
                                return command(`gdalwarp -t_srs EPSG:25833 .temp/${name}/${name}-cleaned.txt .temp/${name}/${name}.tif`);            
                            })
                            .then(() => const files = require('./files.json');
                            const request = require('request-promise');
                            const fs = require('fs').promises;
                            const fss = require('fs')
                            const unzipper = require('unzipper');
                            const command = require('command-promise');
                            
                            (async () => {
                                for (let i = 0; i < files.length; i += 1) {
                                    console.log(i);
                                    const file = files[i];
                                    const fileName = file.split('DGM1/')[1];
                                    const name = fileName.split('.')[0];
                                    await request.get({url: file, encoding: null})
                                        .then((res) => {
                                            return fs.writeFile('./temp/' + fileName, res);
                                        }).then(() => {
                                            return new Promise((resolve, reject) => {
                                                const stream = fss.createReadStream('./temp/' + fileName)
                                                    .pipe(unzipper.Extract({ path: './temp/' + name }))
                                                    .promise()
                                                        .then( () => {
                                                            return fs.unlink('./temp/' + fileName)
                                                        })
                                                        .then(() => {
                                                            return command(`sort -k2,2n -l1,1n .temp/${name}/${name}.txt > .temp/${name}/${name}-sorted.txt`);
                                                        })
                                                        .then(() => {
                                                            return command(`sed '/^$/d' .temp/${name}/${name}-sorted.txt > .temp/${name}/${name}-cleaned.txt`);
                                                        })
                                                        .then(() => {
                                                            return command(`gdalwarp -t_srs EPSG:25833 .temp/${name}/${name}-cleaned.txt .temp/${name}/${name}.tif`);            
                                                        })
                                                        .then(() => {
                                                            resolve();
                                                        });
                                            });
                                        })
                                }
                            })();{
                                resolve();
                            });
                });
            })
    }
})();