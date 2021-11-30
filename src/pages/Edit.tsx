import { useState } from "react";
import { useParams } from "react-router";
import Storage from "../ts/storage";
import Plus from "../icons/Plus";
import Delete from "../icons/Delete";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import NotFound from "./NotFound";

const Edit = () => {
    const [storage] = useState(new Storage())
    const { id } = useParams()
    const [game] = useState(storage.getGame(id ? id : ""))
    const [words, setWords] = useState(game ? game.words : [])

    const updateWord = (x: number, y: number, value: string) => {
        setWords(words => words.map((word, word_i) => (
            word_i === y ? word.map((translation, translation_i) => (
                translation_i === x ? value : translation
            )) : word))
        )
    }

    const removeWord = (i: number) =>
        setWords(words => words.filter((word, word_i) => word_i !== i))

    const save = () => {
        storage.updateGame(game.id, words)
        toast.success("New words has been saved")
    }

    const [deletionConfirmed, setDeletionConfirmed] = useState(false)
    const [waitForConToast, setWaitForConToast] = useState<string>()
    const [deleted, setDeleted] = useState(false)

    const deleteGame = () => {
        if (!deletionConfirmed) {
            setWaitForConToast(toast.loading("Click button once again within 2 seconds to confirm the deletion"))
            setTimeout(() => {
                toast.dismiss(waitForConToast)
                setDeletionConfirmed(false)
                setWaitForConToast("")
            }, 2000)
            setDeletionConfirmed(true)
        }
        else {
            toast.dismiss(waitForConToast)
            storage.deleteGame(game.id)
            setDeleted(true)
            toast.success("Game has been deleted successfully")
        }
    }

    return (
        <div className="create-game-container">
            {game && !deleted && 
                <div className="step">
                    <h1>Edit words of {game.name}</h1>
                    <div className="fields-names">
                            {game.fields.map((field, i) => <div className="name" key={i}>{field}</div>)}
                    </div>
                    <div className="words">
                        {words.map((word, word_index) => (
                            <div className="word" key={word_index}>
                                {game.fields.map((field, field_index) => <input value={words[word_index][field_index]} key={field_index} type="text" onChange={
                                    (e) => updateWord(field_index, word_index, e.currentTarget.value)
                                } />)}
                                <div className="remove-button" onClick={() => removeWord(word_index)}><Delete/></div>
                            </div>
                        ))}
                    </div>
                    <div 
                        onClick={() => setWords(words => [...words, Array(game.fields.length).fill('')])} 
                        className="add-button">
                        <Plus/>
                    </div>
                    <div className="buttons">
                        <Link to='/' className="button">Home page</Link>
                        <button onClick={deleteGame}>Delete game</button>
                        <button onClick={save}>Save</button>
                    </div>
                </div>  
            }
            {game && deleted &&
                <div className="step">
                    <h1>game deleted</h1>
                    <div className="buttons">
                        <Link to='/' className="button">Home page</Link>
                    </div>
                </div> 
            }
            {!game && <NotFound/>}
        </div>
    )
}

export default Edit;
