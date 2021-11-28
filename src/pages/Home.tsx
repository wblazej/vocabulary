import { useState } from "react";
import Storage from './../ts/storage';
import VocabularyIcon from './../icons/vocabulary.png';
import './../styles/home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
    const [storage] = useState(new Storage())
    const [games] = useState(storage.getGames())

    return (
        <div className="home-page-container">
            <h1>learn vocabulary</h1>
            <div className="games">
                {Object.keys(games).map((gameID, i) => (
                    <Link to={`game/${gameID}`} className="game" key={i}>
                        <span className="name">{games[gameID].name}</span>
                        <div className="icon">
                            <img src={VocabularyIcon} alt="vocabulary icon" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="buttons">
                <Link className="button" to="create">Create game</Link>
            </div>
        </div>
    )
}

export default Home;
