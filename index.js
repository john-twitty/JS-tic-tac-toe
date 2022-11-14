//global handle to board div and controls div
// so we dont have to look it up every time
let boardNode;
let controlsNode;
//if AI goes first, need to know what players mark is
let playerMark = "X";

//global win condition
let win = 0;

//holds the board buttons in nested arrays
//accessed like board[0][0] (top left button)
const board = [];

//assoc array of the other buttons
//accessed like controls.aiFirst or controls.reload
const controls = {};


//no return or params
//picks an open button and sets it as the AIs mark
//always sets aiFirst button to disabled
const aiGo = () => {
    console.log("aigo")
    let check = 0
    let count = 0

        while (check != 1){

            let randNum1 = Math.floor(Math.random() * 3);
            let randNum2 = Math.floor(Math.random() * 3);
    
            count++
            if(count > 50){
                check = 1
                checkEnd()
                if(win != 1){
                    let text = document.createTextNode("Its a draw! play again?")
                    let spot = document.getElementById("board")
                    spot.appendChild(text)
                    win = 1
                }
                
            }
            
            if(board[randNum1][randNum2].innerHTML == "_"){
                board[randNum1][randNum2].innerHTML = "O"
    
                check = 1
            }
            
        }

    
}


//return X, O, or - if game is over
//returns false if game isnt over
const checkEnd = () => {
    console.log("checkend")
    let results = "0"

    //checks rows
    for(let i=0; i < 3;i++){
        results = checkStraight(board[0][i].innerHTML,board[1][i].innerHTML,board[2][i].innerHTML)
        if(results == "X"){return "X"}
        if(results == "O"){return "O"}
        results = checkStraight(board[i][0].innerHTML,board[i][1].innerHTML,board[i][2].innerHTML)
        if(results == "X"){return "X"}
        if(results == "O"){return "O"}
    }

    //check diagonals
    if(board[0][0].innerHTML == board [1][1].innerHTML && board[1][1].innerHTML == board[2][2].innerHTML && board[0][0].innerHTML == "X")
    {
        return "X"
    }
    if(board[0][0].innerHTML == board [1][1].innerHTML && board[1][1].innerHTML == board[2][2].innerHTML && board[0][0].innerHTML == "Y")
    {
        return "O"
    }
    if(board[0][2].innerHTML == board [1][1].innerHTML && board[1][1].innerHTML == board[2][0].innerHTML && board[2][0].innerHTML == "X")
    {
        return "X"
    }
    if(board[0][2].innerHTML == board [1][1].innerHTML && board[1][1].innerHTML == board[2][0].innerHTML && board[2][0].innerHTML == "Y")
    {
        return "O"
    }

    return "-"

}

const checkStraight = (a, b, c) => {
    console.log("checkstraight")
    if((a == b) && (b == c) &&(c == "X"))
    {
        return "X"
    }
     if((a == b) && (b == c) &&(c == "O"))
    {
        return "O"
    }        

    //else
        return "-"
    
}

//isnt an arrow function because this way it can use 'this' 
//to reference the button clicked.
//
//always sets aiFirst button to disabled
//sets button state (disabled and inner html)
//checks for end state (and possible ends game)
//calls aiGo
//checks for end state (and possible ends game)
const boardOnClick = (i,j) => {
    console.log("boardOnclick")
    console.log("Button Pressed " + i +" " + j)
    let num = endGame()

    //if game is not over
    if(num != 1){
        if(board[i][j].innerHTML == "_"){
            board[i][j].innerHTML = playerMark
            aiFirstOnClick()    
        }
    }    

    endGame()
    
    
}

//changes playerMark global, calls aiGo
const aiFirstOnClick = () => {

    aiGo()
}

//takes in the return of checkEnd (X,O,-) if checkEnd isnt false
//disables all board buttons, shows message of who won (or cat game) in the control node
//using a new div and innerHTML
const endGame = (state)=>{
    console.log("endgame")
    let result = checkEnd()
    if(result == "X")
    {
        console.log("X WINS")
        if(win != 1){
            let text = document.createTextNode("X Wins!!! play again?")
            let spot = document.getElementById("board")
    
            spot.appendChild(text)
            win = 1
        }
        
        return 1;
    }
    if(result == "O")
    {
        console.log("O WINS")
        if(win != 1){
        let text = document.createTextNode("O Wins!!! play again?")
        let spot = document.getElementById("board")
        spot.appendChild(text)
        }
        
        return 1;
    }



    return 0;
}

//called when page finishes loading
//populates the boardNode and controlsNode with getElementById calls
//builds out buttons and saves them in the board global array
//and adds them into the boardNode
//builds out buttons and saves them in control assoc array
//and adds them into controlsNode
//attaches the functions above as button.onclick as appropriate
const load = ()=>{
    console.log("load")
    boardNode = document.getElementById("board")
    const controlNode = document.getElementById("controls")

    //rows
    for(let i = 0; i < 3;i++){
        board[i] = []
        const div = document.createElement("div")
        boardNode.appendChild(div)
        //columns
        for(let j = 0; j < 3; j++){
            const button = document.createElement("button")
            button.innerHTML = "_"
            board[i][j] = button

            button.onclick = boardOnClick.bind(null,i,j)
            
            div.appendChild(button)
            console.log("button "+i+" "+j+" is ", button)
        }
    }

}

//this says 'when the page finishes loading call my load function'
window.addEventListener("load", load); 