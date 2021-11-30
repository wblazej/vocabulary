import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { safeBase64Decode } from '../ts/base64';
import Storage from '../ts/storage';

const Share = () => {
    const [storage] = useState(new Storage())
    const { game } = useParams()
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (game) {
            const decodedGame = JSON.parse(safeBase64Decode(game))
            console.log(decodedGame.name)

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
                    <div className="buttons">
                        <Link to='/' className="button">Home page</Link>
                    </div>
                </>
            )}
        </>
    )
}

export default Share;
