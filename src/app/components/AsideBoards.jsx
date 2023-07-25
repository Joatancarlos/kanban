import styles from '../page.module.css';
import Boards from './BoardFile';

const AsideBoards = () => {
  return (
  <>
    <div className={styles.asideBoards}>
      <Boards title="Platform Launch"/>
      <h4>
        +Create New Board
      </h4>
    </div>
  </>
  )
};

export default AsideBoards;