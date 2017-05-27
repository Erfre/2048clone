
2048 Clone

This is a copy of the game 2048 where you slide around numbered tiles on
a 4x4 grid to combine them and create a 2048 tile or higher. Although my
version don't have any scoreboard or scoring system. 


Installation

To get this project up and running you have to download this repo and open
up the index.html in your prefered browser. This project is not tested on all browsers!
1. Download or clone this repo
2. Unzip
3. Open up the index.html in a browser
4. Press the arrow keys to move the tiles around

History/Explanation

This is my first javascript project, it's what got me into javascript.
Initilly it was a challenge between a me and a friend to each write a 2048
clone and then compare the code, although the challenge kinda got forgotten.
But I had already started and found a nice flow so I just went ahead.

I'm really happy with how i managed to solve each of the challenges in this
small copy of 2048. This was written before I had any good understanding
of how classes and objects worked so it's kinda hard to follow.

I remember really enjoying working with the canvas element since it made drawing
things in the browser super easy. Using only a small amount of code you could very
easily display something for the whole world to see.
Although there is a lot of things I want to change/update I will restrain from 
doing so, simply because this is one my first programs.

I have tried to expand upon on my old comments, to make it easier to understand
what is going on.

Down below you will find a basic explanation on how the code works:

The move function basically does all the work, first it creates a new board 
which starts out empty. Then it checks the input of the direction  to determine
wether to transpose the matrix or not. Then all the values on the rows are 
copied into a new array where they later get added, by the addValues function
(this function alsoremoves the zero values).If the direction is either right or
down, the x values get reversed then added then reversed again to simulate the
right or down movement.

After this all the new values on the rows have been calculated so now its time
to add the empty cells(Zero values).

Then it's time for a boardcheck to determine wether the board has changed or 
not. If there is no change the gameovercheck gets called, to determine wheter
there are no more moves available.

If the board was transposed in the beginning it gets transposed one more time 
to retrun it into the "normal" state.

License

MIT License

Copyright (c) [2017] [Erik]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
