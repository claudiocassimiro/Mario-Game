const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const plataformImage = './personagens/platform.png';
const backgroundImage = './personagens/background.png';
const hillImage = './personagens/hills.png';

canvas.width = 1024;
canvas.height = 576;

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
    context.fillStyle = 'red';
    context.fillRect(
      this.position.x, this.position.y, this.width, this.height
      );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // esse if, ta criando a gravidade do game
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    }
  }
}

class Plataform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    }

    this.image = image;
    this.width = image.width;
    this.height = image.height;

  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    }

    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let plataform = createImage(plataformImage);

let player = new Player();
let plataforms = [
  new Plataform({
    x: -1,
    y: 470,
    image: plataform,
  }),
  new Plataform({
    x: plataform.width -3,
    y:470,
    image: plataform,
  }),
  new Plataform({
    x: plataform.width * 2 + 200,
    y: 470,
    image: plataform,
  }),
];

let genericObjects = [
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(backgroundImage),
  }),
  new GenericObject({
    x: -1,
    y: -1,
    image: createImage(hillImage),
  }),
]

let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  }
}

let scrollOffSet = 0;

function init() {
  plataform = createImage(plataformImage);

  player = new Player();
  plataforms = [
    new Plataform({
      x: -1,
      y: 470,
      image: plataform,
    }),
    new Plataform({
      x: plataform.width -3,
      y:470,
      image: plataform,
    }),
    new Plataform({
      x: plataform.width * 2 + 200,
      y: 470,
      image: plataform,
    }),
  ];

  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(backgroundImage),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hillImage),
    }),
  ]

  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    }
  }

  scrollOffSet = 0;
}

function animate() {
  requestAnimationFrame(animate);
  context.fillStyle = '#638';
  context.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  plataforms.forEach((plataform) => {
    plataform.draw();
  })
  player.update();

  // moviment detection
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffSet += 5;
      plataforms.forEach((plataform) => {
        plataform.position.x -= 5;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= 3;
      });
    } else if (keys.left.pressed) {
      scrollOffSet -= 5;
      plataforms.forEach((plataform) => {
        plataform.position.x += 5;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += 3;
      });
    }
  }

  // plataform collision dectection
  plataforms.forEach((plataform) => {
    if (player.position.y + player.height <= plataform.position.y
      && player.position.y + player.height + player.velocity.y
      >= plataform.position.y && player.position.x + player.width
      >= plataform.position.x && player.position.x
      <= plataform.position.x + plataform.width) {
      player.velocity.y = 0;
    }
  });

  // win condition
  if (scrollOffSet > 2000) {

  }

  // lose condition
  if (player.position.y > canvas.height) {
    alert('You lose y-y');
    init();
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
