/**
 * POR FAVOR NAO MEXAM NESTE ARQUIVO
 * FAÇAM O DESAFIO NO ARQUIVO DESAFIO
 */

import {
    getCharacters,
    getCharacterById,
    getCharacterQuotes,
    getCharacterDeathsCount,
} from './desafio.js'

const init = async () => {
    await getCharacters();

     var total = await [
         await getCharacterById(2),
         await getCharacterQuotes(1),
         await getCharacterDeathsCount(5),
    ]

    console.log(`\nDesafios concluidos ${total.filter(c => c != "NAO IMPLEMENTADO").length} de ${total.length}`)
}

init();