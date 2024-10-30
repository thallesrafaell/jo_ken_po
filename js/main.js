const btn_jogar = document.querySelector(".btn-jogar");
const opcoes = document.querySelectorAll(".opcao");
const section_inicio = document.querySelector(".inicio");
const section_partida = document.querySelector(".partida");
const resultado = document.getElementById("result");
const btn_reiniciar = document.querySelector(".btn-reiniciar");
const img_jogador = document.getElementById("img-jogador");
const img_pc = document.getElementById("img-pc");

const escolhas = ["pedra", "papel", "tesoura"];

let escolhaPC;
let escolhaJogador;

// Adiciona um evento ao botão de jogar
btn_jogar.addEventListener("click", function () {
  escolhaPC = selecaoPC(); // Gera a escolha aleatória do PC
  partida(escolhaJogador, escolhaPC); // Avalia o resultado da partida
  section_inicio.classList.remove("active"); // Oculta a seção de início
  section_partida.classList.add("active"); // Exibe a seção da partida
  finalizarPartida(); // Inicia o processo de finalização da partida
});

// Adiciona um evento ao botão de reiniciar
btn_reiniciar.addEventListener("click", function () {
  section_partida.classList.remove("active"); // Oculta a seção da partida
  section_inicio.classList.add("active"); // Exibe a seção de início
  escolhaJogador = null; // Reseta a escolha do jogador
  escolhaPC = null; // Reseta a escolha do PC
  resultado.innerHTML = ""; // Limpa o resultado da partida
  resultado.className = ""; // Remove a classe do resultado
  img_jogador.style.animation = "rotateComponent 0.6s ease-in-out infinite"; // Reinicia a animação do jogador
  img_pc.style.animation = "rotateComponent 0.6s ease-in-out infinite"; // Reinicia a animação do PC
  img_jogador.src = "img/pedra.png"; // Atualiza a imagem do jogador
  img_pc.src = "img/pedra.png"; // Atualiza a imagem do PC
  opcoes.forEach((opcao) => opcao.classList.remove("active")); // Remove a classe ativa de todas as opções
  btn_jogar.disabled = true; // Desabilita o botão de jogar
});

// Adiciona eventos às opções de escolha do jogador
opcoes.forEach((opcao) => {
  opcao.addEventListener("click", function () {
    opcoes.forEach((opcao) => opcao.classList.remove("active")); // Remove a classe ativa de todas as opções

    // Define a escolha do jogador com base no ID da opção clicada
    if (opcao.id == "pedra") escolhaJogador = escolhas[0];
    if (opcao.id == "papel") escolhaJogador = escolhas[1];
    if (opcao.id == "tesoura") escolhaJogador = escolhas[2];

    // Adiciona a classe ativa à opção clicada
    opcao.classList.toggle("active");
    btn_jogar.disabled = false; // Habilita o botão de jogar
  });
});

// Função que gera uma escolha aleatória para o PC
const selecaoPC = () => {
  let escolha = Math.floor(Math.random() * 3);
   return escolhaPC = escolhas[escolha]; // Retorna a escolha aleatória (1, 2 ou 3)
};

// Função que determina o resultado da partida
const partida = (escolhaJogador, escolhaPC) => {
    if (escolhaJogador === escolhaPC) {
      return "empate"; // Retorna "empate" se ambos escolherem a mesma opção
    }
    
    if (
      (escolhaJogador === "pedra" && escolhaPC === "tesoura") ||
      (escolhaJogador === "papel" && escolhaPC === "pedra") ||
      (escolhaJogador === "tesoura" && escolhaPC === "papel")
    ) {
      return "Jogador venceu"; // Retorna "Jogador venceu" em caso de vitória do jogador
    }
  
    return "PC venceu"; // Retorna "PC venceu" em caso de vitória do PC
  };
  

// Função que exibe as escolhas do jogador e do PC após um atraso
const finalizarPartida = () => {
  setTimeout(() => {
    // Atualiza a imagem do jogador com base na escolha
    if (escolhaJogador === "pedra") img_jogador.src = "img/pedra.png";
    if (escolhaJogador === "papel") img_jogador.src = "img/papel.png";
    if (escolhaJogador === "tesoura") img_jogador.src = "img/tesoura.png";

    // Atualiza a imagem do PC com base na escolha
    if (escolhaPC === "pedra") img_pc.src = "img/pedra.png";
    if (escolhaPC === "papel") img_pc.src = "img/papel.png";
    if (escolhaPC === "tesoura") img_pc.src = "img/tesoura.png";

    // Para as animações das imagens após a partida
    img_jogador.style.animation = "none";
    img_pc.style.animation = "none";

    // Chama a função que exibe o resultado da partida
    vencedor(partida(escolhaJogador, escolhaPC));

    // Exibe o botão de reiniciar após a partida
    btn_reiniciar.style.display = "block";
  }, 3000); // Espera 3 segundos antes de exibir os resultados
};

// Função que exibe o resultado da partida
const vencedor = (vencedor) => {
  resultado.innerHTML = vencedor; // Atualiza o conteúdo com o resultado
  // Define a classe do resultado com base no vencedor
  if (vencedor === "Jogador venceu") resultado.className = "jogador-venceu";
  if (vencedor === "PC venceu") resultado.className = "pc-venceu";
  if (vencedor === "empate") resultado.className = "empate";
};
