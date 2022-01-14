const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const image = new Image();
image.src = './personagens/react.png';

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1.5;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.width = 30;
    this.height = 30;
  }

  draw() {
    context.fillStyle = 'white';
    context.fillRect(
      this.position.x, this.position.y, this.width, this.height
      );
    context.drawImage(image, this.position.x, this.position.y - 16, 50, 50);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // esse if, ta criando a gravidade do game
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Plataform {
  constructor() {
    this.position = {
      x: 200,
      y: 100,
    }

    this.width = 200;
    this.height = 20;
  }

  draw() {
    context.fillStyle = 'green';
    context.fillRect(
      this.position.x, this.position.y, this.width, this.height
      );
  }
}

const player = new Player();
const plataform = new Plataform();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width = innerWidth, canvas.height = innerHeight);
  player.update();
  plataform.draw();

  // moviment detection
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      plataform.position.x -= 5;
    } else if (keys.left.pressed) {
      plataform.position.x += 5;
    }
  }

  // plataform collision dectection
  if (player.position.y + player.height <= plataform.position.y
    && player.position.y + player.height + player.velocity.y
    >= plataform.position.y && player.position.x + player.width
    >= plataform.position.x && player.position.x
    <= plataform.position.x + plataform.width) {
    player.velocity.y = 0;
  }
}

animate();

window.addEventListener('keydown', ({ keyCode }) => {
  switch(keyCode) {
    case 65:
      // left
      keys.left.pressed = true;
      break;
    case 68:
      // right
      keys.right.pressed = true;
      break;
    case 83:
      // down
      break;
    case 87:
      // up
      player.velocity.y -= 30;
      break;
  }
});

window.addEventListener('keyup', ({ keyCode }) => {
  switch(keyCode) {
    case 65:
      // left
      keys.left.pressed = false;
      break;
    case 68:
      // right
      keys.right.pressed = false;
      break;
    case 83:
      // down
      break;
  }
});
