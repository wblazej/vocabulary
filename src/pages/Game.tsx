import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Storage from "../ts/storage";
import './../styles/game.scss';
import randint from "../ts/randint";
import toast from "react-hot-toast";
import classNames from "classnames";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";

const Game = () => {
    const { id } = useParams()
    const [storage] = useState(new Storage())
    const [game] = useState(storage.getGame(id ? id : ""))

    const [translation, setTranslation] = useState("")
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const [wordToTranslate, setWordToTranslate] = useState("")
    const [correctTranslation, setCorrectTranslation] = useState("")
    const [fieldName, setFieldName] = useState("")

    const generateQuestion = () => {
        setIsCorrect(null)
        setTranslation("")

        const word = game.words[randint(0, game.words.length - 1)]
        const correctWordIndex = randint(0, word.length - 1)
        setFieldName(game.fields[correctWordIndex])
        setCorrectTranslation(word[correctWordIndex])
        setWordToTranslate(word.filter((w, i) => i !== correctWordIndex)[randint(0, word.length - 2)])
    }

    const check = (e: React.FormEvent) => {
        e.preventDefault()

        if (isCorrect !== null) 
            return generateQuestion()
        
        if (translation.toLowerCase() === correctTranslation.toLowerCase()) {
            toast.success("Very good!")
            setIsCorrect(true)
        }
        else {
            toast.error("Keep learning...")
            setIsCorrect(false)
        }
    }

    // eslint-disable-next-line
    useEffect(() => game && generateQuestion(), [])

    return (
        <div className="game-container">
            {game ? 
                <>
                    <h1>playing {game.name}</h1>

                    <form onSubmit={check}>
                        <div className="input-container">
                            <input type="text" onChange={(e) => setTranslation(translation => isCorrect === null ? e.target.value : translation)} value={translation} />
                        </div>
                    </form>

                    <p>Translate to {fieldName}:</p>
                    <div className={classNames("word-to-translate", isCorrect !== null && (isCorrect ? "correct" : "wrong"))}>
                        {isCorrect === null ? wordToTranslate : (isCorrect ? wordToTranslate : correctTranslation)}
                    </div>

                    <div className="buttons">
                        <Link to="/" className="button">Home</Link>
                        <button onClick={generateQuestion}>Next</button>
                    </div>
                </>
                :
                <NotFound/>
            }
        </div>
    )
}

export default Game;
