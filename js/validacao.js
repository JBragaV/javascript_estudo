
export function valida(input){
    const tipoInput = input.dataset.tipo;

    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalido");
        input.parentElement.querySelector(".input-mensagem-erro").innerHTML = validaInput(tipoInput, input);
    };
};

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => verificaCpf(input)
};

const mensagensErro = {
    nome: {
        valueMissing: "O campo nome não pode estar vazio"
    },
    email: {
        valueMissing: "O campo e-mail não pode estar vazio",
        typeMismatch: "O e-mail digitado não é válido"
    },
    senha: {
        valueMissing: "O campo senha não pode estar vazio",
        patternMismatch: "Insira uma senha com letras e números somente e com no mínimo 6 e no máximo 12 caracter"
    },
    dataNascimento: {
        valueMissing: "O campo data não pode estar vazio",
        customError: 'Você deve ser maior que 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: "O campo CPF nãp pode estar vazio",
        customError: "O CPF informado não é válido"
    }
};

const tipoErro = ["typeMismatch", "patternMismatch", "customError", "valueMissing"];

function validaInput(tipoInput, input){
    let mensagem = "";
    tipoErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensErro[tipoInput][erro];
        }
    });
    return mensagem;
};

function validaDataNascimento(input){
    const data = input.value.split('-')
    const dia = data[2]
    const mes = data[1]
    const ano = data[0]
    const dataRecebida = new Date(ano, mes, dia);
    let mensagem = "";
    if(!maiorQueDezoito(dataRecebida)){
        mensagem = "Você deve ser maior que 18 anos para se cadastrar!!!";
    };

    input.setCustomValidity(mensagem); // Indica para o HTML que existe um erro no campo alvo, e indica no HTML, a pois tentar enviar, não será indicado quando o campor perder o blur
}

function maiorQueDezoito(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());
    return dataMais18 <= dataAtual;
};

function verificaCpf(input){
    const cpfFormatado = input.value.replace(/\D/g, "");
    console.log(cpfFormatado);
    let mensagem = "";
    if(!checaCpfRepetido(cpfFormatado)){
        mensagem = "O CPF informado é inválido!!!";
    }else{
        validaCPF(cpfFormatado);
    }
    input.setCustomValidity(mensagem)
};

function checaCpfRepetido(cpfFormatado){
    let cpfValido = true;
    const numerosCpfInput = cpfFormatado.split("");
    const numerosIguaisCpf = new Set(numerosCpfInput);
    if(numerosIguaisCpf.size == 1) cpfValido = false;
    console.log(cpfValido);
    return cpfValido;
};

function validaCPF(cpf){
    let multiplicador = 10;
    const listaNumerosCpf = cpf.split("");
    digitoVerificadorCpf(listaNumerosCpf, multiplicador)
};

function digitoVerificadorCpf(cpf, multiplicador){
    let soma = 0;
    for(let i = 0; i < 9; i++){
        soma += cpf[i] * (multiplicador-1)
        console.log(multiplicador-i);
    }
}
