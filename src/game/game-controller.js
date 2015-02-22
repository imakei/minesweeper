angular
.module('ngMineSweeper')
.controller('GameCtrl', function($scope, $gameService, $settingConst) {

    $scope.title = $settingConst.title;
    $scope.tiles = [];
    $scope.gameStatus = '';
    $scope.gameSettings = {
      dementions : {
        width: 5,
        height: 5
      },
      bombs: 5
    };

    var setup = function(){
      $gameService.setup({
        tiles: $scope.tiles, //いづれcacheから読み込めるように
        gameStatus: $scope.gameStatus,
        gameSettings: $scope.gameSettings
      });
    };

    var init = function(){
      $scope.gameStatus = 'play';
      var bombsArray = generateBombsArray();
      generateTiles(bombsArray);
    };

    var generateBombsArray = function(){
      var settings = $scope.gameSettings;
      var arr  = [];
      for(var i=0; i<settings.bombs; i++){
        arr.push(1);
      }
      for(i=0; i < settings.dementions.width*settings.dementions.height-settings.bombs; i++){
        arr.push(0);
      }
      arr.push(0);
      return _.shuffle(arr);
    };

    var generateTiles = function(bombs){
      for(var i=0; i<25; i++){

        var num;
        if(bombs[i]){
          num = -1;
        } else {
          num = countAroundBombs(i, bombs);
        }

        var strNum = numToString(num);

        $scope.tiles.push({
          number: strNum,
          isOpen: false
        });
      }

    };

    var countAroundBombs = function(index, bombs){
      var count = 0;
      var width = $scope.gameSettings.dementions.width;
      var height = $scope.gameSettings.dementions.height;

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

      return count | '';
    };

    var numToString = function(num){
      switch(num){
        case -1:
          console.log('Bomb!!');
          return 'B';
        case 0:
          return '';
        default:
          return num.toString();
      }
    };

    $scope.checkGameComplete = function(){
      var t = _.find($scope.tiles, function(tile) {
        return !tile.isOpen && tile.number !== 'B';
      });
      console.log(t);
      if (!t) {
        return true;
      }
      return false;
    };

    setup();
    init();
  }
)
;