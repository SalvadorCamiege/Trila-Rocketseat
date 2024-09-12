/*
const start = () => {
    let contador = 1; // Use um nome de variável diferente de 'const'
    while (contador <= 10) { // extrutura de repetiçâo
        console.log(contador);
        contador++;
    }
};

start();

*/
const { select, input, checkbox } = require("@inquirer/prompts");
// Declaração correta do array global
let metas = [
    {
        value: "beber 1 litro de água todos os dias",
        checked: false
    }
];

// Função para cadastrar uma nova meta
const cadastraMeta = async () => {
    const novaMeta = await input({
        message: "Digite a sua meta:",
    });

    // Verificação correta para checar se 'novaMeta' está vazio.
    if (!novaMeta || !novaMeta.trim()) { // Verificar se 'novaMeta' está vazio ou só tem espaços
        console.log("A meta não pode ser vazia");
        return;
    }

    // Adicionando a nova meta ao array 'metas'
    metas.push({ value: novaMeta, checked: false });
    console.log(`Meta "${novaMeta}" cadastrada com sucesso!`);
}

// Função para listar e selecionar metas
const listaMetas = async () => {
    // Exibindo a lista de metas antes de permitir a seleção
    console.log("Metas cadastradas:");
    metas.forEach(meta => console.log(`- ${meta.value} - ${meta.checked ? 'Concluída' : 'Pendente'}`));

    // Permitir a seleção de metas
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, espaço para marcar ou desmarcar ou o enter para finalizar essa etapa",
        choices: metas.map(meta => ({
            name: meta.value,
            value: meta.value,
            checked: meta.checked
        })),
        instructions: false,
    });

    if (respostas.length === 0) {
        console.log("Nenhuma meta selecionada!");
        return;
    }

    // Atualizando o estado das metas
    metas.forEach(meta => {
        meta.checked = respostas.includes(meta.value);
    });

    console.log("Metas atualizadas:");
    metas.forEach(meta => console.log(`${meta.value} - ${meta.checked ? 'Concluída' : 'Pendente'}`));
}

// Função principal
const start = async () => {
    while (true) {
        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastra"
                },
                {
                    name: "Listar e selecionar metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch (opcao) {
            case "cadastra":
                await cadastraMeta();
                break;
            case "listar":
                await listaMetas();
                break;
            case "sair":
                console.log("Até a próxima");
                return;
            default:
                console.log("Opção inválida");
        }
    }
};

start();
