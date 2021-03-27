var tempoInicial = 5;
var campo = $(".campo-digitacao");
inicializaMarcadores();

// Quando sua página estiver pronta (carregada por inteira), chama oque está dentro
$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);

    atualizaPlacar();
});

function atualizaTamanhoFrase() {

    var frase = jQuery(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo /
    $("#tempo-digitacao").text(tempo);
}


function inicializaContadores() {
    campo.on("input", function (){
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        var qtdCaracteres = conteudo.length;

        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    campo.one("focus",function (){
        var tempoRestante = $("#tempo-digitacao").text();

        // Execulta de 1 em 1 segundo
        var cronometroID = setInterval(function (){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if(tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.addClass("campo-desativado");
                inserePlacar();
            }
        },1000)
    });

}

function inicializaMarcadores() {

    campo.on("input", function (){
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparado = frase.substr(0,digitado.length);

        if(digitado === comparado) {
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        }

    })
}

function reiniciaJogo() {

    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("campo-errado");
    campo.removeClass("campo-certo");
}
