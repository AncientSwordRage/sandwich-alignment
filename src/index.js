import { createHiDPICanvas, registerRegion } from './canvasUtils';
import Quadtree from '@timohausmann/quadtree-js';
import css from './style.css';

// we create a canvas element
const height = 1200;
const width = height * 1.5;
const blockWidth = width / 4;
const blockHeight = height / 4;
const largestFont = height / 12;
const baseCanvas = document.getElementById('chart');
const canvas = createHiDPICanvas(width, height, baseCanvas);

const subject = 'Sandwich';
const yAxisTerm = 'Structure';
const xAxisTerm = 'Ingredients';
const alignmentDegrees = ['Purist', 'Neutral', 'Rebel']
const alignmentDet = [
    'Hardline Traditionalist',
    'True Neutral',
    `Radical ${subject} Anarchy`
]
const xDegrees = alignmentDegrees.map(degree => ({
    title: `${xAxisTerm} ${degree}`
}));
const yDegrees = alignmentDegrees.map(degree => ({
    title: `${yAxisTerm} ${degree}`
}));
const degreeColours = ['#264211', '#7B5C09', '#600000']

const blockColours = ['#828282', '#727272', '#595959', '#454545', '#303030'];

canvas.height = height * 2;
canvas.width = width * 2;
// getting the context will allow to manipulate the image
var context = canvas.getContext("2d");

// We create a new imageData.
var imageData = context.createImageData(width, height);
// The property data will contain an array of int8
var data = imageData.data;

context.lineWidth = 2;
context.strokeStyle = "black";
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width / 4, canvas.height / 4);
context.stroke();

context.lineWidth = 2;
context.strokeStyle = "black";
const regions = [];
// colour in the regions
for (let row = 0; row < 3; row++) {
    const rowColours = blockColours.slice(row, row + 3)
    for (let col = 0; col < 3; col++) {
        context.fillStyle = rowColours[col];
        const xPos = blockWidth * (1 + row);
        const yPos = blockHeight * (1 + col);
        const currentPath = new Path2D();
        currentPath.rect(
            xPos,
            yPos,
            blockWidth,
            blockHeight
        );
        context.stroke(currentPath);
        registerRegion(currentPath, regions);
        const yBlockText = `${yAxisTerm} ${alignmentDegrees[col]},`;
        const xBlockText = `${xAxisTerm} ${alignmentDegrees[row]}`;

        context.fillStyle = "white";
        context.font = `${largestFont / 2.8}px Impact`;
        const topTextX = xPos + largestFont / 4;
        const topTextY = yPos + largestFont / 2;

        if (col === row) {
            context.fillText(
                alignmentDet[col],
                topTextX,
                topTextY,
                blockWidth
            )
        } else {
            context.fillText(
                yBlockText,
                topTextX,
                topTextY,
                blockWidth - largestFont / 2
            )
            context.fillText(
                xBlockText,
                topTextX,
                topTextY + largestFont / 2,
                blockWidth - largestFont / 2
            )
        }
    }
};

console.log(regions);

context.beginPath();
context.strokeStyle = 'grey';
context.moveTo(blockWidth * 0.1, blockHeight * 2);
context.lineTo(blockWidth * 0.9, blockHeight * 2);
context.stroke();

context.beginPath();
context.strokeStyle = 'grey';
context.moveTo(blockWidth * 0.1, blockHeight * 3);
context.lineTo(blockWidth * 0.9, blockHeight * 3);
context.stroke();

context.beginPath();
context.strokeStyle = 'grey';
context.moveTo(blockWidth * 2, blockHeight * 0.5);
context.lineTo(blockWidth * 2, blockHeight * 0.9);
context.stroke();

context.beginPath();
context.strokeStyle = 'grey';
context.moveTo(blockWidth * 3, blockHeight * 0.5);
context.lineTo(blockWidth * 3, blockHeight * 0.9);
context.stroke();

context.fillStyle = "#e5e5e5";
context.fillRect(0, 0, canvas.width / 2, blockHeight * 0.45);
context.stroke();

// text
context.fillStyle = "#ACACAC";
context.font = `${largestFont}px Impact`
context.textBaseline = 'middle';
context.textAlign = "center";
context.fillText(`The ${subject} Alignment chart`.toUpperCase(), canvas.width / 4, blockHeight * 0.25, canvas.width / 2);

yDegrees.forEach((degreeText, index) => {
    context.fillStyle = degreeColours[index];
    context.font = `${largestFont / 2}px Impact`;
    context.fillText(degreeText.title, blockWidth / 2, blockHeight * (1 + index) + largestFont / 2, blockWidth)
})

xDegrees.forEach((degreeText, index) => {
    context.fillStyle = degreeColours[index];
    context.font = `${largestFont / 2}px Impact`;
    context.fillText(degreeText.title, blockWidth * (1.5 + index), blockHeight * (0.6), blockWidth)
})

canvas.onclick = (e) => {
    const clickedPoint = { x: e.clientX, y: e.clientY, width: 1, height: 1 };
    const clickedOn = canvasRectTree.retrieve(clickedPoint);
    console.log('boop', clickedPoint, clickedOn);
}
