import ProjectService from './services/projectService.js';

/* 
    A ideia desse novo desafio é mostrar como manipulamos as listas e objetos nos projetos da atta.
    Normalmente a comunicação da plataforma é composta por um Cliente (aplicação) + um serviço (Endpoint), no exemplo abaixo iremos fazer uma chamada de API.
    No exemplo abaixo iremos utilizar um serviço do Mockapi, é um projetinho que já possui alguns dados fakes para nosso teste.

    Pontos importantes:
        - Observem a estrutura de dados de cada endpoint
        - Explorem o arquivo "projectService.js" para identificar os métodos existentes
        - Utlizaremos as keywords async e await para deixar o código mais fluido (https://www.alura.com.br/artigos/async-await-no-javascript-o-que-e-e-quando-usar) 
        - NÃO Modifiquem os arquivos da service. Somente o index.js
*/

// Exemplo de uso.
// Neste exemplo iremos retornar todos os personagens da api e listar somente o char_id e o nome (resumingo cada objeto da lista) no console.
// Digite no console "npm run app" para verificarmos os resultados.
export async function getCharacters() {
    const response = await ProjectService.getCharacters()

    // Resumindo os objetos para mostrar o id, nome, apelido e status dos personagens
    let personagens = response.map(personagem => ({
        id: personagem.char_id,
        name: personagem.name,
        apelido: personagem.nickname,
        status: personagem.status
    }))

    console.log('\n=================================================')
    console.log('  Lista de todos os personagens de Breaking Bad  ')
    console.log('=================================================')

    console.table(personagens)
    return personagens;
}

// Agora começam os desafios. Para facilitar, você pode acessar via Postman os endpoints para verificar os retornos:
// Personagens: "https://breakingbadapi.com/api/characters",
// Episódios: "https://breakingbadapi.com/api/episodes",
// Citações: "https://breakingbadapi.com/api/quotes",
// Mortes: "https://breakingbadapi.com/api/deaths"


// Deve retornar todos os dados do personagem
export async function getCharacterById(postId) {
    const response = await ProjectService.getCharacter(postId)  

    // Não modificar os retornos das funções
    console.log('\n======================')
    console.log(`  Dados do personagem `)
    console.log('======================')

    console.log(response)
    return response;
}

// Deve mostrar o id, nome do personagem e todas as suas citações
/*  export async function getCharacterQuotes(characterId) {
    const response = "Nao"
  /*  const response = await ProjectService.getCharacterQuotes(characterId)
    let informacoesPersonagem = response.map(informacoesPersonagem => ({
        id: informacoesPersonagem.char_id,
        name: informacoesPersonagem.name,
       
    }))
    

    // Não modificar os retornos das funções
    console.log('\n==========================')
    console.log(`  Citações do personagem  `)
    console.log('==========================')
    console.log(informacoesPersonagem) 
    return response; 
} */ 

// Deve mostrar o id, nome do personagem e todas as suas citações
export async function getCharacterQuotes(characterId) {
    const response = await Promise.all(await ProjectService.getCharacter(characterId)
    .then(informacoesPersonagens => informacoesPersonagens.map(async informacoesPersonagens => ({
        id: informacoesPersonagens.char_id,
        name: informacoesPersonagens.name,
        birth: informacoesPersonagens.birthday,
        quotes: await ProjectService.getCharacterQuotes(informacoesPersonagens.name).then(quotes => quotes.map(quotes =>quotes.quote))
    }))))

    // Não modificar os retornos das funções
    console.log('\n==========================')
    console.log(`  Citações do personagem  `)
    console.log('==========================')
    console.log(response)
    return response;
}

// Deve mostrar o id, nome, data de nascimento e a quantidade de pessoas mortas pelo personagem
export async function getCharacterDeathsCount(characterId) {
    const response = await Promise.all(await ProjectService.getCharacter(characterId)

    .then(informacoesPersonagens => informacoesPersonagens.map(async informacoesPersonagens => ({
        id: informacoesPersonagens.char_id,
        name: informacoesPersonagens.name,
        birth: informacoesPersonagens.birthday,
        deaths: await ProjectService.getCharacterDeathsCount(informacoesPersonagens.name).then(mortes => mortes.map(mortes => mortes.deathCount))
    }))))
    


   // Retorna a quantidade de pessoas mortas pelo personagem
  

    // Não modificar os retornos das funções
    console.log('\n================================================')
    console.log(`  Quantidade de pessoas mortas pelo personagem  `)
    console.log('================================================')
    console.table(response)
    return response;
}
