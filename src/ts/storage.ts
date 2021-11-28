import IBoard from "../typing/board"

class Storage {
    storageItemName = "boards"

    getBoard = (id: string) => this.readLocalStorage()[id]

    getBoards = () => this.readLocalStorage()

    createBoard = (new_board: IBoard) => {
        const boards = this.readLocalStorage()
        boards[this.generateUUID()] = new_board
        localStorage.setItem(this.storageItemName, JSON.stringify(boards))
    }

    deleteBoard = (id: string) => {
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
        return crypto.randomBytes(30).toString('hex');
    }
}

export default Storage;
