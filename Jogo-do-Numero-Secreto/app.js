
const listaNumerosSorteados = [];
const numeroLimite = 100;
const element = (e) => document.getElementById(e);
let numeroSecreto;
let tentativas;

iniciarNovoJogo();

function iniciarNovoJogo() {
    if (listaNumerosSorteados.length == numeroLimite) limparLista(); 
    tentativas = 0;
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    listaNumerosSorteados.push(numeroSecreto);
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
    element('reiniciar').setAttribute('disabled', true);
}

function verificarChute() {
    const chute = obterChute();
    if (chute == numeroSecreto) encerrarJogo();
    if (chute > numeroSecreto) exibirTextoNaTela('p', `O número é menor que ${chute}`);
    if (chute < numeroSecreto) exibirTextoNaTela('p', `O número é maior que ${chute}`);
    limparCampo()
}

function encerrarJogo() {
    exibirTextoNaTela('p', `Parabéns! você acertou em ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}`);
    element('reiniciar').removeAttribute('disabled');
}

function obterChute() {
    let chute = element('input_chute').value;
    if (chute.match('[1-9]') && (chute >= 1 && chute <= numeroLimite)) {
        tentativas++;
        return chute;
    } else {
        return alert(`O palpite deve ser um número entre 1 e ${numeroLimite}`);
    }
}

function gerarNumeroAleatorio() {
    let numero = parseInt(Math.random() * numeroLimite + 1);
    return listaNumerosSorteados.includes(numero) ? gerarNumeroAleatorio : numero;
}

function limparLista() {
    alert("Você já descobriu todos os números, a lista será reiniciada");
    listaNumerosSorteados = [];
}

function limparCampo() {
    element('input_chute').value = null;
}

function exibirTextoNaTela(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
