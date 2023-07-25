import styles from '../page.module.css'

export default function Main() {
  return (
    <main className={styles.main}>
        <div className={styles.emptyBoard}>
          <p>This board is empty. Create a new column to get started.</p>
          <button className={styles.btn}>
            + add new column
          </button>
        </div> 
    </main>
  )
}
