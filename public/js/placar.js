$("#botao-placar").click(mostrarPlacar);
$("#botao-sincronismo").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Silvio";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $("#placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {

    var posicaoPlacar = $('#placar').offset().top;

    $('html, body').animate({ scrollTop: posicaoPlacar+"px"}, 1000);
}


function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete")

    // Ícone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}


function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function () {
        linha.remove();
    },1000);
}

function mostrarPlacar() {
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar() {
    var placar = [];
    // Todas as TR completas que são filhas de TBody
    var linhas = $("tbody>tr");

    linhas.each(function (){
        // Pegar o 1º Filho do meu <tr>
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };


    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Salvou!!");
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}