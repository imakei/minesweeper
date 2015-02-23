/* global _ */
angular
.module('ngMineSweeper')
.factory('$gameService', function() {

  var tiles;
  var game;
  var gameSettings;

  var init =  function(opts){
    tiles = opts.tiles;
    game = opts.game;
    gameSettings = opts.gameSettings;
    return;
  };

  var checkComplete = function(){
    var arr = _.filter(
      _.filter(tiles, function(n) { return (n.number !== 'B'); }),
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
      case 'B':
        setGameStatus('gameOver');
        return;

      case '':
        openAroundTiles(index);
        return;

      default:
        if(checkGameComplete()){
          setGameStatus('gameComplete');
        }
    }

  };

  var checkGameComplete = function(){
    var t = _.find(tiles, function(tile) {
      return !tile.isOpen && tile.number !== 'B';
    });
    if (!t) {
      return true;
    }
    return false;
  };

  var openAroundTiles = function(index){
    var d = gameSettings.dementions;

    //　なんかもっとうまい方法ありそう．
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

