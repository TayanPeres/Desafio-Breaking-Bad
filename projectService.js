import fetch from 'node-fetch';

const ProjectServiceFactory = () => {
    const BASE_URL = "https://breakingbadapi.com/api"

    return {
        /**
         * Retorna um objeto com a lista de personagens
         * @returns 
         */
        async getCharacters() {
            let response = await fetch(`${BASE_URL}/characters`);            
            let characters = await response.json();
            return characters;
        },

        /**
         * Retorna um personagem
         * @param {Integer} characterId 
         * @returns 
         */
        async getCharacter(characterId) {
            let response = await fetch(`${BASE_URL}/characters/${characterId}`);
            let character = await response.json();
            return character;
        },

        /**
         * Retorna as citações de um personagem
         * @param {string} characterName 
         * @returns 
         */
        async getCharacterQuotes(characterName) {
            let response = await fetch(`${BASE_URL}/quote?author=${characterName.replace(' ', '+')}`);
            let quotes = await response.json();
            return quotes;
        },

        /**
         * Retorna a quantidade de pessoas mortas pelo personagem
         * @param {string} characterName 
         * @returns 
         */
         async getCharacterDeathsCount(characterName) {
            let response = await fetch(`${BASE_URL}/death-count?name=${characterName.replace(' ', '+')}`);
            let deathNumber = await response.json();
            return deathNumber;
        }
    }
}

export const ProjectService = ProjectServiceFactory();

export default ProjectService