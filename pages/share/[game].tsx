import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { safeBase64Decode } from '../../ts/base64';
import Storage from '../../ts/storage';

import ButtonStyles from "../../styles/Buttons.module.scss";

const Share = () => {
    const [storage] = useState(new Storage())
    const { game } = useRouter().query;
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (game) {
            const decodedGame = JSON.parse(safeBase64Decode(game as string))

            storage.createGame({
                id: storage.generateUUID(),
                name: decodedGame.name,
                created_at: Date.now(),
                fields: decodedGame.fields,
                words: decodedGame.words
            })

            setDone(true)
        }
    }, [game, storage, setDone])

    return (
        <>
            {done && (
                <>
                    <h1>Game created</h1>
                    <p>Game has been created from a share link. Click the button below to return to the home page</p>
                    <div className={ButtonStyles.buttons}>
                        <div className={ButtonStyles.button}>
                            <Link href='/' passHref>Home page</Link>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Share;
