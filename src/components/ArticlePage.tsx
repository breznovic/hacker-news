import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Button, CircularProgress, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchNews } from "../store/features/news/newsSlice";
import { fetchComments } from "../store/features/comments/commentsSlice";
import { addNestedComments } from "../store/features/comments/commentsSlice"; // Импортируем действие
import { Comment, NewsItemType } from "../lib/types";
import axios from "axios";

const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const article = useAppSelector((state) =>
    state.news.news.find((item: NewsItemType) => item.id === Number(id))
  );
  const comments = useAppSelector((state) => state.comments.comments);
  const loadingComments = useAppSelector((state) => state.comments.loading);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    if (article && article.kids) {
      dispatch(fetchComments(article.kids));
    }
  }, [article, dispatch]);

  const handleLoadNestedComments = async (comment: Comment) => {
    if (comment.kids && comment.kids.length > 0) {
      const nestedComments = await Promise.all(
        comment.kids.map((id) =>
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
        )
      );

      dispatch(
        addNestedComments({
          commentId: comment.id,
          nestedComments: nestedComments.map((item) => item.data),
        })
      );
    }
  };

  const handleRefreshComments = () => {
    if (article && article.kids) {
      dispatch(fetchComments(article.kids));
    }
  };

  if (!article) return <CircularProgress  sx={{
    marginTop: {
      xs: "50px",
      sm: "150px",
      md: "300px",
      lg: "380px",
    },
  }}/>;

  const renderComments = (commentList: Comment[]) => {
    return commentList.map((comment) => (
      <Box
        key={comment.id}
        sx={{ paddingLeft: "20px", marginBottom: "10px", marginTop: "10px" }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "12px", md: "15px" },
            maxWidth: { xs: "320px", sm: "500px", md: "700px", lg: "800px" },
            textWrap: "wrap",
          }}
        >
          {comment.text}
        </Typography>
        {comment.kids && comment.kids.length > 0 && (
          <Button
            variant="contained"
            onClick={() => handleLoadNestedComments(comment)}
            sx={{ margin: "10px 0px", fontSize: { xs: "10px", sm: "12px" } }}
          >
            Load Replies
          </Button>
        )}
        {comment.nested && comment.nested.length > 0 && (
          <Box sx={{ marginTop: "10px" }}>{renderComments(comment.nested)}</Box>
        )}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "20px",
        padding: { xs: "15px", sm: "20px", md: "30px", lg: "40px" },
        margin: "50px auto",
        textWrap: "nowrap",
        width: "max-content",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontSize: { xs: "12px", sm: "18px", md: "25px" } }}
      >
        {article.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: { xs: "12px", sm: "18px", md: "25px" } }}
      >
        By: {article.by} | {new Date(article.time * 1000).toLocaleString()}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "12px", sm: "18px", md: "25px" },
        }}
      >
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read full article
        </a>
      </Typography>

      {article.kids && (
        <Box>
          <Typography
            variant="h6"
            sx={{ fontSize: { xs: "15px", md: "20px" } }}
          >
            {article.kids.length} Comments
          </Typography>
          <Box sx={{ paddingLeft: "10px" }}>
            {loadingComments ? (
              <CircularProgress
                sx={{
                  marginTop: {
                    xs: "50px",
                    sm: "150px",
                    md: "300px",
                    lg: "380px",
                  },
                }}
              />
            ) : (
              renderComments(comments)
            )}
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleRefreshComments}
          sx={{ fontSize: { xs: "12px", sm: "15px" } }}
        >
          Refresh Comments
        </Button>
        <Link to="/">
          <Button
            variant="contained"
            sx={{ fontSize: { xs: "12px", sm: "15px" } }}
          >
            Back to News List
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ArticlePage;
