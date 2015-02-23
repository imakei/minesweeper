angular
.module('ngMineSweeper', [])
.config(function() {})
.run(function(){})
.constant('$settingConst', {
  title: 'imakei\'s MineSweeper',
  status: {
    play: 'play',
    gameOver: 'gameOver',
    gameComplete: 'gameComplete'
  },
  tileNumber: {
    bomb: -1,
    white: 0
  }
})
.constant('$errorConst', {
  tooMuchBombs: 'マスの数よりも爆弾の数を少なくしてください．'
})
.filter('numToString', function($settingConst) {
  return function(input) {

    if(input == $settingConst.tileNumber.bomb){
      return 'B';
    }

    if(input == $settingConst.tileNumber.white){
      return '';
    }

    return input;
  };
})
;

