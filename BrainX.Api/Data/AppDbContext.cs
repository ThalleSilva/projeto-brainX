using Microsoft.EntityFrameworkCore;

namespace BrainX.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<StudySession> Sessions { get; set; }
        public DbSet<ChatMessage> Messages { get; set; }
        public DbSet<TutorKnowledge> KnowledgeBase { get; set; }
        public DbSet<StudyMaterial> Materials { get; set; } 

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TutorKnowledge>().HasData(
                // ==========================================
                // PROGRAMAÇÃO (C# e .NET) - 20 Tópicos
                // ==========================================
                new TutorKnowledge { Id = 1, Subject = "C#", Keyword = "variavel", Response = "Em C#, variáveis são espaços de memória reservados. Exemplo: 'int idade = 25;' declara uma variável inteira." },
                new TutorKnowledge { Id = 2, Subject = "C#", Keyword = "poo", Response = "POO (Programação Orientada a Objetos) baseia-se em Classes e Objetos. Seus 4 pilares são: Herança, Polimorfismo, Encapsulamento e Abstração." },
                new TutorKnowledge { Id = 3, Subject = "C#", Keyword = "tipos de dados", Response = "Tipos primitivos em C#: int (inteiros), double/decimal (decimais), string (texto) e bool (verdadeiro/falso)." },
                new TutorKnowledge { Id = 4, Subject = "C#", Keyword = "herança", Response = "Herança permite que uma classe herde características de outra. Usamos os dois pontos (:). Ex: public class Cachorro : Animal { }" },
                new TutorKnowledge { Id = 5, Subject = "C#", Keyword = "polimorfismo", Response = "Polimorfismo significa 'muitas formas'. Permite sobrescrever métodos da classe pai usando as palavras 'virtual' e 'override'." },
                new TutorKnowledge { Id = 6, Subject = "C#", Keyword = "encapsulamento", Response = "Encapsulamento é proteger os dados de uma classe. Usamos modificadores como 'private' e expomos os dados através de Propriedades (get e set)." },
                new TutorKnowledge { Id = 7, Subject = "C#", Keyword = "interface", Response = "Uma Interface é um contrato. Ela define QUAIS métodos uma classe deve ter, mas não COMO eles funcionam. Usamos 'interface IExemplo'." },
                new TutorKnowledge { Id = 8, Subject = "C#", Keyword = "classe abstrata", Response = "Uma classe abstrata (abstract class) não pode ser instanciada diretamente, serve apenas como base (molde) para outras classes herdarem." },
                new TutorKnowledge { Id = 9, Subject = "C#", Keyword = "for", Response = "O laço 'for' é usado quando sabemos o número exato de repetições. Exemplo: for(int i=0; i<10; i++) { ... }" },
                new TutorKnowledge { Id = 10, Subject = "C#", Keyword = "while", Response = "O laço 'while' repete um bloco enquanto uma condição for verdadeira. Cuidado para não criar loops infinitos!" },
                new TutorKnowledge { Id = 11, Subject = "C#", Keyword = "foreach", Response = "O 'foreach' é ideal para percorrer listas e arrays. Ex: foreach(var item in lista) { Console.WriteLine(item); }" },
                new TutorKnowledge { Id = 12, Subject = "C#", Keyword = "try catch", Response = "O bloco 'try-catch' trata erros. O código que pode quebrar vai no 'try', e a solução ou mensagem de erro vai no 'catch'." },
                new TutorKnowledge { Id = 13, Subject = "C#", Keyword = "array", Response = "Arrays são coleções de tamanho FIXO. Ex: int[] numeros = new int[5]; cria um array para 5 números." },
                new TutorKnowledge { Id = 14, Subject = "C#", Keyword = "lista", Response = "Listas (List<T>) são coleções DINÂMICAS. Você pode adicionar com .Add() e remover com .Remove() sem se preocupar com o tamanho limite." },
                new TutorKnowledge { Id = 15, Subject = "C#", Keyword = "linq", Response = "LINQ é uma linguagem de consulta integrada. Permite filtrar listas facilmente, ex: var filtrado = lista.Where(x => x.Idade > 18).ToList();" },
                new TutorKnowledge { Id = 16, Subject = "C#", Keyword = "async await", Response = "O 'async/await' é usado para programação assíncrona. Ele permite que o programa continue rodando enquanto espera o banco de dados responder, por exemplo." },
                new TutorKnowledge { Id = 17, Subject = "C#", Keyword = "entity framework", Response = "O Entity Framework (EF Core) é um ORM. Ele traduz seu código C# para comandos SQL automaticamente, facilitando o acesso ao banco de dados." },
                new TutorKnowledge { Id = 18, Subject = "C#", Keyword = "api", Response = "API (Application Programming Interface) é uma ponte de comunicação. No .NET, criamos APIs REST usando Controllers para retornar dados em JSON." },
                new TutorKnowledge { Id = 19, Subject = "C#", Keyword = "json", Response = "JSON é o formato padrão de troca de dados na web. Em C#, usamos System.Text.Json para transformar objetos em texto e vice-versa (Serialização)." },
                new TutorKnowledge { Id = 20, Subject = "C#", Keyword = "injecao de dependencia", Response = "Injeção de Dependência (DI) é um padrão onde o sistema fornece os objetos que uma classe precisa para funcionar. No .NET, configuramos isso no builder.Services." },

                // ==========================================
                // MATEMÁTICA - 20 Tópicos
                // ==========================================
                new TutorKnowledge { Id = 21, Subject = "Matemática", Keyword = "pitagoras", Response = "Em um triângulo retângulo, a soma dos quadrados dos catetos é igual ao quadrado da hipotenusa (a² = b² + c²)." },
                new TutorKnowledge { Id = 22, Subject = "Matemática", Keyword = "bhaskara", Response = "A Fórmula de Bhaskara acha raízes da equação do 2º grau: x = (-b ± √Δ) / 2a." },
                new TutorKnowledge { Id = 23, Subject = "Matemática", Keyword = "delta", Response = "O Delta (Δ) é Δ = b² - 4ac. Δ > 0: duas raízes. Δ = 0: uma raiz. Δ < 0: sem raízes reais." },
                new TutorKnowledge { Id = 24, Subject = "Matemática", Keyword = "fracao", Response = "Fração tem numerador (parte de cima) e denominador (parte de baixo). Para somar denominadores diferentes, faça o MMC." },
                new TutorKnowledge { Id = 25, Subject = "Matemática", Keyword = "porcentagem", Response = "Porcentagem é uma razão de base 100. 20% de 50 = (20/100) * 50 = 10." },
                new TutorKnowledge { Id = 26, Subject = "Matemática", Keyword = "regra de tres", Response = "Regra de três simples resolve problemas proporcionais. Multiplica-se cruzado quando são diretamente proporcionais." },
                new TutorKnowledge { Id = 27, Subject = "Matemática", Keyword = "juros simples", Response = "Fórmula do Juros Simples: J = C * i * t (Capital x Taxa x Tempo)." },
                new TutorKnowledge { Id = 28, Subject = "Matemática", Keyword = "juros compostos", Response = "Fórmula do Juros Compostos: M = C * (1 + i)^t (O famoso 'juros sobre juros')." },
                new TutorKnowledge { Id = 29, Subject = "Matemática", Keyword = "logaritmo", Response = "Logaritmo: log_b(a) = x significa que b^x = a. A 'Regra do Tombo' é: log(a^b) = b * log(a)." },
                new TutorKnowledge { Id = 30, Subject = "Matemática", Keyword = "trigonometria", Response = "No triângulo retângulo (SOH CAH TOA): Seno (Oposto/Hipotenusa), Cosseno (Adjacente/Hipotenusa), Tangente (Oposto/Adjacente)." },
                new TutorKnowledge { Id = 31, Subject = "Matemática", Keyword = "probabilidade", Response = "Probabilidade = (Casos Favoráveis) / (Casos Possíveis). A chance de tirar o número 4 num dado é 1/6." },
                new TutorKnowledge { Id = 32, Subject = "Matemática", Keyword = "media", Response = "Média Aritmética: soma tudo e divide pela quantidade de itens. (Ex: notas 6 e 8 = 14/2 = Média 7)." },
                new TutorKnowledge { Id = 33, Subject = "Matemática", Keyword = "mediana", Response = "Mediana é o número do meio em uma lista organizada em ordem crescente. Se for par, faz a média dos dois centrais." },
                new TutorKnowledge { Id = 34, Subject = "Matemática", Keyword = "moda", Response = "Moda, na estatística, é o valor que mais se repete em um conjunto de dados." },
                new TutorKnowledge { Id = 35, Subject = "Matemática", Keyword = "fatorial", Response = "Fatorial (n!) é a multiplicação de um número pelos seus antecessores. Ex: 4! = 4 x 3 x 2 x 1 = 24." },
                new TutorKnowledge { Id = 36, Subject = "Matemática", Keyword = "permutacao", Response = "Permutação (Pn = n!) é a forma de organizar todos os elementos de um conjunto em ordem. Quantos anagramas tem a palavra AMOR? 4! = 24." },
                new TutorKnowledge { Id = 37, Subject = "Matemática", Keyword = "arranjo", Response = "No Arranjo, a ordem dos elementos IMPORTA (ex: senhas, pódio). Fórmula: A(n,p) = n! / (n-p)!" },
                new TutorKnowledge { Id = 38, Subject = "Matemática", Keyword = "combinacao", Response = "Na Combinação, a ordem NÃO importa (ex: montar um grupo, salada de frutas). Fórmula: C(n,p) = n! / [p! * (n-p)!]" },
                new TutorKnowledge { Id = 39, Subject = "Matemática", Keyword = "matriz", Response = "Matrizes são tabelas de números organizados em Linhas x Colunas. Usadas para resolver sistemas lineares complexos." },
                new TutorKnowledge { Id = 40, Subject = "Matemática", Keyword = "funcao do primeiro grau", Response = "Função de 1º Grau (Afim): f(x) = ax + b. O gráfico é sempre uma Reta." },
                new TutorKnowledge { Id = 41, Subject = "Matemática", Keyword = "funcao do segundo grau", Response = "Função de 2º Grau (Quadrática): f(x) = ax² + bx + c. O gráfico é uma Parábola (curva em formato de U ou U invertido)." },

                // ==========================================
                // PORTUGUÊS - 20 Tópicos
                // ==========================================
                new TutorKnowledge { Id = 42, Subject = "Português", Keyword = "crase", Response = "A crase é a fusão da preposição 'a' com o artigo feminino 'a'. Nunca use antes de palavras masculinas ou verbos." },
                new TutorKnowledge { Id = 43, Subject = "Português", Keyword = "porque", Response = "'Por que' (pergunta/motivo). 'Porque' (resposta). 'Por quê' (fim de frase). 'Porquê' (substantivo: 'o porquê')." },
                new TutorKnowledge { Id = 44, Subject = "Português", Keyword = "mas", Response = "'Mas' é oposição (porém, contudo). Ex: Tentei, MAS não consegui." },
                new TutorKnowledge { Id = 45, Subject = "Português", Keyword = "mais", Response = "'Mais' indica adição, intensidade, oposto de 'menos'. Ex: Quero MAIS café." },
                new TutorKnowledge { Id = 46, Subject = "Português", Keyword = "mal e mau", Response = "'Mal' é o oposto de BEM (Ele canta mal). 'Mau' é o oposto de BOM (Ele é um lobo mau)." },
                new TutorKnowledge { Id = 47, Subject = "Português", Keyword = "onde e aonde", Response = "'Onde' indica lugar fixo (Onde você mora?). 'Aonde' indica movimento (Aonde você vai?)." },
                new TutorKnowledge { Id = 48, Subject = "Português", Keyword = "senao", Response = "'Senão' junto significa 'caso contrário' (Estude, senão vai reprovar). 'Se não' separado indica condição (Se não chover, eu vou)." },
                new TutorKnowledge { Id = 49, Subject = "Português", Keyword = "virgula", Response = "Vírgula separa enumerações e isola vocativos. Regra de Ouro: NUNCA separe o Sujeito do Verbo com vírgula!" },
                new TutorKnowledge { Id = 50, Subject = "Português", Keyword = "sujeito", Response = "Sujeito é quem sofre ou pratica a ação. Pode ser Simples, Composto (João e Maria), Oculto ou Indeterminado." },
                new TutorKnowledge { Id = 51, Subject = "Português", Keyword = "predicado", Response = "Predicado é tudo aquilo que se declara sobre o sujeito. Ex: O cachorro (sujeito) 'mordeu o carteiro' (predicado)." },
                new TutorKnowledge { Id = 52, Subject = "Português", Keyword = "metafora", Response = "Metáfora é uma comparação implícita. Ex: 'Seu coração é de gelo' (não usamos a palavra 'como')." },
                new TutorKnowledge { Id = 53, Subject = "Português", Keyword = "pleonasmo", Response = "Pleonasmo é a repetição desnecessária de uma ideia. Exemplo clássico: 'Subir para cima' ou 'Entrar para dentro'." },
                new TutorKnowledge { Id = 54, Subject = "Português", Keyword = "hiperbole", Response = "Hipérbole é o exagero intencional para dar ênfase. Ex: 'Estou morrendo de fome!' ou 'Já te falei um milhão de vezes!'." },
                new TutorKnowledge { Id = 55, Subject = "Português", Keyword = "eufemismo", Response = "Eufemismo é suavizar uma expressão chocante ou triste. Ex: Em vez de 'morreu', dizer 'passou dessa para uma melhor'." },
                new TutorKnowledge { Id = 56, Subject = "Português", Keyword = "ironia", Response = "Ironia é afirmar o contrário do que se pensa. Ex: 'Que garoto inteligente, zerou a prova!'." },
                new TutorKnowledge { Id = 57, Subject = "Português", Keyword = "paradoxo", Response = "Paradoxo é unir ideias que se contradizem no mesmo contexto. Ex: 'Estou cego, mas agora consigo ver a verdade'." },
                new TutorKnowledge { Id = 58, Subject = "Português", Keyword = "proparoxitona", Response = "Palavras proparoxítonas têm a antepenúltima sílaba tônica. Regra: TODAS as proparoxítonas são acentuadas. Ex: Má-gi-co, Lám-pa-da." },
                new TutorKnowledge { Id = 59, Subject = "Português", Keyword = "oxitona", Response = "Oxítonas têm a última sílaba forte. Acentuam-se as terminadas em A, E, O, EM. Ex: Ca-fé, Ci-pó, Ar-ma-zém." },
                new TutorKnowledge { Id = 60, Subject = "Português", Keyword = "verbo", Response = "Verbo indica Ação (correr), Estado (ser, estar) ou Fenômeno da Natureza (chover). Ele flexiona em tempo, modo, número e pessoa." },
                new TutorKnowledge { Id = 61, Subject = "Português", Keyword = "adjetivo", Response = "Adjetivo é a palavra que dá uma característica, qualidade ou estado ao Substantivo. Ex: Carro 'RÁPIDO', Menina 'INTELIGENTE'." }
            );
        }
    }

    public class User { public int Id { get; set; } public string Email { get; set; } = string.Empty; public string Senha { get; set; } = string.Empty; }
    public class StudySession { public int Id { get; set; } public int UserId { get; set; } public string Subject { get; set; } = string.Empty; public DateTime CreatedAt { get; set; } = DateTime.Now; public List<ChatMessage> Messages { get; set; } = new(); }
    public class ChatMessage { public int Id { get; set; } public int StudySessionId { get; set; } public string Role { get; set; } = string.Empty; public string Text { get; set; } = string.Empty; public DateTime CreatedAt { get; set; } = DateTime.Now; }
    public class TutorKnowledge { public int Id { get; set; } public string Subject { get; set; } = string.Empty; public string Keyword { get; set; } = string.Empty; public string Response { get; set; } = string.Empty; }
    public class StudyMaterial { public int Id { get; set; } public int UserId { get; set; } public string Title { get; set; } = string.Empty; public string Type { get; set; } = string.Empty; public string Content { get; set; } = string.Empty; public string FileName { get; set; } = string.Empty; public DateTime CreatedAt { get; set; } = DateTime.Now; }
}