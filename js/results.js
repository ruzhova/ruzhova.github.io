let player = localStorage.getItem('username');
let a = localStorage.getItem('score1');
let b = localStorage.getItem('score2');
let c = localStorage.getItem('score3');
let total_score = Number(a) + Number(b) + Number(c);

var player_name = document.getElementById('name');
var level1 = document.getElementById('level1');
var level2 = document.getElementById('level2');
var level3 = document.getElementById('level3');
var total = document.getElementById('total');

player_name.innerHTML=player;
level1.innerHTML=a;
level2.innerHTML=b;
level3.innerHTML=c;
total.innerHTML=total_score;