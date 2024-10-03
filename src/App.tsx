import s from "./App.module.css";
import NewsList from "./components/NewsList";

function App() {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <img src="/hackerLogo.jpg" alt="hacker" className={s.logo}/>
        <h1>Hacker News</h1>
      </div>
      <NewsList />
    </div>
  );
}

export default App;
