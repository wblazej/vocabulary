import IGame from "../typing/game"

class Storage {
    storageItemName = "boards"

    getGame = (id: string): IGame => this.readLocalStorage()[id]

    getGames = (): {[key: string]: IGame} => this.readLocalStorage()

    createGame = (new_board: IGame) => {
        const boards = this.readLocalStorage()
        boards[this.generateUUID()] = new_board
        localStorage.setItem(this.storageItemName, JSON.stringify(boards))
    }

    deleteGame = (id: string) => {
        const boards = this.readLocalStorage()
        delete boards[id]
        localStorage.setItem(this.storageItemName, JSON.stringify(boards))
    }
    
    readLocalStorage = () => {
        const boards = localStorage.getItem(this.storageItemName)
        return boards ? JSON.parse(boards) : {}
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
