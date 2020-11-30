const svg = d3.select('#container').append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .style('width', '500px')
    .style('height', '500px')
    .append('g').attr('transform', ' translate(250 250) rotate(-45)'); // 135

const mx = 4;
const my = 4;
const size = 25;

for (let x = 0; x < mx; x += 1) {
    for (let y = 0; y < my; y += 1) {
        svg.append('rect')
            .attr('width', size)
            .attr('height', size)
            .attr('x', x * size - (mx/2*size))
            .attr('y', y * size - (mx/2*size))
            .style('stroke', 'rgb(0,0,0)')
            // .style('fill', `rgb(${(255 / 3 * (3 - x))}, 
            //                     ${175 - (175 / 3 * ((((3 - x)/3*1.5) + ((3 - Math.abs(3 - x - y))/3*1.5))))}, 
            //                     ${(200 / 3 * (3 - Math.abs(3 - x - y)))})`);
            .style('fill', `rgb(${(255 / 3 * (3 - x))}, 
                                ${175 - (175 / 3 * ((((3 - x)/3*1.5) + ((y)/3*1.5))))}, 
                                ${(200 / 3 * (y))})`);
    }
}

const tg = d3.select('svg').append('g').attr('transform', 'translate(250 250)');

tg.append('text')
    .text('Max. Population / Max. Index')
    .attr('text-anchor', 'middle')
    .attr('dy', -80);

tg.append('text')
    .text('Max. Population / Min. Index')
    .attr('text-anchor', 'middle')
    .attr('dy', 88);

tg.append('text')
    .attr('transform', 'translate(-78 -4)')
    .html('<tspan x="0" dy="0.2em">Min. Population</tspan><tspan x="0" dy="1.2em">Min. Index</tspan>')
    .attr('text-anchor', 'end');

tg.append('text')
    .attr('transform', 'translate(78 -4)')
    .html('<tspan x="0" dy="0.2em">Min. Population</tspan><tspan x="0" dy="1.2em">Max. Index</tspan>')
    .attr('text-anchor', 'start');