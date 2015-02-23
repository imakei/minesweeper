/* global _ */
angular
.module('ngMineSweeper')
.factory('$gameService', function($settingConst) {

  var tiles = [];
  var game;
  var gameSettings;

  var init =  function(opts){
    game = opts.game;
    gameSettings = opts.gameSettings;

    generateTiles();
    setGameStatus($settingConst.status.play);

    return tiles;
  };

  var generateBombsArray = function(){
    var settings = gameSettings;
    var d = gameSettings.dementions;

    var arr  = [];
    //bombを入れる．
    for(var i=0; i<settings.bombs; i++){
      arr.push(1);
    }

    //bombじゃないやつを入れる．
    for(i=0; i < d.width*d.height-settings.bombs; i++){
      arr.push(0);
    }

    return _.shuffle(arr);
  };

  var generateTiles = function(){
    tiles = [];

    var bombs = generateBombsArray();

    for(var i=0; i<bombs.length; i++){
      var num;
      if(bombs[i]){
        num = -1;
      } else {
        num = countAroundBombs(i, bombs);
      }

      tiles.push({
        id: i,
        number: num,
        isOpen: false,
        isFlag: false
      });
    }

  };

  var countAroundBombs = function(index, bombs){
    var count = 0;
    var width = gameSettings.dementions.width;
    var height = gameSettings.dementions.height;

    // なんかもっとうまい方法ありそう．
    //上
    if(bombs[index-width]){
      count++;
    }

    //下
    if(bombs[index+width]){
      count++;
    }

    //左
    if(index%width !== 0){
      //左
      if(index%width !== 0 && bombs[index-1]){
        count++;
      }
      //左上
      if(bombs[index-width-1]){
        count++;
      }
      //左下
      if(bombs[index+width-1]){
        count++;
      }
    }

    //右
    if((index+1)%width !== 0){
      //右
      if(bombs[index+1]){
        count++;
      }
      //右上
      if(bombs[index-width+1]){
        count++;
      }
      //右下
      if(bombs[index+width+1]){
        count++;
      }
    }

    return count;
  };

  var checkComplete = function(){
    var arr = _.filter(
      _.filter(tiles, function(n) { return (n.number !== $settingConst.tileNumber.bomb); }),
      { isOpen: false }
    );
    return arr.length === 0;
  };

  var setGameStatus = function(status){
    game.status = status;
    console.log(status);
    return;
  };

  var openTile = function(index){
    var tile = tiles[index];

    if (tile.isOpen) {
      return;
    }

    tile.isOpen = true;
    switch (tile.number) {
      case $settingConst.tileNumber.bomb:
        setGameStatus($settingConst.status.gameOver);
        return;

      case $settingConst.tileNumber.white:
        openAroundTiles(index);
        return;

      default:
        if(checkGameComplete()){
          setGameStatus($settingConst.status.gameComplete);
        }
    }

  };

  var checkGameComplete = function(){
    var t = _.find(tiles, function(tile) {
      return !tile.isOpen && tile.number !== $settingConst.tileNumber.bomb;
    });
    if (!t) {
      return true;
    }
    return false;
  };

  var openAroundTiles = function(index){
    var d = gameSettings.dementions;

    // なんかもっとうまい方法ありそう．
    //上
    if(tiles[index-d.width]){
      openTile(index-d.width);
    }

    //下
    if(tiles[index+d.width]){
      openTile(index+d.width);
    }

    //左
    if(index%d.width !== 0){
      //左
      if(tiles[index-1]){
        openTile(index-1);
      }
      //左上
      if(tiles[index-d.width-1]){
        openTile(index-d.width-1);
      }
      //左下
      if(tiles[index+d.width-1]){
        openTile(index+d.width-1);
      }
    }

    //右
    if((index+1)%d.width !== 0){
      //右
      if(tiles[index+1]){
        openTile(index+1);
      }
      //右上
      if(tiles[index-d.width+1]){
        openTile(index-d.width+1);
      }
      //右下
      if(tiles[index+d.width+1]){
        openTile(index+d.width+1);
      }
    }

  };


  return {
    init: init,
    setGameStatus: setGameStatus,
    openTile: openTile
  };
})
;

