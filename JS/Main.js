const canvas = document.querySelector('canvas');
const CT = canvas.getContext('2d');

const resol = 10;
var cw = canvas.width = 7510;
var ch = canvas.height = 4050;

const Cols = canvas.width / resol;
const Rows = canvas.height / resol;

function bulidGrid() {
    return new Array(Cols).fill(null)
        .map(() => new Array(Rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}
let grid = bulidGrid();
console.log(grid);

requestAnimationFrame(update);

function update() {
    grid = nextGen(grid)
    render(grid);
    requestAnimationFrame(update);
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbour = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const xCell = col + i;
                    const yCell = row + j;

                    if (xCell >= 0 && yCell >= 0 && xCell < Cols && yCell < Rows) {
                        const currNeigbour = grid[col + i][row + j];
                        numNeighbour += currNeigbour;
                    }
                }
            }
            //rules
            if (cell === 1 && numNeighbour < 2) {
                nextGen[col][row] = 0;
            } else if (cell === 1 && numNeighbour > 3) {
                nextGen[col][row] = 0;
            } else if (cell === 0 && numNeighbour === 3) {
                nextGen[col][row] = 1;
            }
        }
    }
    return nextGen;
}
function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            CT.beginPath();
            CT.rect(col * resol, row * resol, resol, resol);
            CT.fillStyle = cell ? "black" : "white";
            CT.fill();
            //CT.stroke();
        }
    }
}
function checkKey(e) {
    let key;
    key = e.key;

    const zoomElement = document.querySelector("body");
    let zoom = 0.5;
    const ZOOM_SPEED = 0.1;

    document.addEventListener('keydown', function (e) {
        if (key == "=" || key == "+") {
            zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
        } else if (key == "-") {
            zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
        }
    })
}

checkKey();