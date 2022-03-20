/* Game */
const Game = (function () {
    let size = 4;
    let grid = [];

    const hasEmptyFields = () => {
        let count = 0;
        // console.log("hasEmptyFields | start");
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                // console.log(`hasEmptyFields | [${x}][${y}] : ` , grid[x][y]);
                if (grid[x][y] === 0) {
                    count++;
                    // console.log(count);
                };
            }
        }
        // console.log("hasEmptyFields | stop");
        return count !== 0;
    }
    const hasOptions = () => {
        let options = [];
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                let value  = grid[x][y];

                if( grid[x-1] && grid[x-1][y] && grid[x-1][y] === value ){
                    options.push('up');
                }
                if( grid[x+1] && grid[x+1][y] && grid[x+1][y] === value ){
                    options.push('down');
                }
                if( grid[x] && grid[x][y-1] && grid[x][y-1] === value ){
                    options.push('left');
                }
                if( grid[x] && grid[x][y+1] && grid[x][y+1] === value ){
                    options.push('right');
                }
            }
        }
        
        options = options.filter((v, i, a) => a.indexOf(v) === i);

        return options.length ? options : false;
    }

    const youWin = () => {
        let winner = false;
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                winner = grid[x][y] >= 2048;
            }
        }
        return winner;
    }

    const drawGrid = () => {
        const grid_container = document.querySelector('.grid');
        const grid_boxes = grid_container.querySelectorAll('.grid-box');

        grid_boxes.forEach(grid_box => {
            grid_container.removeChild(grid_box);
        }); 

        for (let x = 0; x < size; x++) {
            let row = grid[x];
            for (let y = 0; y < size; y++) {
                let value = row[y];

                const grid_box = document.createElement('div');
                grid_box.classList.add('grid-box');
                grid_box.classList.add('value_' + value);
                grid_box.innerHTML = value;

                grid_container.appendChild(grid_box);
            }
        }
    }

    const initializeGrid = () => {
        for (let x = 0; x < size; x++) {
            grid[x] = [];
            for (let y = 0; y < size; y++) {
                grid[x][y] = 0;
            }
        }
    }

    const addNewValueIntoGrid = () => {

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let added = false;
        do {
            let x = getRandomInt(1, size) - 1;
            let y = getRandomInt(1, size) - 1;
            if (grid[x][y] === 0) {
                grid[x][y] = 2;
                added = true;
            }
        } while (!added);
    }

    const moveUp = () => {
        for (let y = 0; y < size; y++) {

            let column = [];
            for (let x = 0; x < size; x++) {
                column[x] = grid[x][y];
            }

            let column_elements = column.filter(value => value);
            let column_empty_elements = Array(size - column_elements.length).fill(0);

            let new_column = column_elements.concat(column_empty_elements);

            for (let xx = 0; xx < size - 1; xx++) {
                if (new_column[xx] === new_column[xx + 1]) {
                    new_column[xx] = new_column[xx] + new_column[xx];

                    for (let i = xx + 1; i < size - 1; i++) {
                        new_column[i] = new_column[i + 1];
                    }

                    new_column[size - 1] = 0

                }
            }

            for (let x = 0; x < size; x++) {
                grid[x][y] = new_column[x];
            }
        }
    }
    const moveDown = () => {
        for (let y = 0; y < size; y++) {

            let column = [];
            for (let x = 0; x < size; x++) {
                column[x] = grid[x][y];
            }

            let column_elements = column.filter(value => value);
            let column_empty_elements = Array(size - column_elements.length).fill(0);

            let new_column = column_empty_elements.concat(column_elements);

            new_column = new_column.reverse();

            for (let xx = 0; xx < size - 1; xx++) {
                if (new_column[xx] === new_column[xx + 1]) {
                    new_column[xx] = new_column[xx] + new_column[xx];

                    for (let i = xx + 1; i < size - 1; i++) {
                        new_column[i] = new_column[i + 1];
                    }

                    new_column[size] = 0

                }
            }

            new_column = new_column.reverse().slice(-size);

            for (let x = 0; x < size; x++) {
                grid[x][y] = new_column[x];
            }
        }
    }
    const moveLeft = () => {
        for (let x = 0; x < size; x++) {
            let row = grid[x];

            let row_elements = row.filter(value => value);
            let row_empty_elements = Array(size - row_elements.length).fill(0);

            let new_row = row_elements.concat(row_empty_elements);

            for (let y = 0; y < size - 1; y++) {
                if (new_row[y] === new_row[y + 1]) {
                    new_row[y] = new_row[y] + new_row[y];

                    for (let i = y + 1; i < size - 1; i++) {
                        new_row[i] = new_row[i + 1];
                    }

                    new_row[size] = 0
                }
            }

            for (let y = 0; y < size; y++) {
                grid[x][y] = new_row[y];
            }

            // console.log({ row, row_elements, row_empty_elements, new_row });
        }

    }
    const moveRight = () => {
        for (let x = 0; x < size; x++) {
            let row = grid[x];

            let row_elements = row.filter(value => value);
            let row_empty_elements = Array(size - row_elements.length).fill(0);
            let new_row = row_empty_elements.concat(row_elements);

            new_row = new_row.reverse();
            console.log(new_row);

            for (let y = 0; y < size - 1; y++) {
                if (new_row[y] === new_row[y + 1]) {
                    new_row[y] = new_row[y] + new_row[y];

                    for (let i = y + 1; i < size - 1; i++) {
                        new_row[i] = new_row[i + 1];
                    }

                    new_row[size] = 0
                }
            }

            new_row = new_row.reverse().slice(-size);
            console.log(new_row);

            for (let y = 0; y < size; y++) {
                grid[x][y] = new_row[y];
            }
        }
    }

    const fctListener = (e) => {

        switch (e.key) {
            case 'ArrowUp':
                moveUp();
                if (hasEmptyFields()) addNewValueIntoGrid();
                break;
            case 'ArrowDown':
                moveDown();
                if (hasEmptyFields()) addNewValueIntoGrid();
                break;
            case 'ArrowRight':
                moveRight();
                if (hasEmptyFields()) addNewValueIntoGrid();
                break;
            case 'ArrowLeft':
                moveLeft();
                if (hasEmptyFields()) addNewValueIntoGrid();
                break;
        }


        if(youWin()){
            drawGrid();
            alert('you win!');
            stop();
        }else if(hasOptions() || hasEmptyFields()) {
            console.log('options', hasOptions());
            drawGrid();
        }else{
            drawGrid();
            alert('you lose!');
            stop();
        }



    }
    const addListeners = () => {
        window.addEventListener('keydown', fctListener);
    }
    const removeListeners = () => {
        window.removeEventListener('keydown', fctListener);
    }


    const start = () => {
        initializeGrid();
        drawGrid();
        addNewValueIntoGrid();
        drawGrid();
        addListeners();
        console.log(grid);
    }
    const stop = () => {
        initializeGrid();
        drawGrid();
        removeListeners();
    }

    return {
        start,
        stop,
    }
})()

/* main */
const main = () => {
    Game.start();
}
window.addEventListener('DOMContentLoaded', main);

document.querySelector('button#re_start').addEventListener('click', Game.start);