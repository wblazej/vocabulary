import { useState } from "react";
import Storage from './../ts/storage';
import './../styles/home.scss';
import { Link } from 'react-router-dom';
import GameController from "../icons/GameControlelr";
import IGame from "../typing/game";
import toast from "react-hot-toast";
import { safeBase64Encode } from './../ts/base64';

const Home = () => {
    const [storage] = useState(new Storage())
    const [games] = useState(storage.getGames())
    
    const copyShareLink = (game: IGame) => {
        let url = new URL(window.location.href);

        const encodedGame = safeBase64Encode(JSON.stringify({
            name: game.name,
            fields: game.fields,
            words: game.words
        }));

        navigator.clipboard.writeText(`${url.host}/share/${encodedGame}`);

        toast.success("Copied sharing link!");
    }

    return (
        <div className="home-page-container">
            <h1>learn vocabulary</h1>
            <div className="games">
                {games.map((game, i) => (
                    <div className="game" key={i}>
                        <span className="name">{game.name}</span>
                        <div className="icon">
                            <GameController/>
                        </div>
                        <div className="buttons">
                            <Link to={`game/${game.id}`} className="button">Play</Link>
                            <Link to={`edit/${game.id}`} className="button">Edit</Link>
                            <button onClick={() => copyShareLink(game)}>Share</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="buttons">
                <Link className="button" to="create">Create new game</Link>
            </div>
        </div>
    )
}

export default Home;
