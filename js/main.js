/*let botons = document.getElementsByClassName("tecla")
console.log(botons)
let telefone = document.querySelector("input[type=tel]")
console.log(telefone)
*/
function tocaSons(instrumento){
    const texto = instrumento;
    const idAudio = `#som_${texto}`;
    const alvo = document.querySelector(idAudio);
    if(alvo.localName === "audio"){
         alvo.play();
    }else{
        alert("Tecla inexistente!!!");
    }
    //alert("Vamos que vamos!!!!")
};

const botoes = document.querySelectorAll(".tecla");
botoes.forEach(botao => {
    const classeInstrumento = botao.classList[1];
    botao.addEventListener("click", () => tocaSons(classeInstrumento));
    botao.onkeydown = function (evento) {
        if(evento.code === "Enter" || evento.code === "Space" || evento.code === "NumpadEnter") botao.classList.add("ativa");
    };
    botao.onkeyup = function () {botao.classList.remove("ativa")};
});
