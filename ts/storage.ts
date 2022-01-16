import IGame from "../typings/Game"

import Games from "../games.json";

class Storage {
    storageItemName = "games"

    getGame = (id: string): IGame => Games.filter(game => game.id === id)[0]

    getGames = (): Array<IGame> => Games.sort((a, b) => a.created_at < b.created_at ? 1 : -1)

    generateUUID = (): string => {
        const crypto = require("crypto");
        
        let uuid = ''

        while (true) {
            uuid = crypto.randomBytes(5).toString('hex');
            if (!this.getGame(uuid))
                break
        }

        return uuid
    }
}

export default Storage;
