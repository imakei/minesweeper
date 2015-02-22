/* global _ */
angular
.module('ngMineSweeper')
.factory('$gameService', function() {

  var tiles;
  var gameStatus;
  var gameSettings;
  var status = 100;

  var setup =  function(opts){
    tiles = opts.tiles;
    gameStatus = opts.gameStatus;
    gameSettings = opts.gameSettings;
    console.log(opts);
    return;
  };

  var checkClear = function(){
    var arr = _.filter(
      _.filter(tiles, function(n) { return (n.number !== 'B'); }),
      { isOpen: false }
    );
    status++;
    return arr.length === 0;
  };

  var setGameStatus = function(status){
    gameStatus = status;
    console.log(gameStatus);
    return;
  };

  return {
    setup: setup,
    checkClear: checkClear,
    setGameStatus: setGameStatus,
    getGameStatus: function(){
      return status;
    }
  };

})
;

