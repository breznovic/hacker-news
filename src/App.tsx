import s from "./App.module.css";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import { useEffect } from "react";
import { fetchNews } from "./store/features/news/newsSlice";

function App() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fetchNews());
    const interval = setInterval(() => {
      dispatch(fetchNews());
    }, 60000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <h1>Hacker News</h1>
      <div>
        {news.map((n) => (
          <div key={n.id}>{n.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
