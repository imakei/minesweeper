/*=================================================
| 
| のちのちサービスに処理を移す．
|
===================================================*/
angular
.module('ngMineSweeper')
.controller('GameCtrl', function($scope, $gameService, $settingConst) {

    $scope.title = $settingConst.title;
    $scope.tiles = [];
    $scope.game = {
      status: ''
    };
    $scope.gameStatus = new String('');
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
      setSize();
      var bombsArray = generateBombsArray();
      generateTiles(bombsArray);
      $gameService.init({
        tiles: $scope.tiles, //いづれcacheから読み込めるように
        game: $scope.game,
        gameSettings: $scope.gameSettings
      });
      $gameService.setGameStatus('play');
    };

    var setSize = function(){
      var settings = $scope.gameSettings;
      var width = settings.dementions.width;
      var container = settings.container;
      if (width < 6) {
        $scope.gameSettings.tileSize = 100;
      } else if (width < 12) {
        $scope.gameSettings.tileSize = 50;
      } else { // width < 30
        $scope.gameSettings.tileSize = 30;
      }
      var containerSize = container.margin+(settings.tileSize+container.margin)*settings.dementions.width;
      container.size.width = containerSize+'px';
    };


    var generateBombsArray = function(){
      var settings = $scope.gameSettings;
      var arr  = [];
      for(var i=0; i<settings.bombs; i++){
        arr.push(1);
      }
      for(i=0; i < settings.dementions.width*settings.dementions.height-settings.bombs-1; i++){
        arr.push(0);
      }
      arr.push(0);
      return _.shuffle(arr);
    };

    var generateTiles = function(bombs){
      $scope.tiles = [];
      for(var i=0; i<bombs.length; i++){
        var num;
        if(bombs[i]){
          num = -1;
        } else {
          num = countAroundBombs(i, bombs);
        }

        var strNum = numToString(num);

        $scope.tiles.push({
          id: i,
          number: strNum,
          isOpen: false,
          isFlag: false
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

    $scope.reset = function(){
      var d = $scope.gameSettings.dementions;
      var bombs = $scope.gameSettings.bombs;
      if ( bombs >= d.width*d.height ){
        //あとでconstに．
        $scope.error = 'マスの数よりも爆弾の数を少なくしてください．';
        return;
      }
      $scope.error = '';
      init();
    };


    init();
  }
)
;