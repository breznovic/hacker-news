import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewsItemType } from "../../../lib/types";

type NewsState = {
  news: NewsItemType[];
  loading: boolean;
};

const initialState: NewsState = {
  news: [],
  loading: false,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  const newsIds = response.data.slice(0, 100);
  const newsPromises = newsIds.map((id: number) =>
    axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    )
  );
  const news = await Promise.all(newsPromises);
  return news.map((item) => item.data);
});

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default newsSlice.reducer;
