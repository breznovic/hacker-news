import List from "@mui/material/List";
import NewsItem from "./NewsItem";
import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchNews } from "../store/features/news/newsSlice";
import Box from "@mui/material/Box";

export default function NewsList() {
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
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: 3,
        width: "100%",
        minWidth: "600px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <List
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {news.map((n) => (
          <React.Fragment key={n.id}>
            <NewsItem news={n} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
