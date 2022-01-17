import { useEffect, useState } from "react";
import Storage from "../../ts/storage";
import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage } from "next";

import styles from "../../styles/Create.module.scss";
import ButtonStyles from "../../styles/Buttons.module.scss";

const Show: NextPage = () => {
    const [storage] = useState(new Storage())
    const router = useRouter();
    const { id } = router.query;
    const [game, setGame] = useState(storage.getGame(id as string || ""))
    const [words, setWords] = useState(game ? game.words : [])

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
            {game && 
                <div className={styles.step}>
                    <h1>Showing words from {game.name}</h1>
                    <div className={styles["fields-names"]}>
                            {game.fields.map((field, i) => <div className={styles.name} key={i}>{field}</div>)}
                    </div>
                    <div className={styles.words}>
                        {words.map((_, word_index) => (
                            <div className={styles.word} key={word_index}>
                                {game.fields.map((_, field_index) => <input value={words[word_index][field_index]} readOnly key={field_index} type="text" />)}
                            </div>
                        ))}
                    </div>
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

export default Show;
