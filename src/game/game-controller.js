angular
.module('ngMineSweeper')
.controller('GameCtrl', function($scope, $gameService, $settingConst, $errorConst) {

    $scope.title = $settingConst.title;
    $scope.game = {
      status: ''
    };
    $scope.gameSettings = {
      dementions : {
        width: 5,
        height: 5
      },
      bombs: 5,
      container: {
        size: {
          width: '530px'
        },
        margin: 5
      },
      tileSize: 100
    };
    $scope.error = '';

    var init = function(){

      //container,tileのサイズ設定
      setSize();

      $scope.tiles = $gameService.init({
        game: $scope.game,
        gameSettings: $scope.gameSettings
      });

    };

    var setSize = function(){

      var settings = $scope.gameSettings;
      var width = settings.dementions.width;
      var margin = settings.container.margin;

      // tileのサイズ設定　横のマスの数によって決定
      if (width < 6) {
        settings.tileSize = 100;
      } else if (width < 12) {
        settings.tileSize = 50;
      } else { // width < 30
        settings.tileSize = 30;
      }

      var containerSize = margin+(settings.tileSize+margin)*width;
      $scope.gameSettings.container.size.width = containerSize+'px';

    };


    $scope.reset = function(){
      var d = $scope.gameSettings.dementions;
      var bombs = $scope.gameSettings.bombs;
      if ( bombs >= d.width*d.height ){
        //あとでconstに．
        $scope.error = $errorConst.tooMuchBombs;
        return;
      }
      $scope.error = '';
      init();
    };


    init();
  }
)
;