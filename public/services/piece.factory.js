(function() {
  'use strict';
  angular.module('Chess').factory('Piece',pieceFactory);
  
  function pieceFactory() {
    var gridRow = 8;
    var gridCol = 8;
    return {
      king : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          for (var i=-1; i<=1; i++) {
            for (var j=-1;j<=1;j++){
              if (i != 0 || j != 0 ){
                var newR = pos.r + i;
                var newC = pos.c + j;
                if (newR > 0 && newC > 0 && newR<= gridRow && newC <= gridCol) {
                  posArray.push({r : newR, c : newC});
                }                 
              }
            }
          }
          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:1,c:5}];
        }
        , canLeap : function() {
          return false;
        }
      },
      queen : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          var row = pos.r, col = pos.c;
          var min = Math.min(row,col);
          getRowPositions(row,col,posArray);
          getColPositions(row,col,posArray);
          getDiagPositions(row,col,posArray);
          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:1,c:4}];
        }
        , canLeap : function() {
          return false;
        }
      },
      rook : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          var row = pos.r, col = pos.c;
          getRowPositions(row,col,posArray);
          getColPositions(row,col,posArray);
          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:1,c:1},{r:1,c:8}];
        }
        , canLeap : function() {
          return false;
        }
      },
      bishop : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          var row = pos.r, col = pos.c;
          getDiagPositions(row,col,posArray);          
          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:1,c:3},{r:1,c:6}];
        }
        , canLeap : function() {
          return false;
        }
      },
      knight : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          addToArray(pos.r-2,pos.c-1,posArray);
          addToArray(pos.r-2,pos.c+1,posArray);
          addToArray(pos.r-1,pos.c-2,posArray);
          addToArray(pos.r-1,pos.c+2,posArray);
          addToArray(pos.r+1,pos.c-2,posArray);
          addToArray(pos.r+1,pos.c+2,posArray);
          addToArray(pos.r+2,pos.c-1,posArray);
          addToArray(pos.r+2,pos.c+1,posArray);

          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:1,c:2},{r:1,c:7}];
        }
        , canLeap : function() {
          return true;
        }
      },
      pawn : {
        getPossiblePositions : function(pos) {
          var posArray = [];
          if (pos.r < 8) {
            posArray.push({r:pos.r+1, c: pos.c});
            if(pos.r ===2){
              posArray.push({r:pos.r+2, c: pos.c});
            }
            if (pos.c > 1) posArray.push({r:pos.r+1, c: pos.c-1}); 
            if (pos.c < 8) posArray.push({r:pos.r+1, c: pos.c+1}); 
          }
          return posArray;
        }
        , getInitialPositions : function() {
          return [{r:2,c:1},{r:2,c:2},{r:2,c:3},{r:2,c:4},{r:2,c:5},{r:2,c:6},{r:2,c:7},{r:2,c:8}];
        }
        , canLeap : function() {
          return true;
        }
      }
    };
  }

  function getRowPositions(row,col,posArray) {
          for (var i=1-row,max=8-row; i <= max; i++) {
            if (i !=0 ) {
              posArray.push({r : row+i, c : col});
            }
          }
  }

  function getColPositions(row,col,posArray) {
          for (var i=1-col,max=8-col; i <= max; i++) {
            if (i !=0 ) {
              posArray.push({r : row, c : col+i});
            }
          }
          
  }

  function getDiagPositions(row,col,posArray) {
          var num = Math.max(row,col);

          for (var i=1-num,max=8-num; i <= max; i++) {
            if (i !=0 && col+i > 0 && col+i <= 8) {
              if(row+i > 0 && row+i <= 8) posArray.push({r : row+i, c : col+i});
              if(row-i <=8 && row-i >0) posArray.push({r : row-i, c : col+i});
            
            }
          }
  }
  function addToArray(row,col,posArray){
    if (row > 0 && row <=8  && col > 0 && col <= 8) posArray.push({r : row, c : col});
  }

})();