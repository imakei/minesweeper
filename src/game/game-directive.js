angular
.module('ngMineSweeper')
.directive('tile', function($gameService) {

  return {
    restrict: 'AE',
    replace: true,
    scope: true,
    templateUrl: 'tile.html',
    link: function(scope, element) {

      var tile = scope.tile;
      console.log(scope);
      scope.open = function() {
        if(checkBomb()){
          $gameService.setGameStatus('gameOver');
        } else {
          tile.isOpen = true;
          $gameService.checkClear();
        }
      };

      var checkBomb = function(){
        if(tile.number == 'B'){
          return true;
        }
        return false;
      };

      var toggleFlag = function() {
        scope.$apply(function() {
          event.preventDefault();
          tile.isFlag = !tile.isFlag;
        });
      };
      element.on('contextmenu', toggleFlag);
    }
  };

})
;
