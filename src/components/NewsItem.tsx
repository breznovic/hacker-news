import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NewsItemType } from "../lib/types";
import { Link } from "react-router-dom";

const NewsItem = (props: { news: NewsItemType }) => {
  return (
    <Link to={`/article/${props.news.id}`}>
      <ListItem
        sx={{
          backgroundColor: "#e0e2e0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: 2,
        }}
      >
        <ListItemText
          primary={props.news.title}
          secondary={
            <Typography
              component="div"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <Typography component="div" variant="body2">
                Author: {props.news.by}
              </Typography>
              <div style={{ display: "flex", gap: "10px" }}>
                <Typography component="span" variant="subtitle2">
                  Rating: {props.news.score}
                </Typography>
                <Typography component="span" variant="subtitle2">
                  Posted: {new Date(props.news.time * 1000).toLocaleString()}
                </Typography>
              </div>
            </Typography>
          }
        />
      </ListItem>
    </Link>
  );
};

export default NewsItem;
