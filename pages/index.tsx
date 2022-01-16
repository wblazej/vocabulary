import { useState } from "react";
import Storage from '../ts/storage';
import styles from '../styles/Home.module.scss';
import buttonStyles from '../styles/Buttons.module.scss';
import GameController from "../icons/GameController";
import type { NextPage } from "next";
import Link from "next/link";
import classNames from "classnames";

const Home: NextPage = () => {
    const [ storage ] = useState(new Storage())
    const [ games ] = useState(storage.getGames())

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
                        <Link href={`/game/${game.id}`} passHref>
                            <div className={buttonStyles.button}>
                                Play
                            </div>
                        </Link>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    )
}

export default Home;
