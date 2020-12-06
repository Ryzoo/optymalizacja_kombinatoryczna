const prompt = require('prompt');

prompt.start();
prompt.get([
    {
        description: 'Enter count of number you want to enter',
        required: true,
        name: 'count',
        type: 'number',
    }
], function (err, result) {
    if (err) { return onErr(err); }
    console.log(`You need to enter next ${result.count} numbers`);

    prompt.start();
    prompt.get([
        {
            description: 'Enter number',
            required: true,
            name: 'numbers',
            type: 'array',
            maxItems: result.count,
        }
    ], function (err, result) {
        if (err) { return onErr(err); }
        console.log('You enter nubmers: ' + result.numbers);
        console.log('Points sum: ' + sumOfPoints(result.numbers.map((x) => parseInt(x)), 0));
    });
});


function onErr(err) {
    console.log(err);
    return 1;
}

function sumOfPoints(segment, sum){
    if(segment.length < 3) return sum
    if(segment.length === 3) return sum + segment.reduce((a,b) => a + b, 0)

    const bestIndex = getFourPointBestIndex(segment)
    const newSum = sum + getSumOfIndex(segment, bestIndex)
    const newSegment = segment.filter((x, index) => index !== bestIndex)

    return sumOfPoints(newSegment, newSum)
}

function getSumOfIndex(segment, bestIndex){
    return segment
        .filter((x, index) => index+1 === bestIndex || index === bestIndex || index-1 === bestIndex )
        .reduce((a,b) => a + b, 0)
}

function getFourPointBestIndex(segment){
    const fourPointList = [];
    let selectedIndex = null;
    let maxIndexValue = 0;

    for (let index = 0; index <= (segment.length + 1)-4; index++) {
        fourPointList.push([
            segment[index], segment[index+1], segment[index+2], segment[index+3]
        ])
    }

    fourPointList.forEach((x, startIndex) => {
        const oneSum = x[0] + x[1] + x[2] + x[0] + x[2] + x[3];
        const twoSum = x[1] + x[2] + x[3] + x[0] + x[1] + x[3];

        if(oneSum > maxIndexValue){
            maxIndexValue = oneSum;
            selectedIndex = 1 + startIndex
        }

        if(twoSum > maxIndexValue){
            maxIndexValue = twoSum;
            selectedIndex = 2 + startIndex;
        }
    })

    return selectedIndex
}