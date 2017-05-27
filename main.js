
// Declaring the variables
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var board = [[],[],[],[]];

// Function which draws the gameBoard
function drawBoard()
{
  for (var y = 0; y < (4); y++)
  {
    for (var x = 0; x < (4); x++)
    {
      // check what number that should be drawed
      var imgValue = board[y][x];
      var xCoord = (x * 125);
      var yCoord = (y * 125);
      context.fillStyle = "#A8A8A8";
      context.fillRect((xCoord),(yCoord),124,124);
      // checks if the board value is over zero, if true the value on the board is drawn
      if(board[y][x] > 0)
      {
        context.fillStyle = "black";
        context.font = "20px Georgia";
        context.fillText(imgValue, (62+(120*x)), (62+(125*y)));
      }
    }
  }
}

//Removes all zero values from the array and pushes all the values into a new array
function removeZero(array)
{
  var newArray = [];
  for (var i = 0; i < 4; i++)
  {
    if (array[i] > 0)
    {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

//The functions which adds the values next to eachother
function addValues(array)
{
  array = removeZero(array);
  if (array.length > 1)
  {
    for (var x = 0; x < array.length; x++)
    {
      var nextX = x + 1;
      if (array[x] === array[nextX])
      {
        array[x] = array[x]*2;
        array.splice(nextX,1);
      }
    }
  return array;
  }
  else
  {
    // If the array is empty
    return array;
  }
}

//this adds zeros until the width of the array is 4, either in fron or behind
//depending on what direction you want to move it in
function addZeros(direction, array)
{

  while(array.length != 4)
  {
    if (direction === 'left' || direction === 'up')
    {
      array.push(0);
    }
    else
    {
      array.unshift(0);
    }
  }
  return array;
}

function emptyCells(gameBoard)
{
  //this finds all the empty cells on the board
  var freeCells = [];
  for (var x = 0; x < 4; x++)
  {
    for (var y = 0; y < 4; y++)
    {
      if (gameBoard[x][y] === 0)
      {
        freeCells.push([x,y]);
      }
    }
  }
  return freeCells;
}

//This function either spawns a 2 or 4 (10%chance of a 4) in one of the empty cells
function spawnCell(emptyCells, gameBoard)
{
  // spawns a 2 or a 4 onto the board
  var randomCell = Math.floor(Math.random() * (emptyCells.length));
  var twoOrFour = Math.random() < 0.9 ? 2 : 4;
  var x = emptyCells[randomCell][0];
  var y = emptyCells[randomCell][1];
  gameBoard[x][y] = twoOrFour;
  return gameBoard;
}

//Perfroming a transpose on the array(https://en.wikipedia.org/wiki/Transpose)
function transpose(a)
{
  var newA = [[],[],[],[]];
  for (var y = 0; y < 4; y++)
  {
    for (var x = 0; x < 4; x++)
    {
      newA[y][x] = a[x][y];
    }
  }
  return newA;
}

// [[0,1,2]
//  [3,4,5]
//  [6,7,8]]
//
// [[0,3,6]
//  [1,4,7]
//  [2,5,8]]

//This function is doing most of the heavy lifting
function move(gameBoard, direction)
{
  // moves the board by getting all the x values of a row
  // removing the zeros, adding together and then adding the zeros
  // either in front of the array or in the end.
  // for up and down the board is transposed
  var newBoard = [[],[],[],];
  var xValues = [];
  var transposed = false;
  if (direction === 'up' || direction === 'down')
  {
      gameBoard = transpose(gameBoard);
      transposed = true;
  }
  for (var y = 0; y < 4; y++)
  {
    for (var x = 0; x < 4; x++)
    {
      xValues.push(gameBoard[y][x]);
    }
    var addedCol = [];

    if (direction === 'left' || direction === 'up')
    {
      addedCol = addValues(xValues);
    }
    else // right or down
    {
    // reversing the array and then adding the values which now are in the reverse order essentially making the add values from the opposite side, then reversing it again to get the normal board state.
      xValues.reverse();
      addedCol = addValues(xValues);
      addedCol.reverse();
    }
    var movedCol = addZeros(direction,addedCol);
    // adds the new row the the updated board
    newBoard[y] = movedCol;
    // moves to next row and clears the list
    xValues = [];
  }
  //checking if there have been any changes to the board, by comparing it to the old board
  newBoard = boardCheck(gameBoard, newBoard);
  //if the board have been transposed, transpose it back to get the right positions of everything
  if (transposed)
  {
    newBoard = transpose(newBoard);
  }
  return newBoard;
}

function boardCheck(gameBoard, updatedBoard)
{
   //loops thourgh the boards values to detemine if there have been a change
   //if it have it returns the board with a random spawn
   var c = 0;
   for (var y = 0; y < 4; y++)
   {
     for (var x = 0; x < 4; x++)
     {
       if (gameBoard[y][x] !== updatedBoard[y][x])
       {
         var empty = emptyCells(updatedBoard);
         updatedBoard = spawnCell(empty, updatedBoard);
         return updatedBoard;
       }
       //temporary gameover checker
       if (gameBoard[y][x] > 0)
       {
         c++;
       }
     }
   }
   if (c === 16)
   {
      gameOverCheck(gameBoard);
   }
   return gameBoard;
}
// TODO add random move and see what move/min one can achive
function randomMoves()
{
  // random number in the array and then calls the move funtion, to move it
  // making the move
  var moves = ['up','down','right','left'];
  var randomMove = Math.floor((Math.random()*moves.length));
  board = move(board, moves[randomMove]);
}


//When a ke is pressed the move function is called with the board and direction as input. After the changes have been made the board gets redrawn.
document.onkeydown = function(e)
{
  // different keys, keycodes for each. Up, down, left, right
  switch (e.keyCode)
  {
    case 38:
    //up
      board = move(board, 'up');
      break;
    case 40:
    //down
      board = move(board, 'down');
      break;
    case 37:
    //left
      board = move(board, 'left');
      break;
    case 39:
    //right
      board = move(board, 'right');
      break;
    //r button
    case 82:
      randomMoves();
      break;
    default:
      break;
  }
  drawBoard();
};

function gameOverCheck(gameBoard)
{
  // walking through values in the board and checks the number to the right and
  // the number below, if they are the same there is a possible move
  // in the last y list it only checks the right value
  // This works since it starts at the top left(0,0) and then it checks the value next to it (0,1) and also the value on the row which is below (1,0)
  for (var y = 0; y < 4; y++)
  {
    for (var x = 0; x < 4; x++)
    {
      // if not on the last row
      if (y < 3)
      {
        var below = gameBoard[y+1][x];
        var right = gameBoard[y][x+1];
        if (gameBoard[y][x] === right || gameBoard[y][x] === below)
        {
          return gameBoard;
        }
      }
      // not last row, but last x position(ex 0,3) before it moves onto the next row
      else if (x === 3 && y < 3)
      {
        var below = gameBoard[y + 1][x];
        if(gameBoard[y + 1][x] === below)
        {
          return gameBoard;
        }
      }
      // when on last row
      else if(y === 3)
      {
        var right = gameBoard[y][x+1];
        if(gameBoard[y][x] === right)
        {
          return gameBoard;
        }
      }
    }
  }
  // game over, no moves left
  alert("Game Over");
  gameStart(gameBoard);
}

// Starting the game by filling the cells with zero values(empty) then spawns a random value on the board and then redraws it
function gameStart(gameBoard)
{
  //fills the board with 0's (empty cells)
  for (var y = 0; y < 4; y++)
  {
    for (var x = 0; x < 4; x++)
    {
      gameBoard[y][x] = 0;
    }
  }
  // finds all the empty places and spawns a 2 or 4
  var empty = emptyCells(gameBoard);
  gameBoard = spawnCell(empty, gameBoard);
  drawBoard(gameBoard);
}

// starts the game and runs all the code
gameStart(board);
