document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("form-idade");
    formulario.addEventListener("submit", calcularIdade);
    carregarUsuarios();
});
function organizarDados(dadosUsuario, valorIdade, classificacaoIdade) {
    let dadosUsuarioAtt = {
        ...dadosUsuario,
        idadeAnos: valorIdade.idadeAnos,
        idadeMeses: valorIdade.idadeMeses,
        idadeDias: valorIdade.idadeDias,
        classificacao: classificacaoIdade,
    };

    return dadosUsuarioAtt;
}
function (classificarIdade){
    if (idade < 14) return "Você é criança"
    if (idade < 18) return "Você é um adolecente"
    if (idade > 18) return "Você é um adulto"
    
}

function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    // if (localStorage.getItem("usuariosCadastrados") == true) padrao do if
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuário cadastrado !</td>
        </tr>`
    } else {
        montarTabela(listaUsuarios);
    }
}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());

montarTabela(lista);


function montarTabela(lista) {
    const tabela = document.getElementById("corpo-tabela");
    let linhas = "";

    lista.forEach(function (pessoa) {
        linhas += 
        <tr>
            <td data-cell="Nome">${pessoa.nome}</td>
            <td data-cell="Nascimento">${formatarData(pessoa.dataNascimento)}</td>
            <td data-cell="Idade">${pessoa.idade} anos</td>
            <td data-cell="Data">${pessoa.dataCadastro}</td>
        </tr>
        ;
    });

    tabela.innerHTML = linhas;
}

function formatarData(data) {
    const novaData = new Date(data);
    return novaData.toLocaleDateString("pt-BR");
}

function deletarRegistros() {
    if (confirm("Deseja realmente apagar todo histórico?")) {
        localStorage.removeItem("usuariosCadastrados");
        carregarUsuarios();
    }
}