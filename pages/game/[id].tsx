import React, { useEffect, useState } from "react";
import Storage from "../../ts/storage";
import randint from "../../ts/randint";
import toast from "react-hot-toast";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../../styles/Game.module.scss";
import ButtonStyles from "../../styles/Buttons.module.scss";

const Game = () => {
    const router = useRouter();
    const { id } = router.query;
    const [storage] = useState(new Storage())
    const [game, setGame] = useState(storage.getGame(id ? id as string : ""))

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
        setWordToTranslate(word.filter((_, i) => i !== correctWordIndex)[randint(0, word.length - 2)])
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

    useEffect(() => {
        if (game) {
            generateQuestion();
        }
    }, [game]);

    useEffect(() => {
        if (!game && id) {
            const g = storage.getGame(id as string || "");
            if (!g) {
                router.replace("/404");
            } else {
                setGame(g);
            }
        }
    }, [id, game]);


    return (
        <div className={styles["game-container"]}>
            {game &&
                <>
                    <h1>playing {game.name}</h1>

                    <form onSubmit={check}>
                        <div className={styles["input-container"]}>
                            <input type="text" onChange={(e) => setTranslation(translation => isCorrect === null ? e.target.value : translation)} value={translation} />
                        </div>
                    </form>

                    <p>Translate to {fieldName}:</p>
                    <div className={classNames(styles["word-to-translate"], isCorrect !== null && (isCorrect ? styles.correct : styles.wrong))}>
                        {isCorrect === null ? wordToTranslate : (isCorrect ? wordToTranslate : correctTranslation)}
                    </div>

                    <div className={ButtonStyles.buttons}>
                        
                        <Link href="/" passHref>
                            <div className={ButtonStyles.button}>
                                Home
                            </div>
                        </Link>
                        
                        <button onClick={generateQuestion}>Next</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Game;
