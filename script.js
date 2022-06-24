// Canvas setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
let gameOver = false;

let is_dragging;
let current_fish_index = null;
let mouse_in_fish = false;
let startX;
let startY;

// Khai bao
let players = [];
let game_end = false;
let game_pause = false;
let mode = 0;
let gold_arr = [];

ctx.font = "50px Georgia";

let canvasPosition = canvas.getBoundingClientRect();

key_down.onclick = function () {
  // if (!game_end && !game_pause) {
  if (mode == 1) {
    if (players[1].hook.status == 0) {
      players[1].hook.status = 1;
      timeUpdate();
    }
  } else {
    if (players[0].hook.status == 0) {
      players[0].hook.status = 1;
      timeUpdate();
    }
  }
  // }
};

window.onkeydown = function (e) {
  // if (!game_end && !game_pause) {
  var keyID = e.keyCode ? e.keyCode : e.which;
  if (keyID === 38) {
    // up arrow
    if (mode == 1) {
      if (players[0].bomb_num && players[1].hook.object != 0) {
        players[1].hook.status = 1;
        players[1].hook.object.owner = 0;
        x_explode = players[1].hook.x;
        y_explode = players[1].hook.y;
        draw_explode();
        players[1].hook.object.x = -100;
        players[1].hook.object.y = -100;
        players[1].hook.object.moveSpeed = 0;
        players[1].hook.object = 0;
        if (players[0].enhanceStrength) players[1].hook.moveSpeed = -20;
        else players[1].hook.moveSpeed = -10;
        players[0].bomb_num--;
        timeUpdate();
        explodeAudio.play();
      }
    } else {
      if (players[0].bomb_num && players[0].hook.object != 0) {
        players[0].hook.status = 1;
        players[0].hook.object.owner = 0;
        x_explode = players[0].hook.x;
        y_explode = players[0].hook.y;
        draw_explode();
        players[0].hook.object.x = -100;
        players[0].hook.object.y = -100;
        players[0].hook.object.moveSpeed = 0;
        players[0].hook.object = 0;
        if (players[0].enhanceStrength) players[0].hook.moveSpeed = -20;
        else players[0].hook.moveSpeed = -10;
        players[0].bomb_num--;
        timeUpdate();
        explodeAudio.play();
      }
    }
    e.preventDefault();
  }
  if (keyID === 87) {
    // W

    if (players[0].bomb_num && players[0].hook.object != 0) {
      players[0].hook.status = 1;
      players[0].hook.object.owner = 0;
      x_explode = players[0].hook.x;
      y_explode = players[0].hook.y;
      draw_explode();
      players[0].hook.object.x = -100;
      players[0].hook.object.y = -100;
      players[0].hook.object.moveSpeed = 0;
      players[0].hook.object = 0;
      if (players[0].enhanceStrength) players[0].hook.moveSpeed = -20;
      else players[0].hook.moveSpeed = -10;
      timeUpdate();
      players[0].bomb_num--;
      explodeAudio.play();
    }

    e.preventDefault();
  }
  if (keyID === 40) {
    // down arrow
    if (mode == 1) {
      if (players[1].hook.status == 0) {
        players[1].hook.status = 1;
        timeUpdate();
        e.preventDefault();
      }
    } else {
      if (players[0].hook.status == 0) {
        players[0].hook.status = 1;
        timeUpdate();
        e.preventDefault();
      }
    }
  }
  if (keyID === 83) {
    // S
    if (players[0].hook.status == 0) {
      players[0].hook.status = 1;
      timeUpdate();
      e.preventDefault();
    }
  }
  // }
};

function timeUpdate() {
  draw_all();
  check_all();
}

function check_all() {
  // if (time_all == 0) check_money();
  for (var i = 0; i < players.length; i++) {
    players[i].hook.check();
  }
  check_hook_catch_object();
}

function check_hook_catch_object() {
  console.log("bat em di");
  // for (var i = 0; i < gold_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (gold_arr[i].x - players[j].hook.x) *
  //           (gold_arr[i].x - players[j].hook.x) +
  //           (gold_arr[i].y - players[j].hook.y) *
  //             (gold_arr[i].y - players[j].hook.y)
  //       ) < gold_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       gold_arr[i].owner == 0
  //     ) {
  //       gold_arr[i].x =
  //         players[j].hook.x +
  //         gold_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       gold_arr[i].y =
  //         players[j].hook.y +
  //         gold_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = gold_arr[i];
  //       gold_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * gold_arr[i].speed;
  //     }
  //   }
  // }

  // for (var i = 0; i < stone_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (stone_arr[i].x - players[j].hook.x) *
  //           (stone_arr[i].x - players[j].hook.x) +
  //           (stone_arr[i].y - players[j].hook.y) *
  //             (stone_arr[i].y - players[j].hook.y)
  //       ) < stone_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       stone_arr[i].owner == 0
  //     ) {
  //       stone_arr[i].x =
  //         players[j].hook.x +
  //         stone_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       stone_arr[i].y =
  //         players[j].hook.y +
  //         stone_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = stone_arr[i];
  //       stone_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * stone_arr[i].speed;
  //     }
  //   }
  // }
  // for (var i = 0; i < mystery_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (mystery_arr[i].x - players[j].hook.x) *
  //           (mystery_arr[i].x - players[j].hook.x) +
  //           (mystery_arr[i].y - players[j].hook.y) *
  //             (mystery_arr[i].y - players[j].hook.y)
  //       ) < mystery_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       mystery_arr[i].owner == 0
  //     ) {
  //       mystery_arr[i].x =
  //         players[j].hook.x +
  //         mystery_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       mystery_arr[i].y =
  //         players[j].hook.y +
  //         mystery_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = mystery_arr[i];
  //       mystery_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * mystery_arr[i].speed;
  //     }
  //   }
  // }
  // for (var i = 0; i < bomb_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (bomb_arr[i].x - players[j].hook.x) *
  //           (bomb_arr[i].x - players[j].hook.x) +
  //           (bomb_arr[i].y - players[j].hook.y) *
  //             (bomb_arr[i].y - players[j].hook.y)
  //       ) < bomb_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       bomb_arr[i].owner == 0
  //     ) {
  //       bomb_arr[i].x =
  //         players[j].hook.x +
  //         bomb_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       bomb_arr[i].y =
  //         players[j].hook.y +
  //         bomb_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = bomb_arr[i];
  //       bomb_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * bomb_arr[i].speed;
  //       bomb_arr[i].explode();
  //     }
  //   }
  // }
  // for (var i = 0; i < flypig_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (flypig_arr[i].x - players[j].hook.x) *
  //           (flypig_arr[i].x - players[j].hook.x) +
  //           (flypig_arr[i].y - players[j].hook.y) *
  //             (flypig_arr[i].y - players[j].hook.y)
  //       ) < flypig_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       flypig_arr[i].owner == 0
  //     ) {
  //       flypig_arr[i].x =
  //         players[j].hook.x +
  //         flypig_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       flypig_arr[i].y =
  //         players[j].hook.y +
  //         flypig_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = flypig_arr[i];
  //       flypig_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * flypig_arr[i].speed;
  //     }
  //   }
  // }
  // for (var i = 0; i < diamond_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (diamond_arr[i].x - players[j].hook.x) *
  //           (diamond_arr[i].x - players[j].hook.x) +
  //           (diamond_arr[i].y - players[j].hook.y) *
  //             (diamond_arr[i].y - players[j].hook.y)
  //       ) < diamond_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       diamond_arr[i].owner == 0
  //     ) {
  //       diamond_arr[i].x =
  //         players[j].hook.x +
  //         diamond_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       diamond_arr[i].y =
  //         players[j].hook.y +
  //         diamond_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = diamond_arr[i];
  //       diamond_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * diamond_arr[i].speed;
  //     }
  //   }
  // }
  // for (var i = 0; i < clock_arr.length; i++) {
  //   for (var j = 0; j < players.length; j++) {
  //     if (
  //       Math.sqrt(
  //         (clock_arr[i].x - players[j].hook.x) *
  //           (clock_arr[i].x - players[j].hook.x) +
  //           (clock_arr[i].y - players[j].hook.y) *
  //             (clock_arr[i].y - players[j].hook.y)
  //       ) < clock_arr[i].r &&
  //       players[j].hook.status == 1 &&
  //       players[j].hook.moveSpeed > 0 &&
  //       clock_arr[i].owner == 0
  //     ) {
  //       clock_arr[i].x =
  //         players[j].hook.x +
  //         clock_arr[i].r * Math.cos((players[j].hook.angle * Math.PI) / 180);
  //       clock_arr[i].y =
  //         players[j].hook.y +
  //         clock_arr[i].r * Math.sin((players[j].hook.angle * Math.PI) / 180);
  //       players[j].hook.status = 2;
  //       players[j].hook.object = clock_arr[i];
  //       clock_arr[i].owner = players[j].hook;
  //       players[j].hook.moveSpeed =
  //         -players[j].hook.moveSpeed * clock_arr[i].speed;
  //     }
  //   }
  // }
}

function draw_all() {
  for (var i = 0; i < gold_arr.length; i++)
    if (gold_arr[i].owner == 0) gold_arr[i].draw();
  // clearCanvas();

  for (var i = 0; i < players.length; i++) {
    players[i].draw();
    console.log("aaa", players[i].draw());

    if (players[i].hook.object) {
      players[i].hook.object.draw();
    }
    players[i].hook.draw();
  }

  // draw_time_limit();

  for (var i = 0; i < players.length; i++)
    if (players[i].hook.money_status != 0) {
      console.log(players[i].hook.money_status);
      if (players[i].hook.money_status == 1) {
        players[i].hook.money_size += 2;
        players[i].hook.money_pos_x -= 9;
        players[i].hook.money_pos_y -= 5;
        ctx.fillStyle = "gray";
        ctx.font =
          "bold " + players[i].hook.money_size.toString() + "px ppFont";
        ctx.fillText(
          "$" + players[i].hook.money_value.toString(),
          players[i].hook.money_pos_x,
          players[i].hook.money_pos_y
        );
      } else if (players[i].hook.money_status == 3) {
        players[i].hook.money_size -= 2;
        players[i].hook.money_pos_x -= 8;
        players[i].hook.money_pos_y -= 5;
        ctx.fillStyle = "gray";
        ctx.font =
          "bold " + players[i].hook.money_size.toString() + "px ppFont";
        ctx.fillText(
          "$" + players[i].hook.money_value.toString(),
          players[i].hook.money_pos_x,
          players[i].hook.money_pos_y
        );
      } else if (players[i].hook.money_status == 2) {
        ctx.fillStyle = "gray";
        ctx.font =
          "bold " + players[i].hook.money_size.toString() + "px ppFont";
        ctx.fillText(
          "$" + players[i].hook.money_value.toString(),
          players[i].hook.money_pos_x,
          players[i].hook.money_pos_y
        );
      }
    }
}

// function gold(x, y, size) {
//   this.x = x;
//   this.y = y;
//   this.size = size;
//   this.dx = 3;
//   switch (size) {
//     case 1:
//       {
//         //this.r = canvas.width / 40;
//         this.r = 20;
//         this.value = 50;
//       }
//       break;
//     case 2:
//       {
//         //this.r = canvas.width / 40;
//         this.r = 25;
//         this.value = 100;
//       }
//       break;
//     case 3:
//       {
//         this.r = 45;
//         this.value = 250;
//       }
//       break;
//   }
//   this.speed = 40 / this.value;
//   this.owner = 0;

//   this.moveSpeed = 0;
//   this.init();
// }

// gold.prototype = {
//   init: function () {
//     // this.draw();
//   },
//   draw: function () {
//     if (this.x - 85 < 0 || this.x + 85 > canvas.width) {
//       this.dx = -this.dx;
//     }
//     if (this.owner != 0) this.moveSpeed = this.owner.moveSpeed;
//     if (this.moveSpeed) {
//       this.x += this.moveSpeed * Math.cos((this.owner.angle * Math.PI) / 180);
//       this.y += this.moveSpeed * Math.sin((this.owner.angle * Math.PI) / 180);
//     } else this.x -= this.dx;
//     var goldImg = new Image();
//     goldImg.src = "../src/gold/gold.png";
//     if (this.size == 1)
//       ctx.drawImage(goldImg, this.x - 30, this.y - 35, 50, 50);
//     else if (this.size == 2)
//       ctx.drawImage(goldImg, this.x - 45, this.y - 50, 90, 90);
//     else if (this.size == 3)
//       ctx.drawImage(goldImg, this.x - 80, this.y - 85, 150, 150);
//   },
// };

// gold_arr.push(new gold(700, 350, 3));
// gold_arr.push(new gold(600, 200, 1));
// gold_arr.push(new gold(450, 350, 2));
// gold_arr.push(new gold(550, 400, 2));
// gold_arr.push(new gold(350, 200, 1));
// gold_arr.push(new gold(150, 300, 2));
// gold_arr.push(new gold(300, 500, 3));

// Xac dinh vi tri chuot

let is_mouse_in_shape = function (x, y, enemy) {
  let shape_left = enemy.x - enemy.radius * 1.75;
  let shape_right = shape_left + enemy.radius * 2.5;
  let shape_top = enemy.y - enemy.radius * 1.75;
  let shape_bottom = enemy.y + enemy.radius * 1.75;

  if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
    console.log("in");
    return true;
  } else {
    console.log("not in");
    return false;
  }
};

let mouse_down = function (event) {
  event.preventDefault();

  startX = parseInt(event.clientX - canvasPosition.left);
  startY = parseInt(event.clientY - canvasPosition.top);

  // console.log("startX, startY", startX, startY);

  let index = 0;

  for (let enemy of enemiesArray) {
    if (is_mouse_in_shape(startX, startY, enemy)) {
      current_fish_index = index;

      is_dragging = true;
      return;
    } else {
    }
    index++;
  }
};

let mouse_up = function (event) {
  if (!is_dragging) {
    return;
  }
  event.preventDefault();
  is_dragging = false;
};

let mouse_out = function (event) {
  if (!is_dragging) {
    return;
  }
  event.preventDefault();
  is_dragging = false;
};

let mouse_move = async (event) => {
  if (!is_dragging) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX - canvasPosition.left);
    let mouseY = parseInt(event.clientY - canvasPosition.top);

    // console.log("mouseX, mouseY", mouseX, mouseY);
    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let current_fish = enemiesArray[current_fish_index];

    current_fish.x += dx;
    current_fish.y += dy;

    startX = mouseX;
    startY = mouseY;
  }
};

canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout = mouse_out;
canvas.onmousemove = mouse_move;

// Chest
// const chestImage = new Image();
// chestImage.src = "../src/chest/RED-OPEN.png";

// class Chest {
//   constructor() {
//     this.x = canvas.width * 0.5;
//     this.y = canvas.height * 0.7;
//     this.distance;
//     this.radius = 30;
//     this.pointX = 400;
//     this.pointY = 74;
//   }
//   draw() {
//     ctx.fillStyle = "red";
//     ctx.beginPath();
//     ctx.moveTo(this.x, this.y);
//     ctx.lineTo(400, 74);
//     ctx.stroke();
//     ctx.arc(
//       canvas.width * 0.52,
//       canvas.height * 0.82,
//       this.radius,
//       0,
//       Math.PI * 2
//     );
//     ctx.fill();
//     ctx.closePath();
//     ctx.drawImage(
//       chestImage,
//       canvas.width * 0.45,
//       this.y,
//       canvas.width * 0.15,
//       canvas.width * 0.15
//     );
//   }
// }

// const chest = new Chest();

// Bubbles

const bubblesArray = [];

const bubbleImage = new Image();
bubbleImage.src = "../src/bubble-pop/bubble_pop_frame_01.png";
class Bubble {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 5 + 1;
    this.distance;
    this.counted = false;
    (this.sound = Math.random() <= 0), 5 ? "sound1" : "sound2";
  }
  update() {
    this.y -= this.speed;
  }
  draw() {
    ctx.fillStyle = "transparent";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.drawImage(
      bubbleImage,
      this.x - 65,
      this.y - 65,
      this.radius * 2.6,
      this.radius * 2.6
    );
  }
}

function handleBubbles() {
  if (gameFrame % 50 == 0) {
    bubblesArray.push(new Bubble());
  }
  for (let i = 0; i < bubblesArray.length; i++) {
    bubblesArray[i].update();
    bubblesArray[i].draw();
  }
}

// Enemies
const enemyImage = new Image();
enemyImage.src = "../src/enemy/__red_cartoon_fish_01_swim.png";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Enemy {
  constructor() {
    this.x = randomInteger(90, canvas.width - 90);
    this.y = randomInteger(90, canvas.height - 90);
    this.radius = 60;
    this.speed = 3;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 418;
    this.spriteHeight = 397;
    this.distance;
    this.dx = 2;
    this.dy = -2;
  }
  draw() {
    ctx.fillStyle = "transparent";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(
      enemyImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 60,
      this.y - 70,
      this.spriteWidth / 3,
      this.spriteWidth / 3
    );
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      this.x += this.dx;
    }

    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.dy = -this.dy;
    }

    if (this.x < 0 - this.radius * 2) {
      this.x = canvas.width + 200;
      this.y = randomInteger(90, 220);
      this.speed = Math.random() * 2 + 2;
    }
    if (gameFrame % 5 == 0) {
      this.frame++;
      if (this.frame >= 12) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frame = 2;
      else this.frameY = 0;
    }
    // const dx = this.x - chest.x;
    // const dy = this.y - chest.y;
    // this.distance = Math.sqrt(dx * dx + dy * dy);
    // if (this.distance < this.radius + chest.radius) {
    // }
  }
}

// Player

function player(num) {
  if (mode == 0) this.x = canvas.width / 2 - 25;
  else {
    this.x = canvas.width / 2 - 75 + 100 * num;
  }
  this.y = 35;
  this.width = 50;
  this.height = 50;
  this.money = 0;
  this.color = "blue";
  this.hook = new hook(this.x + this.width / 2);
  this.hook.owner = this;
  this.enhanceStrength = false;
  this.fourLeaf = false;
  this.addStoneValue = false;
  this.addDiamondValue = false;
  this.bom = false;
  this.bomb_num = 0;
  this.hook.init();
  this.init();
}
player.prototype = {
  init: function () {
    this.draw();
  },
  draw: function () {
    var playerImg = new Image();
    playerImg.src = "../src/player/player.jpeg";
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  },
};

// Hook
function hook(x) {
  this.x = x;
  this.y = 250;
  this.angle = 0;
  this.object = 0;
  this.status = 0;
  this.length = 0;
  this.moveSpeed = 10;
  this.rotateSpeed = 5;
  this.r = 10;
  this.maxLength = 500;
  this.color = "black";
  this.owner = 0;
  this.money_status = 0;
  this.money_size = 20;
  this.money_pos_x = 0;
  this.money_pos_y = 0;
  this.money_value = 0;
  //this.init();
}
hook.prototype = {
  init: function () {
    this.draw();
  },
  draw: function () {
    if (this.status == 0) {
      ctx.beginPath();

      //ctx.stroke();
      if (this.angle <= 10 || this.angle >= 170)
        this.rotateSpeed = -this.rotateSpeed;
      this.angle += this.rotateSpeed;
      //console.log(this.angle);
      ctx.save();
      ctx.translate(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      ctx.rotate((this.rotateSpeed * Math.PI) / 180);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      this.x = 30 * Math.cos((this.angle * Math.PI) / 180);
      this.y = 30 * Math.sin((this.angle * Math.PI) / 180);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((90 + this.angle) * Math.PI) / 180,
        ((270 + this.angle) * Math.PI) / 180
      );
      ctx.stroke();
      ctx.restore();
      this.x += this.owner.x + this.owner.width / 2;
      this.y += this.owner.y + this.owner.height;
    } else if (this.status == 1) {
      this.x += this.moveSpeed * Math.cos((this.angle * Math.PI) / 180);
      this.y += this.moveSpeed * Math.sin((this.angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.moveTo(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((this.angle + 90) * Math.PI) / 180,
        ((this.angle - 90) * Math.PI) / 180
      );
      ctx.stroke();
    } else if (this.status == 2) {
      this.x += this.moveSpeed * Math.cos((this.angle * Math.PI) / 180);
      this.y += this.moveSpeed * Math.sin((this.angle * Math.PI) / 180);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.moveTo(
        this.owner.x + this.owner.width / 2,
        this.owner.y + this.owner.height
      );
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "gray";
      ctx.beginPath();
      ctx.arc(
        this.x + this.r * Math.cos((this.angle * Math.PI) / 180),
        this.y + this.r * Math.sin((this.angle * Math.PI) / 180),
        this.r,
        ((this.angle + 90) * Math.PI) / 180,
        ((this.angle - 90) * Math.PI) / 180
      );
      ctx.stroke();
    }
  },
  check: function () {
    this.length = Math.sqrt(
      (this.x - this.owner.x) * (this.x - this.owner.x) +
        (this.y - this.owner.y) * (this.y - this.owner.y)
    );
    if (this.length >= this.maxLength && this.status == 1) {
      this.moveSpeed = -this.moveSpeed;
    }
    if (
      this.y - this.owner.y - this.owner.height < 30 &&
      this.status != 0 &&
      this.moveSpeed < 0
    ) {
      if (this.status == 2) {
        if (this.object.value == -1) {
          time_all += this.object.timeAdd;
          this.object.x = -100;
          this.object.y = -100;
          this.object.owner = 0;
          this.object.moveSpeed = 0;
          this.object = 0;
          this.status = 0;
          if (players[0].enhanceStrength) this.moveSpeed = 20;
          else this.moveSpeed = 10;
        } else {
          this.money_value = this.object.value;
          if (mode == 0) catching_object = this;
          else {
            if (this == players[0].hook) catching_object = this;
            else catching_object1 = this;
          }
          this.draw_add_money();
          this.moveSpeed = 0;
        }
      } else {
        this.status = 0;
        if (players[0].enhanceStrength) this.moveSpeed = 20;
        else this.moveSpeed = 10;
      }
    }
  },
  draw_add_money: function () {
    this.money_status = 1;
    this.money_size = 20;

    if (mode == 0) {
      this.money_pos_x = 630;
      this.money_pos_y = 105;
      setTimeout("catching_object.money_move_in()", 1000);
    } else {
      if (this == players[0].hook) {
        this.money_pos_x = 440;
        this.money_pos_y = 105;
        setTimeout("catching_object.money_move_in()", 1000);
      } else {
        this.money_pos_x = 670;
        this.money_pos_y = 105;
        setTimeout("catching_object1.money_move_in()", 1000);
      }
    }
  },
  money_move_in: function () {
    this.money_status = 2;
    if (mode == 0) setTimeout("catching_object.money_stop()", 1000);
    else {
      if (this == players[0].hook)
        setTimeout("catching_object.money_stop()", 1000);
      else setTimeout("catching_object1.money_stop()", 1000);
    }
  },
  money_stop: function () {
    this.money_status = 3;

    if (mode == 0) {
      catching_object.object.moveSpeed = 0;
      catching_object.object.x = -100;
      catching_object.object.y = -100;
      catching_object.status = 0;
      catching_object.object.owner.object = 0;
      if (players[0].enhanceStrength) catching_object.moveSpeed = 20;
      else catching_object.moveSpeed = 10;
      catching_object.object.owner = 0;
      setTimeout("catching_object.money_move_out()", 1000);
    } else {
      if (this == players[0].hook) {
        catching_object.object.moveSpeed = 0;
        catching_object.object.x = -100;
        catching_object.object.y = -100;
        catching_object.status = 0;
        catching_object.object.owner = 0;
        catching_object.object = 0;
        if (players[0].enhanceStrength) catching_object.moveSpeed = 20;
        else catching_object.moveSpeed = 10;

        setTimeout("catching_object.money_move_out()", 1000);
      } else {
        catching_object1.object.moveSpeed = 0;
        catching_object1.object.x = -100;
        catching_object1.object.y = -100;
        catching_object1.status = 0;
        catching_object1.object.owner = 0;
        catching_object1.object = 0;
        if (players[0].enhanceStrength) catching_object1.moveSpeed = 20;
        else catching_object1.moveSpeed = 10;

        setTimeout("catching_object1.money_move_out()", 1000);
      }
    }
  },
  money_move_out: function () {
    this.money_status = 0;
    total_money += this.money_value;
  },
};

function initGame() {
  // if (mode == 0)
  if (mode == 0) players.push(new player(0));
  else {
    for (var i = 0; i < 2; i++) players.push(new player(i));
  }
  // else {
  //   for (var i = 0; i < 2; i++) players.push(new player(i));
  // }

  // timer_update = setInterval(timeUpdate, 100);
}

initGame();

function handleCatchFish() {
  if (gameFrame % 60 == 0 && gameFrame < 250) {
    enemiesArray.push(new Enemy());
  }
  for (let i = 0; i < enemiesArray.length; i++) {
    enemiesArray[i].update();
    enemiesArray[i].draw();
  }
}

let enemiesArray = [];

function OpenBootstrapPopup() {
  $("#myModal").modal("show");
}

// Animation Loop
function init() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // key_down.style.display = "none";
  // players.splice(0, players.length);
  handleBubbles();
  // chest.draw();
  handleCatchFish();
  // player.init()
  // player();
  // hook.draw();
  gameFrame++;
  // if (!gameOver)
  requestAnimationFrame(init);
}

init();
