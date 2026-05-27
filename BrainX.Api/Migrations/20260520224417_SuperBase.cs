using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BrainX.Api.Migrations
{
    /// <inheritdoc />
    public partial class SuperBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KnowledgeBase",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Subject = table.Column<string>(type: "TEXT", nullable: false),
                    Keyword = table.Column<string>(type: "TEXT", nullable: false),
                    Response = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KnowledgeBase", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    FileName = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Subject = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Senha = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StudySessionId = table.Column<int>(type: "INTEGER", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Sessions_StudySessionId",
                        column: x => x.StudySessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "KnowledgeBase",
                columns: new[] { "Id", "Keyword", "Response", "Subject" },
                values: new object[,]
                {
                    { 1, "variavel", "Em C#, variáveis são espaços de memória reservados. Exemplo: 'int idade = 25;' declara uma variável inteira.", "C#" },
                    { 2, "poo", "POO (Programação Orientada a Objetos) baseia-se em Classes e Objetos. Seus 4 pilares são: Herança, Polimorfismo, Encapsulamento e Abstração.", "C#" },
                    { 3, "tipos de dados", "Tipos primitivos em C#: int (inteiros), double/decimal (decimais), string (texto) e bool (verdadeiro/falso).", "C#" },
                    { 4, "herança", "Herança permite que uma classe herde características de outra. Usamos os dois pontos (:). Ex: public class Cachorro : Animal { }", "C#" },
                    { 5, "polimorfismo", "Polimorfismo significa 'muitas formas'. Permite sobrescrever métodos da classe pai usando as palavras 'virtual' e 'override'.", "C#" },
                    { 6, "encapsulamento", "Encapsulamento é proteger os dados de uma classe. Usamos modificadores como 'private' e expomos os dados através de Propriedades (get e set).", "C#" },
                    { 7, "interface", "Uma Interface é um contrato. Ela define QUAIS métodos uma classe deve ter, mas não COMO eles funcionam. Usamos 'interface IExemplo'.", "C#" },
                    { 8, "classe abstrata", "Uma classe abstrata (abstract class) não pode ser instanciada diretamente, serve apenas como base (molde) para outras classes herdarem.", "C#" },
                    { 9, "for", "O laço 'for' é usado quando sabemos o número exato de repetições. Exemplo: for(int i=0; i<10; i++) { ... }", "C#" },
                    { 10, "while", "O laço 'while' repete um bloco enquanto uma condição for verdadeira. Cuidado para não criar loops infinitos!", "C#" },
                    { 11, "foreach", "O 'foreach' é ideal para percorrer listas e arrays. Ex: foreach(var item in lista) { Console.WriteLine(item); }", "C#" },
                    { 12, "try catch", "O bloco 'try-catch' trata erros. O código que pode quebrar vai no 'try', e a solução ou mensagem de erro vai no 'catch'.", "C#" },
                    { 13, "array", "Arrays são coleções de tamanho FIXO. Ex: int[] numeros = new int[5]; cria um array para 5 números.", "C#" },
                    { 14, "lista", "Listas (List<T>) são coleções DINÂMICAS. Você pode adicionar com .Add() e remover com .Remove() sem se preocupar com o tamanho limite.", "C#" },
                    { 15, "linq", "LINQ é uma linguagem de consulta integrada. Permite filtrar listas facilmente, ex: var filtrado = lista.Where(x => x.Idade > 18).ToList();", "C#" },
                    { 16, "async await", "O 'async/await' é usado para programação assíncrona. Ele permite que o programa continue rodando enquanto espera o banco de dados responder, por exemplo.", "C#" },
                    { 17, "entity framework", "O Entity Framework (EF Core) é um ORM. Ele traduz seu código C# para comandos SQL automaticamente, facilitando o acesso ao banco de dados.", "C#" },
                    { 18, "api", "API (Application Programming Interface) é uma ponte de comunicação. No .NET, criamos APIs REST usando Controllers para retornar dados em JSON.", "C#" },
                    { 19, "json", "JSON é o formato padrão de troca de dados na web. Em C#, usamos System.Text.Json para transformar objetos em texto e vice-versa (Serialização).", "C#" },
                    { 20, "injecao de dependencia", "Injeção de Dependência (DI) é um padrão onde o sistema fornece os objetos que uma classe precisa para funcionar. No .NET, configuramos isso no builder.Services.", "C#" },
                    { 21, "pitagoras", "Em um triângulo retângulo, a soma dos quadrados dos catetos é igual ao quadrado da hipotenusa (a² = b² + c²).", "Matemática" },
                    { 22, "bhaskara", "A Fórmula de Bhaskara acha raízes da equação do 2º grau: x = (-b ± √Δ) / 2a.", "Matemática" },
                    { 23, "delta", "O Delta (Δ) é Δ = b² - 4ac. Δ > 0: duas raízes. Δ = 0: uma raiz. Δ < 0: sem raízes reais.", "Matemática" },
                    { 24, "fracao", "Fração tem numerador (parte de cima) e denominador (parte de baixo). Para somar denominadores diferentes, faça o MMC.", "Matemática" },
                    { 25, "porcentagem", "Porcentagem é uma razão de base 100. 20% de 50 = (20/100) * 50 = 10.", "Matemática" },
                    { 26, "regra de tres", "Regra de três simples resolve problemas proporcionais. Multiplica-se cruzado quando são diretamente proporcionais.", "Matemática" },
                    { 27, "juros simples", "Fórmula do Juros Simples: J = C * i * t (Capital x Taxa x Tempo).", "Matemática" },
                    { 28, "juros compostos", "Fórmula do Juros Compostos: M = C * (1 + i)^t (O famoso 'juros sobre juros').", "Matemática" },
                    { 29, "logaritmo", "Logaritmo: log_b(a) = x significa que b^x = a. A 'Regra do Tombo' é: log(a^b) = b * log(a).", "Matemática" },
                    { 30, "trigonometria", "No triângulo retângulo (SOH CAH TOA): Seno (Oposto/Hipotenusa), Cosseno (Adjacente/Hipotenusa), Tangente (Oposto/Adjacente).", "Matemática" },
                    { 31, "probabilidade", "Probabilidade = (Casos Favoráveis) / (Casos Possíveis). A chance de tirar o número 4 num dado é 1/6.", "Matemática" },
                    { 32, "media", "Média Aritmética: soma tudo e divide pela quantidade de itens. (Ex: notas 6 e 8 = 14/2 = Média 7).", "Matemática" },
                    { 33, "mediana", "Mediana é o número do meio em uma lista organizada em ordem crescente. Se for par, faz a média dos dois centrais.", "Matemática" },
                    { 34, "moda", "Moda, na estatística, é o valor que mais se repete em um conjunto de dados.", "Matemática" },
                    { 35, "fatorial", "Fatorial (n!) é a multiplicação de um número pelos seus antecessores. Ex: 4! = 4 x 3 x 2 x 1 = 24.", "Matemática" },
                    { 36, "permutacao", "Permutação (Pn = n!) é a forma de organizar todos os elementos de um conjunto em ordem. Quantos anagramas tem a palavra AMOR? 4! = 24.", "Matemática" },
                    { 37, "arranjo", "No Arranjo, a ordem dos elementos IMPORTA (ex: senhas, pódio). Fórmula: A(n,p) = n! / (n-p)!", "Matemática" },
                    { 38, "combinacao", "Na Combinação, a ordem NÃO importa (ex: montar um grupo, salada de frutas). Fórmula: C(n,p) = n! / [p! * (n-p)!]", "Matemática" },
                    { 39, "matriz", "Matrizes são tabelas de números organizados em Linhas x Colunas. Usadas para resolver sistemas lineares complexos.", "Matemática" },
                    { 40, "funcao do primeiro grau", "Função de 1º Grau (Afim): f(x) = ax + b. O gráfico é sempre uma Reta.", "Matemática" },
                    { 41, "funcao do segundo grau", "Função de 2º Grau (Quadrática): f(x) = ax² + bx + c. O gráfico é uma Parábola (curva em formato de U ou U invertido).", "Matemática" },
                    { 42, "crase", "A crase é a fusão da preposição 'a' com o artigo feminino 'a'. Nunca use antes de palavras masculinas ou verbos.", "Português" },
                    { 43, "porque", "'Por que' (pergunta/motivo). 'Porque' (resposta). 'Por quê' (fim de frase). 'Porquê' (substantivo: 'o porquê').", "Português" },
                    { 44, "mas", "'Mas' é oposição (porém, contudo). Ex: Tentei, MAS não consegui.", "Português" },
                    { 45, "mais", "'Mais' indica adição, intensidade, oposto de 'menos'. Ex: Quero MAIS café.", "Português" },
                    { 46, "mal e mau", "'Mal' é o oposto de BEM (Ele canta mal). 'Mau' é o oposto de BOM (Ele é um lobo mau).", "Português" },
                    { 47, "onde e aonde", "'Onde' indica lugar fixo (Onde você mora?). 'Aonde' indica movimento (Aonde você vai?).", "Português" },
                    { 48, "senao", "'Senão' junto significa 'caso contrário' (Estude, senão vai reprovar). 'Se não' separado indica condição (Se não chover, eu vou).", "Português" },
                    { 49, "virgula", "Vírgula separa enumerações e isola vocativos. Regra de Ouro: NUNCA separe o Sujeito do Verbo com vírgula!", "Português" },
                    { 50, "sujeito", "Sujeito é quem sofre ou pratica a ação. Pode ser Simples, Composto (João e Maria), Oculto ou Indeterminado.", "Português" },
                    { 51, "predicado", "Predicado é tudo aquilo que se declara sobre o sujeito. Ex: O cachorro (sujeito) 'mordeu o carteiro' (predicado).", "Português" },
                    { 52, "metafora", "Metáfora é uma comparação implícita. Ex: 'Seu coração é de gelo' (não usamos a palavra 'como').", "Português" },
                    { 53, "pleonasmo", "Pleonasmo é a repetição desnecessária de uma ideia. Exemplo clássico: 'Subir para cima' ou 'Entrar para dentro'.", "Português" },
                    { 54, "hiperbole", "Hipérbole é o exagero intencional para dar ênfase. Ex: 'Estou morrendo de fome!' ou 'Já te falei um milhão de vezes!'.", "Português" },
                    { 55, "eufemismo", "Eufemismo é suavizar uma expressão chocante ou triste. Ex: Em vez de 'morreu', dizer 'passou dessa para uma melhor'.", "Português" },
                    { 56, "ironia", "Ironia é afirmar o contrário do que se pensa. Ex: 'Que garoto inteligente, zerou a prova!'.", "Português" },
                    { 57, "paradoxo", "Paradoxo é unir ideias que se contradizem no mesmo contexto. Ex: 'Estou cego, mas agora consigo ver a verdade'.", "Português" },
                    { 58, "proparoxitona", "Palavras proparoxítonas têm a antepenúltima sílaba tônica. Regra: TODAS as proparoxítonas são acentuadas. Ex: Má-gi-co, Lám-pa-da.", "Português" },
                    { 59, "oxitona", "Oxítonas têm a última sílaba forte. Acentuam-se as terminadas em A, E, O, EM. Ex: Ca-fé, Ci-pó, Ar-ma-zém.", "Português" },
                    { 60, "verbo", "Verbo indica Ação (correr), Estado (ser, estar) ou Fenômeno da Natureza (chover). Ele flexiona em tempo, modo, número e pessoa.", "Português" },
                    { 61, "adjetivo", "Adjetivo é a palavra que dá uma característica, qualidade ou estado ao Substantivo. Ex: Carro 'RÁPIDO', Menina 'INTELIGENTE'.", "Português" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_StudySessionId",
                table: "Messages",
                column: "StudySessionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KnowledgeBase");

            migrationBuilder.DropTable(
                name: "Materials");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Sessions");
        }
    }
}
