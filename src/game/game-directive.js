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
        $gameService.openTile(tile.id);
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
