angular
.module('ngMineSweeper')
.directive('tile', function($rootScope, $gameService) {

  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'tile.html',
    link: function(scope, element) {

      var tile = scope.tile;
      scope.open = function() {
        if (tile.isFlag) {
          return;
        }
        switch (tile.number) {
          case 'B':
            scope.$parent.gameStatus = 'gameOver';
            return;

          // case '':
          //   $gameService.setGameStatus('');
          //   return;

          default:
            tile.isOpen = true;
            if(scope.checkGameComplete()){
              scope.$parent.gameStatus = 'gameComplete';
            }
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
