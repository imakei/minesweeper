/* global _ */
angular
.module('ngMineSweeper')
.factory('$gameService', function() {

  var tiles;
  var gameStatus;
  var gameSettings;

  var setup =  function(opts){
    tiles = opts.tiles;
    gameStatus = opts.gameStatus;
    gameSettings = opts.gameSettings;
    console.log(opts);
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
    gameStatus = status;
    console.log(gameStatus);
    return;
  };

  return {
    setup: setup,
    checkComplete: checkComplete,
    setGameStatus: setGameStatus,
    getGameStatus: function(){
      return gameStatus;
    }
  };

})
;

