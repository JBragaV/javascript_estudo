
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
    cpf: input => verificaCpf(input),
    cep: input => verificaCep(input)
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
        customError: "O CPF informado não é válido",
    },
    cep: {
        valueMissing: "O campo CEP não pode estar vazio",
        patternMismatch: "O CEP informado não é válido",
        customError: "Não foi possível buscar o cep informado"
    },
    preco:{
        valueMissing: "O campo não pode estar vazio"
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
    console.log(input.validity)
    const cpfFormatado = input.value.replace(/\D/g, "");
    let mensagem = "";
    const multiplicador = 10;
    if(!checaCpfRepetido(cpfFormatado) || !cpfValido(cpfFormatado, multiplicador)){
        mensagem = "O CPF informado é inválido!!!";
    }
    input.setCustomValidity(mensagem)
};

function checaCpfRepetido(cpfFormatado){
    let valido = true;
    const numerosCpfInput = cpfFormatado.split("");
    const numerosIguaisCpf = new Set(numerosCpfInput);
    if(numerosIguaisCpf.size == 1) valido = false;
    return valido;
};

function cpfValido(cpf, multiplicador){
    if(multiplicador == 12) return true;
    console.log(multiplicador)
    let multiplicadorInicial = multiplicador;
    let soma = 0;
    let listaNumerosCPF = cpf.substring(0, multiplicador-1).split("");
    let digitoCpfUsuario = cpf[multiplicador-1];
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma += listaNumerosCPF[contador] * multiplicadorInicial;
        contador++;
    };
    if(calculaDigito(soma) == digitoCpfUsuario){
        return cpfValido(cpf, multiplicador+1);
    }
    return false;
};

function calculaDigito(soma){
    let digito = 0;
    let resto = soma % 11;
    if(resto > 1){
        digito = 11 - resto;
    }
    return digito;
};

function verificaCep(input){
    prencheCamposCep()
    let cep = input.value.replace(/\D/g, "");
    const urlCep = `https://cep.awesomeapi.com.br/json/${cep}`;
    const options = {
        method: 'get',
        mode: 'cors',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        }
    }
    if(!input.validity.patternMismatch && !input.validity.valueMissing){
        fetch(urlCep, options).then(
            response => {
                return response.json();
            }
        ).then(data => {
            if(data.status){
                input.setCustomValidity("Não foi possível buscar o cep informado");
                return;
            }
            input.setCustomValidity("");
            prencheCamposCep(data)
        })
    }
}

function prencheCamposCep(data=""){
    const logradouro = document.querySelector("#logradouro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");
    logradouro.value = ""
    cidade.value = ""
    estado.value = ""
    if(data){
        logradouro.value = data.address
        cidade.value = data.city
        estado.value = data.state
    }
}