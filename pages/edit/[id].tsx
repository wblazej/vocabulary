import { useEffect, useState } from "react";
import Storage from "../../ts/storage";
import Plus from "../../icons/Plus";
import Delete from "../../icons/Delete";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "../../styles/Create.module.scss";
import ButtonStyles from "../../styles/Buttons.module.scss";

const Edit = () => {
    const [storage] = useState(new Storage())
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState(storage.getGame(id as string || ""))
    const [words, setWords] = useState(game ? game.words : [])

    const updateWord = (x: number, y: number, value: string) => {
        setWords(words => words.map((word, word_i) => (
            word_i === y ? word.map((translation, translation_i) => (
                translation_i === x ? value : translation
            )) : word))
        )
    }

    const removeWord = (i: number) =>
        setWords(words => words.filter((_, word_i) => word_i !== i))

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

    useEffect(() => {
        if (!game && id) {
            const g = storage.getGame(id as string || "");
            if (!g) {
                router.replace("/404");
            } else {
                setGame(g);
                setWords(g.words);
            }
        }
    }, [id, game]);

    return (
        <div>
            {game && !deleted && 
                <div className={styles.step}>
                    <h1>Edit words of {game.name}</h1>
                    <div className={styles["fields-names"]}>
                            {game.fields.map((field, i) => <div className={styles.name} key={i}>{field}</div>)}
                    </div>
                    <div className={styles.words}>
                        {words.map((_, word_index) => (
                            <div className={styles.word} key={word_index}>
                                {game.fields.map((_, field_index) => <input value={words[word_index][field_index]} key={field_index} type="text" onChange={
                                    (e) => updateWord(field_index, word_index, e.currentTarget.value)
                                } />)}
                                <div className={styles["remove-button"]} onClick={() => removeWord(word_index)}><Delete/></div>
                            </div>
                        ))}
                    </div>
                    <div 
                        onClick={() => setWords(words => [...words, Array(game.fields.length).fill('')])} 
                        className={styles["add-button"]}>
                        <Plus/>
                    </div>
                    <div className={ButtonStyles.buttons}>
                        <div className={ButtonStyles.button}>
                            <Link href='/' passHref>Home page</Link>
                        </div>
                        <button onClick={deleteGame}>Delete game</button>
                        <button onClick={save}>Save</button>
                    </div>
                </div>  
            }
            {game && deleted &&
                <div className={styles.step}>
                    <h1>game deleted</h1>
                    <div className={ButtonStyles.buttons}>
                        <div className={ButtonStyles.button}>
                            <Link href='/' passHref>Home page</Link>
                        </div>
                    </div>
                </div> 
            }
        </div>
    )
}

export default Edit;
