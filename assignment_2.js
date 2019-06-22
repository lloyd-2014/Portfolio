    //Constructor for a tile
    function Tile(tileNumber, position, theTile){
        this.value = tileNumber;
        this.pos = position; 
        this.htmlTile = theTile;
    }
    
    //2D array representing the 4x4 playing board positions. 16 = empty square  
    var board1 = [  [5, 10,  4,  8],  
                    [9,  6,  3,  1], 
                    [2,  7, 13,  12],           
                    [15, 14, 11, 16]];

    var board2 = [  [14, 16, 1,  7],  
                    [10, 4,  8,  2], 
                    [5,  6,  12, 13], 
                    [15, 3,  11,  9]];

    var board3 = [  [5,  15, 7,  12],  
                    [14, 11, 13, 4], 
                    [2,  10, 8,  9], 
                    [3,  16, 6,  1]];

    var board4 = [  [14,  2,  5,  4],  
                    [7,  12,  15,  8], 
                    [16, 11,   6,  9], 
                    [10,  3,  13,  1]];
    
    //true = empty tile; false = occupied tile
    var boolBoard = [   [true,  true,  true,  true],  
                        [true, true,   true, true], 
                        [true,  true,  true,  true], 
                        [true,  true,  true,  true]];
    
    var board = document.getElementById("board");

    //randomly assigns theBoard a string 
    //"board1", "board2", "board3", or board4".
    var theBoard = generateBoard();
    
    //htmlTile1-16 corresponds to a div element in index.htm
    //htmlTile1-16 is appended a text node from 1-15
    //tile1-16 is an object that has properties representing
    //its tile number and tile position.
    //If else chain determines which solvable puzzle to assign to the tiles
    //If the tile object value is 16 (empty tile), it should be hidden and the 
    //corresponding boolBoard element is switched to false.
    var htmlTile1 = document.getElementById("t1");
        if(theBoard == "board1"){
            htmlTile1.childNodes[0].appendChild(document.createTextNode(board1[0][0]));
            var tile1 = new Tile(board1[0][0], 1, htmlTile1);
            if(tile1.value == 16){
                htmlTile1.style.visibility = "hidden"; 
                boolBoard[0][0] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile1.childNodes[0].appendChild(document.createTextNode(board2[0][0]));
            var tile1 = new Tile(board2[0][0], 1, htmlTile1);
            if(tile1.value == 16) {
                htmlTile1.style.visibility = "hidden"; 
                boolBoard[0][0] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile1.childNodes[0].appendChild(document.createTextNode(board3[0][0]));
            var tile1 = new Tile(board3[0][0], 1, htmlTile1);
            if(tile1.value == 16) {
                htmlTile1.style.visibility = "hidden"; 
                boolBoard[0][0] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile1.childNodes[0].appendChild(document.createTextNode(board4[0][0]));
            var tile1 = new Tile(board4[0][0], 1, htmlTile1);
            if(tile1.value == 16) {
                htmlTile1.style.visibility = "hidden"; 
                boolBoard[0][0] = false; 
            }
        }
    
    var htmlTile2 = document.getElementById("t2");
        if(theBoard == "board1"){
            htmlTile2.childNodes[0].appendChild(document.createTextNode(board1[0][1]));
            var tile2 = new Tile(board1[0][1], 2, htmlTile2);
            if(tile2.value == 16) {
                htmlTile2.style.visibility = "hidden"; 
                boolBoard[0][1] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile2.childNodes[0].appendChild(document.createTextNode(board2[0][1]));
            var tile2 = new Tile(board2[0][1], 2, htmlTile2);
            if(tile2.value == 16) {
                htmlTile2.style.visibility = "hidden"; 
                boolBoard[0][1] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile2.childNodes[0].appendChild(document.createTextNode(board3[0][1]));
            var tile2 = new Tile(board3[0][1], 2, htmlTile2);
            if(tile2.value == 16) {
                htmlTile2.style.visibility = "hidden"; 
                boolBoard[0][1] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile2.childNodes[0].appendChild(document.createTextNode(board4[0][1]));
            var tile2 = new Tile(board4[0][1], 2, htmlTile2);
            if(tile2.value == 16) {
                htmlTile2.style.visibility = "hidden"; 
                boolBoard[0][1] = false; 
            }
        }
    
    var htmlTile3 = document.getElementById("t3");
        if(theBoard == "board1"){
            htmlTile3.childNodes[0].appendChild(document.createTextNode(board1[0][2]));
            var tile3 = new Tile(board1[0][2], 3, htmlTile3);
            if(tile3.value == 16) {
                htmlTile3.style.visibility = "hidden"; 
                boolBoard[0][2] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile3.childNodes[0].appendChild(document.createTextNode(board2[0][2]));
            var tile3 = new Tile(board2[0][2], 3, htmlTile3);
            if(tile3.value == 16) {
                htmlTile3.style.visibility = "hidden"; 
                boolBoard[0][2] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile3.childNodes[0].appendChild(document.createTextNode(board3[0][2]));
            var tile3 = new Tile(board3[0][2], 3, htmlTile3);
            if(tile3.value == 16) {
                htmlTile3.style.visibility = "hidden"; 
                boolBoard[0][2] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile3.childNodes[0].appendChild(document.createTextNode(board4[0][2]));
            var tile3 = new Tile(board4[0][2], 3, htmlTile3);
            if(tile3.value == 16) {
                htmlTile3.style.visibility = "hidden"; 
                boolBoard[0][2] = false; 
            }
        }
    
    var htmlTile4 = document.getElementById("t4");
        if(theBoard == "board1"){
            htmlTile4.childNodes[0].appendChild(document.createTextNode(board1[0][3]));
            var tile4 = new Tile(board1[0][3], 4, htmlTile4);
            if(tile4.value == 16) {
                htmlTile4.style.visibility = "hidden"; 
                boolBoard[0][3] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile4.childNodes[0].appendChild(document.createTextNode(board2[0][3]));
            var tile4 = new Tile(board2[0][3], 4, htmlTile4);
            if(tile4.value == 16) {
                htmlTile4.style.visibility = "hidden"; 
                boolBoard[0][3] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile4.childNodes[0].appendChild(document.createTextNode(board3[0][3]));
            var tile4 = new Tile(board3[0][3], 4, htmlTile4);
            if(tile4.value == 16) {
                htmlTile4.style.visibility = "hidden"; 
                boolBoard[0][3] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile4.childNodes[0].appendChild(document.createTextNode(board4[0][3]));
            var tile4 = new Tile(board4[0][3], 4, htmlTile4);
            if(tile4.value == 16) {
                htmlTile4.style.visibility = "hidden"; 
                boolBoard[0][3] = false; 
            }
        }
       
    var htmlTile5 = document.getElementById("t5");
        if(theBoard == "board1"){
            htmlTile5.childNodes[0].appendChild(document.createTextNode(board1[1][0]));
            var tile5 = new Tile(board1[1][0], 5, htmlTile5);
            if(tile5.value == 16) {
                htmlTile5.style.visibility = "hidden"; 
                boolBoard[1][0] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile5.childNodes[0].appendChild(document.createTextNode(board2[1][0]));
            var tile5 = new Tile(board2[1][0], 5, htmlTile5);
            if(tile5.value == 16) {
                htmlTile5.style.visibility = "hidden"; 
                boolBoard[1][0] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile5.childNodes[0].appendChild(document.createTextNode(board3[1][0]));
            var tile5 = new Tile(board3[1][0], 5, htmlTile5);
            if(tile5.value == 16) {
                htmlTile5.style.visibility = "hidden"; 
                boolBoard[1][0] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile5.childNodes[0].appendChild(document.createTextNode(board4[1][0]));
            var tile5 = new Tile(board4[1][0], 5, htmlTile5);
            if(tile5.value == 16) {
                htmlTile5.style.visibility = "hidden"; 
                boolBoard[1][0] = false; 
            }
        }
       
    var htmlTile6 = document.getElementById("t6");
        if(theBoard == "board1"){
            htmlTile6.childNodes[0].appendChild(document.createTextNode(board1[1][1]));
            var tile6 = new Tile(board1[1][1], 6, htmlTile6);
            if(tile6.value == 16) {
                htmlTile6.style.visibility = "hidden"; 
                boolBoard[1][1] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile6.childNodes[0].appendChild(document.createTextNode(board2[1][1]));
            var tile6 = new Tile(board2[1][1], 6, htmlTile6);
            if(tile6.value == 16) {
                htmlTile6.style.visibility = "hidden"; 
                boolBoard[1][1] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile6.childNodes[0].appendChild(document.createTextNode(board3[1][1]));
            var tile6 = new Tile(board3[1][1], 6, htmlTile6);
            if(tile6.value == 16) {
                htmlTile6.style.visibility = "hidden"; 
                boolBoard[1][1] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile6.childNodes[0].appendChild(document.createTextNode(board4[1][1]));
            var tile6 = new Tile(board4[1][1], 6, htmlTile6);
            if(tile6.value == 16) {
                htmlTile6.style.visibility = "hidden"; 
                boolBoard[1][1] = false; 
            }
        }

    var htmlTile7 = document.getElementById("t7");
        if(theBoard == "board1"){
            htmlTile7.childNodes[0].appendChild(document.createTextNode(board1[1][2]));
            var tile7 = new Tile(board1[1][2], 7, htmlTile7);
            if(tile7.value == 16) {
                htmlTile7.style.visibility = "hidden"; 
                boolBoard[1][2] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile7.childNodes[0].appendChild(document.createTextNode(board2[1][2]));
            var tile7 = new Tile(board2[1][2], 7, htmlTile7);
            if(tile7.value == 16) {
                htmlTile7.style.visibility = "hidden"; 
                boolBoard[1][2] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile7.childNodes[0].appendChild(document.createTextNode(board3[1][2]));
            var tile7 = new Tile(board3[1][2], 7, htmlTile7);
            if(tile7.value == 16) {
                htmlTile7.style.visibility = "hidden"; 
                boolBoard[1][2] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile7.childNodes[0].appendChild(document.createTextNode(board4[1][2]));
            var tile7 = new Tile(board4[1][2], 7, htmlTile7);
            if(tile7.value == 16) {
                htmlTile7.style.visibility = "hidden"; 
                boolBoard[1][2] = false; 
            }
        }
        
    var htmlTile8 = document.getElementById("t8");
        if(theBoard == "board1"){
            htmlTile8.childNodes[0].appendChild(document.createTextNode(board1[1][3]));
            var tile8 = new Tile(board1[1][3], 8, htmlTile8);
            if(tile8.value == 16) {
                htmlTile8.style.visibility = "hidden"; 
                boolBoard[1][3] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile8.childNodes[0].appendChild(document.createTextNode(board2[1][3]));
            var tile8 = new Tile(board2[1][3], 8, htmlTile8);
            if(tile8.value == 16) {
                htmlTile8.style.visibility = "hidden"; 
                boolBoard[1][3] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile8.childNodes[0].appendChild(document.createTextNode(board3[1][3]));
            var tile8 = new Tile(board3[1][3], 8, htmlTile8);
            if(tile8.value == 16) {
                htmlTile8.style.visibility = "hidden"; 
                boolBoard[1][3] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile8.childNodes[0].appendChild(document.createTextNode(board4[1][3]));
            var tile8 = new Tile(board4[1][3], 8, htmlTile8);
            if(tile8.value == 16) {
                htmlTile8.style.visibility = "hidden"; 
                boolBoard[1][3] = false; 
            }
        }

    var htmlTile9 = document.getElementById("t9");
        if(theBoard == "board1"){
            htmlTile9.childNodes[0].appendChild(document.createTextNode(board1[2][0]));
            var tile9 = new Tile(board1[2][0], 9, htmlTile9);
            if(tile9.value == 16) {
                htmlTile9.style.visibility = "hidden"; 
                boolBoard[2][0] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile9.childNodes[0].appendChild(document.createTextNode(board2[2][0]));
            var tile9 = new Tile(board2[2][0], 9, htmlTile9);
            if(tile9.value == 16) {
                htmlTile9.style.visibility = "hidden"; 
                boolBoard[2][0] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile9.childNodes[0].appendChild(document.createTextNode(board3[2][0]));
            var tile9 = new Tile(board3[2][0], 9, htmlTile9);
            if(tile9.value == 16) {
                htmlTile9.style.visibility = "hidden"; 
                boolBoard[2][0] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile9.childNodes[0].appendChild(document.createTextNode(board4[2][0]));
            var tile9 = new Tile(board4[2][0], 9, htmlTile9);
            if(tile9.value == 16) {
                htmlTile9.style.visibility = "hidden"; 
                boolBoard[2][0] = false; 
            }
        }

    var htmlTile10 = document.getElementById("t10");
        if(theBoard == "board1"){
            htmlTile10.childNodes[0].appendChild(document.createTextNode(board1[2][1]));
            var tile10 = new Tile(board1[2][1], 10, htmlTile10);
            if(tile10.value == 16) {
                htmlTile10.style.visibility = "hidden"; 
                boolBoard[2][1] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile10.childNodes[0].appendChild(document.createTextNode(board2[2][1]));
             var tile10 = new Tile(board2[2][1], 10, htmlTile10);
            if(tile10.value == 16) {
                htmlTile10.style.visibility = "hidden"; 
                boolBoard[2][1] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile10.childNodes[0].appendChild(document.createTextNode(board3[2][1]));
             var tile10 = new Tile(board3[2][1], 10, htmlTile10);
            if(tile10.value == 16) {
                htmlTile10.style.visibility = "hidden"; 
                boolBoard[2][1] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile10.childNodes[0].appendChild(document.createTextNode(board4[2][1]));
             var tile10 = new Tile(board4[2][1], 10, htmlTile10);
            if(tile10.value == 16) {
                htmlTile10.style.visibility = "hidden"; 
                boolBoard[2][1] = false; 
            }
        }

    var htmlTile11 = document.getElementById("t11");
        if(theBoard == "board1"){
            htmlTile11.childNodes[0].appendChild(document.createTextNode(board1[2][2]));
             var tile11 = new Tile(board1[2][2], 11, htmlTile11);
            if(tile11.value == 16) {
                htmlTile11.style.visibility = "hidden"; 
                boolBoard[2][2] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile11.childNodes[0].appendChild(document.createTextNode(board2[2][2]));
            var tile11 = new Tile(board2[2][2], 11, htmlTile11);
            if(tile11.value == 16) {
                htmlTile11.style.visibility = "hidden"; 
                boolBoard[2][2] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile11.childNodes[0].appendChild(document.createTextNode(board3[2][2]));
            var tile11 = new Tile(board3[2][2], 11, htmlTile11);
            if(tile11.value == 16) {
                htmlTile11.style.visibility = "hidden"; 
                boolBoard[2][2] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile11.childNodes[0].appendChild(document.createTextNode(board4[2][2]));
            var tile11 = new Tile(board4[2][2], 11, htmlTile11);
            if(tile11.value == 16) {
                htmlTile11.style.visibility = "hidden"; 
                boolBoard[2][2] = false; 
            }
        }

    var htmlTile12 = document.getElementById("t12");
        if(theBoard == "board1"){
            htmlTile12.childNodes[0].appendChild(document.createTextNode(board1[2][3]));
            var tile12 = new Tile(board1[2][3], 12, htmlTile12);
            if(tile12.value == 16) {
                htmlTile12.style.visibility = "hidden"; 
                boolBoard[2][3] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile12.childNodes[0].appendChild(document.createTextNode(board2[2][3]));
            var tile12 = new Tile(board2[2][3], 12, htmlTile12);
            if(tile12.value == 16) {
                htmlTile12.style.visibility = "hidden"; 
                boolBoard[2][3] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile12.childNodes[0].appendChild(document.createTextNode(board3[2][3]));
            var tile12 = new Tile(board3[2][3], 12, htmlTile12);
            if(tile12.value == 16) {
                htmlTile12.style.visibility = "hidden"; 
                boolBoard[2][3] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile12.childNodes[0].appendChild(document.createTextNode(board4[2][3]));
            var tile12 = new Tile(board4[2][3], 12, htmlTile12);
            if(tile12.value == 16) {
                htmlTile12.style.visibility = "hidden"; 
                boolBoard[2][3] = false; 
            }
        }

    var htmlTile13 = document.getElementById("t13");
        if(theBoard == "board1"){
            htmlTile13.childNodes[0].appendChild(document.createTextNode(board1[3][0]));
            var tile13 = new Tile(board1[3][0], 13, htmlTile13);
            if(tile13.value == 16) {
                htmlTile13.style.visibility = "hidden";
                boolBoard[3][0] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile13.childNodes[0].appendChild(document.createTextNode(board2[3][0]));
            var tile13 = new Tile(board2[3][0], 13, htmlTile13);
            if(tile13.value == 16) {
                htmlTile13.style.visibility = "hidden";
                boolBoard[3][0] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile13.childNodes[0].appendChild(document.createTextNode(board3[3][0]));
            var tile13 = new Tile(board3[3][0], 13, htmlTile13);
            if(tile13.value == 16) {
                htmlTile13.style.visibility = "hidden";
                boolBoard[3][0] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile13.childNodes[0].appendChild(document.createTextNode(board4[3][0]));
            var tile13 = new Tile(board4[3][0], 13, htmlTile13);
            if(tile13.value == 16) {
                htmlTile13.style.visibility = "hidden";
                boolBoard[3][0] = false; 
            }
        }

    var htmlTile14 = document.getElementById("t14");
        if(theBoard == "board1"){
            htmlTile14.childNodes[0].appendChild(document.createTextNode(board1[3][1]));
            var tile14 = new Tile(board1[3][1], 14, htmlTile14);
            if(tile14.value == 16) {
                htmlTile14.style.visibility = "hidden"; 
                boolBoard[3][1] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile14.childNodes[0].appendChild(document.createTextNode(board2[3][1]));
            var tile14 = new Tile(board2[3][1], 14, htmlTile14);
            if(tile14.value == 16) {
                htmlTile14.style.visibility = "hidden"; 
                boolBoard[3][1] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile14.childNodes[0].appendChild(document.createTextNode(board3[3][1]));
            var tile14 = new Tile(board3[3][1], 14, htmlTile14);
            if(tile14.value == 16) {
                htmlTile14.style.visibility = "hidden"; 
                boolBoard[3][1] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile14.childNodes[0].appendChild(document.createTextNode(board4[3][1]));
            var tile14 = new Tile(board4[3][1], 14, htmlTile14);
            if(tile14.value == 16) {
                htmlTile14.style.visibility = "hidden"; 
                boolBoard[3][1] = false; 
            }
        }

    var htmlTile15 = document.getElementById("t15"); 
        if(theBoard == "board1"){
            htmlTile15.childNodes[0].appendChild(document.createTextNode(board1[3][2]));
            var tile15 = new Tile(board1[3][2], 15, htmlTile15);
            if(tile15.value == 16) {
                htmlTile15.style.visibility = "hidden"; 
                boolBoard[3][2] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile15.childNodes[0].appendChild(document.createTextNode(board2[3][2]));
            var tile15 = new Tile(board2[3][2], 15, htmlTile15);
            if(tile15.value == 16) {
                htmlTile15.style.visibility = "hidden"; 
                boolBoard[3][2] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile15.childNodes[0].appendChild(document.createTextNode(board3[3][2]));
            var tile15 = new Tile(board3[3][2], 15, htmlTile15);
            if(tile15.value == 16) {
                htmlTile15.style.visibility = "hidden"; 
                boolBoard[3][2] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile15.childNodes[0].appendChild(document.createTextNode(board4[3][2]));
            var tile15 = new Tile(board4[3][2], 15, htmlTile15);
            if(tile15.value == 16) {
                htmlTile15.style.visibility = "hidden"; 
                boolBoard[3][2] = false; 
            }
        }

    var htmlTile16 = document.getElementById("t16");
        if(theBoard == "board1"){
            htmlTile16.childNodes[0].appendChild(document.createTextNode(board1[3][3]));
            var tile16 = new Tile(board1[3][3], 16, htmlTile16);
            if(tile16.value == 16) {
                htmlTile16.style.visibility = "hidden";
                boolBoard[3][3] = false; 
            }
        }
        else if(theBoard == "board2"){
            htmlTile16.childNodes[0].appendChild(document.createTextNode(board2[3][3]));
            var tile16 = new Tile(board2[3][3], 16, htmlTile16);
            if(tile16.value == 16) {
                htmlTile16.style.visibility = "hidden";
                boolBoard[3][3] = false; 
            }
        }
        else if(theBoard == "board3"){
            htmlTile16.childNodes[0].appendChild(document.createTextNode(board3[3][3]));
            var tile16 = new Tile(board3[3][3], 16, htmlTile16);
            if(tile16.value == 16) {
                htmlTile16.style.visibility = "hidden";
                boolBoard[3][3] = false; 
            }
        }
        else if(theBoard == "board4"){
            htmlTile16.childNodes[0].appendChild(document.createTextNode(board4[3][3]));
            var tile16 = new Tile(board4[3][3], 16, htmlTile16);
            if(tile16.value == 16) {
                htmlTile16.style.visibility = "hidden";
                boolBoard[3][3] = false; 
            }
        }

    //tiles1-16.htmlTile can move up, down, left, or right
    //by clicking on the tile. The tiles movement are restricted
    //depending on their position number.
    //When a tile moves their position number is 
    //increased by 1 or 4, or decreased
    //by 1 or 4. (+1 to move right, +4 to move down, -1 to move left
    //-4 to move up). Only a tile's position number is changed dynamically
    //in code. The tile's value, assigned when the webpage is opened, remains
    //static.
    $(tile16.htmlTile).click(function(){
        if(checkIfEmpty(tile16.pos, boolBoard, "right") == "right"){
            $(tile16.htmlTile).animate({left: "+=80px"}); 
            tile16.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile16.pos, boolBoard, "left") == "left"){
            $(tile16.htmlTile).animate({left: "-=80px"});
            tile16.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile16.pos, boolBoard, "down") == "down"){
            $(tile16.htmlTile).animate({bottom: "-=80px"});
            tile16.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile16.pos, boolBoard, "up") == "up"){
            $(tile16.htmlTile).animate({bottom: "+=80px"});
            tile16.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile15.htmlTile).click(function(){
        if(checkIfEmpty(tile15.pos, boolBoard, "right") == "right"){
            $(tile15.htmlTile).animate({left: "+=80px"}); 
            tile15.pos += 1;
        }
        else if(checkIfEmpty(tile15.pos, boolBoard, "left") == "left"){
            $(tile15.htmlTile).animate({left: "-=80px"});
            tile15.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile15.pos, boolBoard, "down") == "down"){
            $(tile15.htmlTile).animate({bottom: "-=80px"});
            tile15.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile15.pos, boolBoard, "up") == "up"){
            $(tile15.htmlTile).animate({bottom: "+=80px"});
            tile15.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile14.htmlTile).click(function(){
        if(checkIfEmpty(tile14.pos, boolBoard, "right") == "right"){
            $(tile14.htmlTile).animate({left: "+=80px"}); 
            tile14.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile14.pos, boolBoard, "left") == "left"){
            $(tile14.htmlTile).animate({left: "-=80px"});
            tile14.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile14.pos, boolBoard, "down") == "down"){
            $(tile14.htmlTile).animate({bottom: "-=80px"});
            tile14.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile14.pos, boolBoard, "up") == "up"){
            $(tile14.htmlTile).animate({bottom: "+=80px"});
            tile14.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile13.htmlTile).click(function(){
        if(checkIfEmpty(tile13.pos, boolBoard, "right") == "right"){
            $(tile13.htmlTile).animate({left: "+=80px"}); 
            tile13.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile13.pos, boolBoard, "left") == "left"){
            $(tile13.htmlTile).animate({left: "-=80px"});
            tile13.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile13.pos, boolBoard, "down") == "down"){
            $(tile13.htmlTile).animate({bottom: "-=80px"});
            tile13.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile13.pos, boolBoard, "up") == "up"){
            $(tile13.htmlTile).animate({bottom: "+=80px"});
            tile13.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile12.htmlTile).click(function(){
        if(checkIfEmpty(tile12.pos, boolBoard, "right") == "right"){
            $(tile12.htmlTile).animate({left: "+=80px"}); 
            tile12.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile12.pos, boolBoard, "left") == "left"){
            $(tile12.htmlTile).animate({left: "-=80px"});
            tile12.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile12.pos, boolBoard, "down") == "down"){
            $(tile12.htmlTile).animate({bottom: "-=80px"});
            tile12.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile12.pos, boolBoard, "up") == "up"){
            $(tile12.htmlTile).animate({bottom: "+=80px"});
            tile12.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile11.htmlTile).click(function(){
        if(checkIfEmpty(tile11.pos, boolBoard, "right") == "right"){
            $(tile11.htmlTile).animate({left: "+=80px"}); 
            tile11.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile11.pos, boolBoard, "left") == "left"){
            $(tile11.htmlTile).animate({left: "-=80px"});
            tile11.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile11.pos, boolBoard, "down") == "down"){
            $(tile11.htmlTile).animate({bottom: "-=80px"});
            tile11.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile11.pos, boolBoard, "up") == "up"){
            $(tile11.htmlTile).animate({bottom: "+=80px"});
            tile11.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile10.htmlTile).click(function(){
        if(checkIfEmpty(tile10.pos, boolBoard, "right") == "right"){
            $(tile10.htmlTile).animate({left: "+=80px"}); 
            tile10.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile10.pos, boolBoard, "left") == "left"){
            $(tile10.htmlTile).animate({left: "-=80px"});
            tile10.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile10.pos, boolBoard, "down") == "down"){
            $(tile10.htmlTile).animate({bottom: "-=80px"});
            tile10.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile10.pos, boolBoard, "up") == "up"){
            $(tile10.htmlTile).animate({bottom: "+=80px"});
            tile10.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile9.htmlTile).click(function(){
        if(checkIfEmpty(tile9.pos, boolBoard, "right") == "right"){
            $(tile9.htmlTile).animate({left: "+=80px"}); 
            tile9.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile9.pos, boolBoard, "left") == "left"){
            $(tile9.htmlTile).animate({left: "-=80px"});
            tile9.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile9.pos, boolBoard, "down") == "down"){
            $(tile9.htmlTile).animate({bottom: "-=80px"});
            tile9.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile9.pos, boolBoard, "up") == "up"){
            $(tile9.htmlTile).animate({bottom: "+=80px"});
            tile9.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile8.htmlTile).click(function(){
        if(checkIfEmpty(tile8.pos, boolBoard, "right") == "right"){
            $(tile8.htmlTile).animate({left: "+=80px"}); 
            tile8.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile8.pos, boolBoard, "left") == "left"){
            $(tile8.htmlTile).animate({left: "-=80px"});
            tile8.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile8.pos, boolBoard, "down") == "down"){
            $(tile8.htmlTile).animate({bottom: "-=80px"});
            tile8.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile8.pos, boolBoard, "up") == "up"){
            $(tile8.htmlTile).animate({bottom: "+=80px"});
            tile8.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile7.htmlTile).click(function(){
        if(checkIfEmpty(tile7.pos, boolBoard, "right") == "right"){
            $(tile7.htmlTile).animate({left: "+=80px"}); 
            tile7.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile7.pos, boolBoard, "left") == "left"){
            $(tile7.htmlTile).animate({left: "-=80px"});
            tile7.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile7.pos, boolBoard, "down") == "down"){
            $(tile7.htmlTile).animate({bottom: "-=80px"});
            tile7.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile7.pos, boolBoard, "up") == "up"){
            $(tile7.htmlTile).animate({bottom: "+=80px"});
            tile7.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile6.htmlTile).click(function(){
        if(checkIfEmpty(tile6.pos, boolBoard, "right") == "right"){
            $(tile6.htmlTile).animate({left: "+=80px"}); 
            tile6.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile6.pos, boolBoard, "left") == "left"){
            $(tile6.htmlTile).animate({left: "-=80px"});
            tile6.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile6.pos, boolBoard, "down") == "down"){
            $(tile6.htmlTile).animate({bottom: "-=80px"});
            tile6.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile6.pos, boolBoard, "up") == "up"){
            $(tile6.htmlTile).animate({bottom: "+=80px"});
            tile6.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile5.htmlTile).click(function(){
        if(checkIfEmpty(tile5.pos, boolBoard, "right") == "right"){
            $(tile5.htmlTile).animate({left: "+=80px"}); 
            tile5.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile5.pos, boolBoard, "left") == "left"){
            $(tile5.htmlTile).animate({left: "-=80px"});
            tile5.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile5.pos, boolBoard, "down") == "down"){
            $(tile5.htmlTile).animate({bottom: "-=80px"});
            tile5.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile5.pos, boolBoard, "up") == "up"){
            $(tile5.htmlTile).animate({bottom: "+=80px"});
            tile5.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile4.htmlTile).click(function(){
        if(checkIfEmpty(tile4.pos, boolBoard, "right") == "right"){
            $(tile4.htmlTile).animate({left: "+=80px"}); 
            tile4.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile4.pos, boolBoard, "left") == "left"){
            $(tile4.htmlTile).animate({left: "-=80px"});
            tile4.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile4.pos, boolBoard, "down") == "down"){
            $(tile4.htmlTile).animate({bottom: "-=80px"});
            tile4.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile4.pos, boolBoard, "up") == "up"){
            $(tile4.htmlTile).animate({bottom: "+=80px"});
            tile4.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile3.htmlTile).click(function(){
        if(checkIfEmpty(tile3.pos, boolBoard, "right") == "right"){
            $(tile3.htmlTile).animate({left: "+=80px"}); 
            tile3.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile3.pos, boolBoard, "left") == "left"){
            $(tile3.htmlTile).animate({left: "-=80px"});
            tile3.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile3.pos, boolBoard, "down") == "down"){
            $(tile3.htmlTile).animate({bottom: "-=80px"});
            tile3.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile3.pos, boolBoard, "up") == "up"){
            $(tile3.htmlTile).animate({bottom: "+=80px"});
            tile3.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile2.htmlTile).click(function(){
        if(checkIfEmpty(tile2.pos, boolBoard, "right") == "right"){
            $(tile2.htmlTile).animate({left: "+=80px"}); 
            tile2.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile2.pos, boolBoard, "left") == "left"){
            $(tile2.htmlTile).animate({left: "-=80px"});
            tile2.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile2.pos, boolBoard, "down") == "down"){
            $(tile2.htmlTile).animate({bottom: "-=80px"});
            tile2.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile2.pos, boolBoard, "up") == "up"){
            $(tile2.htmlTile).animate({bottom: "+=80px"});
            tile2.pos -= 4;
            isSolved(); //check if board is solved
        }
    });
    $(tile1.htmlTile).click(function(){
        if(checkIfEmpty(tile1.pos, boolBoard, "right") == "right"){
            $(tile1.htmlTile).animate({left: "+=80px"}); 
            tile1.pos += 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile1.pos, boolBoard, "left") == "left"){
            $(tile1.htmlTile).animate({left: "-=80px"});
            tile1.pos -= 1;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile1.pos, boolBoard, "down") == "down"){
            $(tile1.htmlTile).animate({bottom: "-=80px"});
            tile1.pos += 4;
            isSolved(); //check if board is solved
        }
        else if(checkIfEmpty(tile1.pos, boolBoard, "up") == "up"){
            $(tile1.htmlTile).animate({bottom: "+=80px"});
            tile1.pos -= 4;
            isSolved(); //check if board is solved
        }
    });

/*  Accepts: 
*       a position number, n, 
*       the boolBoard[][] array,
*       and a direction, dir, for movement
*   Returns: 
*       a string of either "up", "down",
*       "left", or "right".
*   Changes:
*       boolBoard element to either true or false.
*   Description:
*       Function checks if a tile is empty in board
*       positions 1-16. The returned string
*       determines which direction the tile will move.
*       The occupied tile becomes false (becomes empty)
*       and the empty tile becomes true(becomes occupied).
*/
function checkIfEmpty(n, boolBoard, dir){
    //false == empty tile, true == occupied tile
   if(n == 16){//[3][3]     
       if((boolBoard[3][2] == false) && (dir == "left")){
           boolBoard[3][2] = true;
           boolBoard[3][3] = false;
           return "left";
       }
       else if((boolBoard[2][3] == false) && (dir == "up")){
           boolBoard[2][3] = true;
           boolBoard[3][3] = false;
           return "up"; 
       }
   }
    if(n == 15){//[3][2]
        if((boolBoard[3][3] == false) && (dir == "right")){
            boolBoard[3][3] = true;
            boolBoard[3][2] = false;
            return "right";
        }
        else if((boolBoard[3][1] == false) && (dir == "left")){
            boolBoard[3][1] = true;
            boolBoard[3][2] = false;
            return "left";
        }
        else if((boolBoard[2][2] == false) && (dir == "up")){
            boolBoard[2][2] = true;
            boolBoard[3][2] = false;
            return "up";
        }
    }
    if(n == 14){//[3][1]
        if((boolBoard[3][0] == false) && (dir == "left")){
            boolBoard[3][0] = true;
            boolBoard[3][1] = false;
            return "left";
        }
        else if((boolBoard[3][2] == false) && (dir == "right")){
            boolBoard[3][2] = true;
            boolBoard[3][1] = false;
            return "right";
        }
        else if((boolBoard[2][1] == false) && (dir == "up")){
            boolBoard[2][1] = true;
            boolBoard[3][1] = false;
            return "up";
        }
    }
    if(n == 13){//[3][0]
        if((boolBoard[3][1] == false) && (dir == "right")){
            boolBoard[3][1] = true;
            boolBoard[3][0] = false;
            return "right";
        }
        else if((boolBoard[2][0] == false) && (dir == "up")){
            boolBoard[2][0] = true;
            boolBoard[3][0] = false;
            return "up";
        }
    }
    if(n == 12){//[2][3]
        if((boolBoard[2][2] == false) && (dir == "left")){
            boolBoard[2][2] = true;
            boolBoard[2][3] = false;
            return "left";
        }
        else if((boolBoard[3][3] == false) && (dir == "down")){
            boolBoard[3][3] = true;
            boolBoard[2][3] = false;
            return "down";
        }
        else if((boolBoard[1][3] == false) && (dir == "up")){
            boolBoard[1][3] = true;
            boolBoard[2][3] = false;
            return "up";
        }
    }
    if(n == 11){//[2][2]
        if((boolBoard[2][1] == false) && (dir == "left")){
            boolBoard[2][1] = true;
            boolBoard[2][2] = false;
            return "left";
        }
        else if((boolBoard[2][3] == false) && (dir == "right")){
            boolBoard[2][3] = true;
            boolBoard[2][2] = false;
            return "right";
        }
        else if((boolBoard[1][2] == false) && (dir == "up")){
            boolBoard[1][2] = true;
            boolBoard[2][2] = false;
            return "up";
        }
        else if((boolBoard[3][2] == false) && (dir == "down")){
            boolBoard[3][2] = true;
            boolBoard[2][2] = false;
            return "down";
        }
    }
    if(n == 10){//[2][1]
        if((boolBoard[2][0] == false) && (dir == "left")){
            boolBoard[2][0] = true;
            boolBoard[2][1] = false;
            return "left";
        }
        else if((boolBoard[2][2] == false) && (dir == "right")){
            boolBoard[2][2] = true;
            boolBoard[2][1] = false;
            return "right";
        }
        else if((boolBoard[1][1] == false) && (dir == "up")){
            boolBoard[1][1] = true;
            boolBoard[2][1] = false;
            return "up";
        }
        else if((boolBoard[3][1] == false) && (dir == "down")){
            boolBoard[3][1] = true;
            boolBoard[2][1] = false;
            return "down";
        }
    }
    if(n == 9){//[2][0]
        if((boolBoard[2][1] == false) && (dir == "right")){
            boolBoard[2][1] = true;
            boolBoard[2][0] = false;
            return "right";
        }
        else if((boolBoard[3][0] == false) && (dir == "down")){
            boolBoard[3][0] = true;
            boolBoard[2][0] = false;
            return "down";
        }
        else if((boolBoard[1][0] == false) && (dir == "up")){
            boolBoard[1][0] = true;
            boolBoard[2][0] = false;
            return "up";
        }
    }
    if(n == 8){//[1][3]
        if((boolBoard[1][2] == false) && (dir == "left")){
            boolBoard[1][2] = true;
            boolBoard[1][3] = false;
            return "left";
        }
        else if((boolBoard[2][3] == false) && (dir == "down")){
            boolBoard[2][3] = true;
            boolBoard[1][3] = false;
            return "down";
        }
        else if((boolBoard[0][3] == false) && (dir == "up")){
            boolBoard[0][3] = true;
            boolBoard[1][3] = false;
            return "up";
        }
    }
    if(n == 7){//[1][2]
        if((boolBoard[1][1] == false) && (dir == "left")){
            boolBoard[1][1] = true;
            boolBoard[1][2] = false;
            return "left";
        }
        else if((boolBoard[1][3] == false) && (dir == "right")){
            boolBoard[1][3] = true;
            boolBoard[1][2] = false;
            return "right";
        }
        else if((boolBoard[0][2] == false) && (dir == "up")){
            boolBoard[0][2] = true;
            boolBoard[1][2] = false;
            return "up";
        }
        else if((boolBoard[2][2] == false) && (dir == "down")){
            boolBoard[2][2] = true;
            boolBoard[1][2] = false;
            return "down";
        }
    }
    if(n == 6){//[1][1]
        if((boolBoard[1][0] == false) && (dir == "left")){
            boolBoard[1][0] = true;
            boolBoard[1][1] = false;
            return "left";
        }
        else if((boolBoard[1][2] == false) && (dir == "right")){
            boolBoard[1][2] = true;
            boolBoard[1][1] = false;
            return "right";
        }
        else if((boolBoard[0][1] == false) && (dir == "up")){
            boolBoard[0][1] = true;
            boolBoard[1][1] = false;
            return "up";
        }
        else if((boolBoard[2][1] == false) && (dir == "down")){
            boolBoard[2][1] = true;
            boolBoard[1][1] = false;
            return "down";
        }
    }
    if(n == 5){//[1][0]
        if((boolBoard[1][1] == false) && (dir == "right")){
            boolBoard[1][1] = true;
            boolBoard[1][0] = false;
            return "right";
        }
        else if((boolBoard[2][0] == false) && (dir == "down")){
            boolBoard[2][0] = true;
            boolBoard[1][0] = false;
            return "down";
        }
        else if((boolBoard[0][0] == false) && (dir == "up")){
            boolBoard[0][0] = true;
            boolBoard[1][0] = false;
            return "up";
        }
    }
    if(n == 4){//[0][3]     
       if((boolBoard[0][2] == false) && (dir == "left")){
           boolBoard[0][2] = true;
           boolBoard[0][3] = false;
           return "left";
       }
       else if((boolBoard[1][3] == false) && (dir == "down")){
           boolBoard[1][3] = true;
           boolBoard[0][3] = false;
           return "down"; 
       }
   }
    if(n == 3){//[0][2]
        if((boolBoard[0][3] == false) && (dir == "right")){
            boolBoard[0][3] = true;
            boolBoard[0][2] = false;
            return "right";
        }
        else if((boolBoard[0][1] == false) && (dir == "left")){
            boolBoard[0][1] = true;
            boolBoard[0][2] = false;
            return "left";
        }
        else if((boolBoard[1][2] == false) && (dir == "down")){
            boolBoard[1][2] = true;
            boolBoard[0][2] = false;
            return "down";
        }
    }
    if(n == 2){//[0][1]
        if((boolBoard[0][0] == false) && (dir == "left")){
            boolBoard[0][0] = true;
            boolBoard[0][1] = false;
            return "left";
        }
        else if((boolBoard[0][2] == false) && (dir == "right")){
            boolBoard[0][2] = true;
            boolBoard[0][1] = false;
            return "right";
        }
        else if((boolBoard[1][1] == false) && (dir == "down")){
            boolBoard[1][1] = true;
            boolBoard[0][1] = false;
            return "down";
        }
    }
    if(n == 1){//[0][0]     
       if((boolBoard[0][1] == false) && (dir == "right")){
           boolBoard[0][1] = true;
           boolBoard[0][0] = false;
           return "right";
       }
       else if((boolBoard[1][0] == false) && (dir == "down")){
           boolBoard[1][0] = true;
           boolBoard[0][0] = false;
           return "down"; 
       }
   }
}

/*  No return or parameters.
*   Description:
*       Compares the tile's position
*       number (1-16) with its value (1-16).
*       If the position and value are equal,
*       then the tile is in the correct position.
*       The variable, solved, keeps count of how many 
*       tiles are correct. If sovled is equal to 15 or
*       16, then the puzzle is solved. This disjunction
*       takes in account if a tile's value is 16
        but original position is not 16. A tile's value that
*       is 16 becomes hidden in the html page and cannot be clicked
*       and tiles move over it. Therefore, the function will count that 
*       tile as incorrect because its postion number and value don't equal
*       Therefore, the puzzle is still correct if the variable solved = 15.
*       Solved = 16 if a tile's value was assigned 16 (empty tile) 
*       and starting position is 16. 
*       Therefore, it remains hidden in position 16 forever and the
*       the variable solved counts it as a correct position even though
*       it is empty.
*/
function isSolved(){
    
    var puzzle15 = [[tile1, tile2, tile3, tile4], 
                    [tile5, tile6, tile7, tile8], 
                    [tile9, tile10, tile11, tile12], 
                    [tile13, tile14, tile15, tile16] ]; 
    
    var solved = 0;
    
    var row = 0;
    
    for(var numberOfRows = 0; numberOfRows < 4; numberOfRows++){
        for(var col = 0; col < 4; col++){    
            if(puzzle15[row][col].value == puzzle15[row][col].pos){
                solved++;
            }
        }
        row++;
    }
    
    //Changes the html text "You solved the puzzle!" to visible
    if(solved == 16 || solved == 15){
        var appear = document.getElementById("solved");
        appear.style.visibility = "visible";
        $("#text").animate({"font-size": "50px"});
        $(".tile2").css("background-color", "#3B0AB3");
    }
    
}

/*  Description:
*      Returns a string 
*      based on a random number
*      generated between 0 and 4.
*      This function determines
*      which solvable puzzle to present the
*      user.
*/
function generateBoard(){
    
    var max = 4;
    var min = 0;
    var num = 0;
    
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    num = (Math.random() * (max - min)) + min;
    
    if((num >= 0) && (num <= 1))
        return "board1";
    else if((num > 1) && (num <= 2))
        return "board2";
    else if((num > 2) && (num <= 3))
        return "board3";
    else if((num > 3) && (num <= 4))
        return "board4";

}