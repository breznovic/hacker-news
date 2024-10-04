import List from "@mui/material/List";
import NewsItem from "./NewsItem";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchNews } from "../store/features/news/newsSlice";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button/Button";

export default function NewsList() {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.news.news);
  const loading = useAppSelector((state) => state.news.loading);

  const fetchData = () => {
    dispatch(fetchNews());
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: 3,
        width: "100%",
        minWidth: "600px",
        minHeight: "872px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "5px",
      }}
    >
      {loading ? (
        <CircularProgress
          sx={{
            marginTop: { xs: "220px", sm: "250px", md: "300px", lg: "380px" },
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={fetchData}
            sx={{ margin: "10px" }}
          >
            Refresh the news feed
          </Button>
          <List
            sx={{
              width: "100%",
              maxWidth: { xs: "400px", sm: "600px" },
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {news.map((n) => (
              <NewsItem key={n.id} news={n} />
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
