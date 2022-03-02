/*let botons = document.getElementsByClassName("tecla")
console.log(botons)
let telefone = document.querySelector("input[type=tel]")
console.log(telefone)
*/
function tocaSons(instrumento){
    const texto = instrumento;
    const idAudio = `#som_${texto}`;
    let alvo = document.querySelector(idAudio);
    alvo.play();
    //alert("Vamos que vamos!!!!")
};

const botoes = document.querySelectorAll(".tecla");
botoes.forEach(botao => {
    const classeInstrumento = botao.classList[1];
    botao.addEventListener("click", () => tocaSons(classeInstrumento));
});
