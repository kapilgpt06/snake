const control = {
    D: 1,
    W: 2,
    A: 3,
    S: 4
}

for(let i = 0 ;i< 100;i++){
    let ele = document.createElement('input')
    ele.type = 'checkbox'
    ele.id = `${parseInt(i/10)}-${i%10}`;
    document.getElementById('board').appendChild(ele)
}

let rowCount = 10;
let colCount = 10;

let count = 0;
let moveState = 2;
// 1: right, 2: top, 3: left, 4: bottom

let currentRow = 4;
let currentCol = 4;

document.addEventListener('keyup', (e) => {
    let key = e.key.toUpperCase()
    if(!Object.keys(control).includes(key)){
        return
    }
    let controlState = control[key];
    if(moveState === 1 && controlState === 3 || moveState === 3 && controlState === 1 ||
        moveState === 2 && controlState === 4|| moveState === 4 && controlState === 2){
        return
    }
    moveState = controlState
});

let snake = []
let snakeInterval = setInterval(()=>{
    if (moveState === 1){
        currentCol = (currentCol === colCount-1) ? 0 : currentCol+1;
    }else if (moveState === 2){
        currentRow = (currentRow === 0) ? rowCount-1 : currentRow-1;
    }else if (moveState === 3){
        currentCol = (currentCol === 0) ? colCount-1 : currentCol-1;
    }else if (moveState === 4){
        currentRow = (currentRow === rowCount-1) ? 0 : currentRow+1;
    }

    let newRowNo = Math.abs(currentRow % rowCount)
    let newColNo = Math.abs(currentCol % colCount)
    snake.push({
        row: newRowNo,
        col: newColNo
    })

    if (document.getElementById(`${newRowNo}-${newColNo}`).checked){
        if (!document.getElementById(`${newRowNo}-${newColNo}`).disabled){
            alert("Please try again")
            clearInterval(snakeInterval)
        }
        document.getElementById(`${newRowNo}-${newColNo}`).disabled = false;
        return
    }
    document.getElementById(`${newRowNo}-${newColNo}`).checked = true;

    if (snake.length === 1){
        return ;
    }
    let prev = snake.shift();
    document.getElementById(`${prev.row}-${prev.col}`).checked = false;
},200)

setInterval(()=>{
    let rowNo = parseInt(Math.random() * rowCount)
    let colNo = parseInt(Math.random() * colCount)

    if(!document.getElementById(`${rowNo}-${colNo}`).checked){
        document.getElementById(`${rowNo}-${colNo}`).checked = true;
        document.getElementById(`${rowNo}-${colNo}`).disabled = true;
    }
},4000)