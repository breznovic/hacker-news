import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment } from "../../../lib/types";

type CommentsState = {
  comments: Comment[];
  loading: boolean;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (commentIds: string[]) => {
    const commentsData = await Promise.all(
      commentIds.map((id) =>
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
      )
    );
    return commentsData.map((item) => item.data);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addNestedComments: (state, action) => {
      const { commentId, nestedComments } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.nested = nestedComments;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addNestedComments } = commentsSlice.actions;
export default commentsSlice.reducer;
