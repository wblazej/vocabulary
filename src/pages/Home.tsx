import { useState } from "react";
import Storage from './../ts/storage';
import './../styles/home.scss';
import { Link } from 'react-router-dom';
import GameController from "../icons/GameControlelr";

const Home = () => {
    const [storage] = useState(new Storage())
    const [games] = useState(storage.getGames())

    return (
        <div className="home-page-container">
            <h1>learn vocabulary</h1>
            <div className="games">
                {Object.keys(games).map((gameID, i) => (
                    <div className="game" key={i}>
                        <span className="name">{games[gameID].name}</span>
                        <div className="icon">
                            <GameController/>
                        </div>
                        <div className="buttons">
                            <Link to={`game/${gameID}`} className="button">Play</Link>
                            <button>Edit</button>
                            <button>Share</button>
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
