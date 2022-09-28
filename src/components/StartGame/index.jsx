import styles from "./index.module.css";

const StartGame = ({ setRenderComponent }) => {

  const renderGameComponent = setRenderComponent;

  return (
    <div className={styles.main_container}>
      <div className={styles.title_container}>
        <h2>Secret Word</h2>
      </div>
      <div className={styles.content_container}>
        <label>Clique no botão abaixo para iniciar o jogo</label>
        <button onClick={() => renderGameComponent("Game")}>iniciar Jogo</button>
      </div>
    </div>
  );
}

export default StartGame;