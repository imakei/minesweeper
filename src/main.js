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
  }
})
.constant('$errorConst', {
  tooMuchBombs: 'マスの数よりも爆弾の数を少なくしてください．'
})
;

