let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext("2d");
let largura = parseFloat(canvas.getAttribute("width"));
let altura = parseFloat(canvas.getAttribute("height"));
let clientX = 0;
let clientY = 0;
let quadrados = [];
let limitedetempo = 2;
let pontuacao = 0;
let erros = 0;
let estaclicando = false;
let img_alvo = new Image();
img_alvo.src = "alvo.png";
let deveanimar = true;


/*colocar as medidas */
class quadrado {
  constructor(altura, largura) {
    this.tempodevida = 0;
    this.x = Math.floor((canvas.width - largura) * Math.random());
    this.y = Math.floor((canvas.height - altura) * Math.random());
    this.altura = altura;
    this.largura = largura;
    this.id = Math.random();
  }

  checagem() {
    if (this.tempodevida > limitedetempo) {
      this.remover();
      erros++;
    }
    this.tempodevida++;
  }
  /*remove o quadrado do game*/

  remover() {
    let id = this.id;
    let index = quadrados.findIndex(function (quad) {
      if (quad.id === id) {
        return true;
      } else {
        return false;
      }
    });

    quadrados.splice(index, 1);
  }
  /*calcula as medidas do mouse para acertar o quadrado ,caso acerte ele é removido e adiciona um ponto na pontuacao*/
  limite() {
    if (
      this.y + this.altura > clientY &&
      this.y < clientY &&
      this.x + this.largura > clientX &&
      this.x < clientX
    ) {
      this.remover();

      pontuacao++;
      return true;
    } else {
      return false;
    }
  }
  /*aqui desenha o quadrado junto com a imagem*/
  desenharquad() {
    ctx.beginPath();
    ctx.drawImage(img_alvo, this.x, this.y, this.largura, this.altura);
  }
}
/*aqui fica o estilo da fontuacao*/
function score() {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(pontuacao, 440, 460);
}

/*aqui é o evento onde o mouse é clicado e ve as medidas do quadrado e do mouse*/
canvas.addEventListener("mousedown", function (event) {
  deveanimar = true;
  if (!estaclicando) {
    let sumir = false;
    clientX = event.offsetX;
    clientY = event.offsetY;
    for (let quad of quadrados) {
      let resposta = quad.limite();
      if (!resposta) {
        sumir = true;
      }
    }
    if (sumir) {
      erros++;
    }
  }

  estaclicando = true;
});

canvas.addEventListener("mouseup", function () {
  estaclicando = false;
});

function animacao() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!deveanimar) {
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("VOCE PERDEU", 120, 250);
  } else {
    score();
    for (let quad of quadrados) {
      quad.desenharquad();
    }
    if (erros >= 3) {
      deveanimar = false;
      pontuacao = 0;
      erros = 0;
      quadrados = [];
    }
  }
  window.requestAnimationFrame(animacao);
}

function checarquadrados() {
  for (let quad of quadrados) {
    quad.checagem();
  }
}
/*aqui cria o quadrado*/
function criarquadrado() {
  let quadrado1 = new quadrado(50, 50);
  quadrados.push(quadrado1);
}

animacao();

setInterval(checarquadrados, 500);
setInterval(criarquadrado, 1000);
function voltaranimar() {
  deveanimar = true;
}
