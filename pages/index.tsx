import { useState } from "react";
import Storage from '../ts/storage';
import styles from '../styles/Home.module.scss';
import buttonStyles from '../styles/Buttons.module.scss';
import GameController from "../icons/GameController";
import IGame from "../typings/Game";
import toast from "react-hot-toast";
import { safeBase64Encode } from '../ts/base64';
import type { NextPage } from "next";
import Link from "next/link";
import classNames from "classnames";

const Home: NextPage = () => {
    const [ storage ] = useState(new Storage())
    const [ games ] = useState(storage.getGames())
    
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
        <div>
          <h1>learn vocabulary</h1>
          <div className={styles.games}>
              {games.map((game, i) => (
                  <div className={styles.game} key={i}>
                      <span className={styles.name}>{game.name}</span>
                      <div className={styles.icon}>
                          <GameController/>
                      </div>
                      <div className={classNames(styles.buttons, buttonStyles.buttons)}>
                          <div className={buttonStyles.button}>
                            <Link href={`/game/${game.id}`} passHref>Play</Link>
                          </div>
                          <div className={buttonStyles.button}>
                            <Link href={`/edit/${game.id}`} passHref>Edit</Link>
                          </div>
                          <button disabled={!navigator.clipboard} onClick={() => copyShareLink(game)}>Share</button>
                      </div>
                  </div>
              ))}
          </div>

          <div className={buttonStyles.buttons}>
              <div className={buttonStyles.button}>
                <Link href="/create" passHref>Create new game</Link>
              </div>
          </div>
      </div>
    )
}

export default Home;
