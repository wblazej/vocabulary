import IGame from "../typings/Game"

class Storage {
    storageItemName = "games"

    getGame = (id: string): IGame => this.readLocalStorage().filter(game => game.id === id)[0]

    getGames = (): Array<IGame> => this.readLocalStorage().sort((a, b) => a.created_at < b.created_at ? 1 : -1)

    createGame = (new_board: IGame) =>
        localStorage.setItem(this.storageItemName, JSON.stringify(this.readLocalStorage().concat(new_board)))

    deleteGame = (id: string) =>
        localStorage.setItem(this.storageItemName, JSON.stringify(this.readLocalStorage().filter(game => game.id !== id)))

    updateGame = (id: string, words: Array<Array<string>>) => {
        const game = this.getGame(id)
        game.words = words
        localStorage.setItem(this.storageItemName, JSON.stringify(this.readLocalStorage().map(g => g.id === id ? game : g)))
    }
    
    readLocalStorage = (): Array<IGame> => {
        const boards = typeof window !== "undefined" && localStorage.getItem(this.storageItemName)
        return boards ? JSON.parse(boards) : []
    }

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
