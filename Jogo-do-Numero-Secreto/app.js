
let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto;
let tentativas;

iniciarNovoJogo();


function iniciarNovoJogo() {
        limparLista();
        numeroSecreto = gerarNumeroAleatorio(numeroLimite);
        tentativas = 0;
        exibirTextoNaTela('h1', 'Jogo do Número Secreto');
        exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
        document.getElementById('reiniciar').setAttribute('disabled', true);
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (validaPossibilidades(chute)) {
        
        tentativas++;
        if (chute == numeroSecreto) {
            let mensagem = `Parabéns! você acertou em ${tentativas} ${tentativas > 1 ? 'tentativas' : 'tentativa'}`;
            exibirTextoNaTela('p', mensagem);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        } else if (chute < numeroSecreto) {
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }
        limparCampo();

    } else {
        alert(`O palpite deve ser um número entre 1 e ${numeroLimite}`);
        limparCampo();
    }
}

function validaPossibilidades(chute) {
    return chute.match('[1-9]') && (chute >= 1 && chute <= numeroLimite);
}

function gerarNumeroAleatorio(numeroLimite) {
    let numero = parseInt(Math.random() * numeroLimite + 1);
    if (!listaNumerosSorteados.includes(numero)) {
        listaNumerosSorteados.push(numero);
        return numero;
    } else {
        return gerarNumeroAleatorio();
    }
}

function limparLista() {
    if (listaNumerosSorteados.length == 10) {
        alert("Você já descobriu todos os números, a lista será reiniciada");
        listaNumerosSorteados = [];
    }
}

function limparCampo() {
    campo = document.querySelector('input');
    campo.value = null;
}


function exibirTextoNaTela(tag, texto) {
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
