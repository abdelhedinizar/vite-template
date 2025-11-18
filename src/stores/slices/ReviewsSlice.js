import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Shape:
 * state.reviews = {
 *   status: 'idle' | 'loading' | 'succeeded' | 'failed',
 *   error: null|string,
 *   byDish: {
 *     [dishId]: {
 *        reviews: [ { _id, user{...}, comment, commentsCount, createdAt, media, rating } ],
 *        lastFetched: number
 *     }
 *   }
 * }
 */

export const fetchGroupedReviews = createAsyncThunk(
  'reviews/fetchGrouped',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/reviews/grouped`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Expect res.data.data.categories[]
      const categories = res.data?.data?.categories || [];
      const byDish = {};

      categories.forEach(cat => {
        cat.dishes?.forEach(dish => {
          const dishId = dish.id || dish._id;
            byDish[dishId] = {
              reviews: (dish.reviews || []).map(r => ({
                _id: r._id,
                dish: dishId,
                user: r.user,
                comment: r.comment,
                commentsCount: r.commentsCount,
                createdAt: r.createdAt,
                media: r.media,
                rating: r.rating
              })),
              lastFetched: Date.now()
            };
        });
      });

      return byDish;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch grouped reviews');
    }
  }
);

// Upsert a single review after createOrUpdate
export const upsertReview = createAsyncThunk(
  'reviews/upsertReview',
  async ({ dishId, rating, comment, media }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      const payload = { dish: dishId, rating, comment };
      // If you support media multipart adapt here (kept simple JSON)
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/reviews`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const review = res.data?.data?.review;
      return { dishId, review };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to upsert review');
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    status: 'idle',
    error: null,
    byDish: {}
  },
  reducers: {
    // Optimistic insert of a temp review
    addLocalReview: (state, action) => {
      const { dishId, tempId, review } = action.payload;
      if (!state.byDish[dishId]) {
        state.byDish[dishId] = { reviews: [], lastFetched: Date.now() };
      }
      state.byDish[dishId].reviews.unshift({ ...review, _id: tempId, optimistic: true });
    },
    // Replace temp review with real one
    replaceLocalReview: (state, action) => {
      const { dishId, tempId, realReview } = action.payload;
      const list = state.byDish[dishId]?.reviews;
      if (!list) return;
      const idx = list.findIndex(r => r._id === tempId);
      if (idx >= 0) {
        list[idx] = realReview;
      } else {
        list.unshift(realReview);
      }
    },
    // Remove temp review on failure
    removeLocalReview: (state, action) => {
      const { dishId, tempId } = action.payload;
      const list = state.byDish[dishId]?.reviews;
      if (!list) return;
      state.byDish[dishId].reviews = list.filter(r => r._id !== tempId);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGroupedReviews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGroupedReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Merge (replace per dish)
        state.byDish = { ...state.byDish, ...action.payload };
      })
      .addCase(fetchGroupedReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(upsertReview.fulfilled, (state, action) => {
        // Note: We don't add the review here because it's handled by replaceLocalReview
        // in the optimistic update flow. This case is kept for non-optimistic scenarios.
      })
      .addCase(upsertReview.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export default reviewsSlice.reducer;
export const { addLocalReview, replaceLocalReview, removeLocalReview } = reviewsSlice.actions;

/* ---------------- Selectors ---------------- */

const selectReviewsState = (state) => state.reviews;

// All reviews flattened
export const selectAllReviews = createSelector(
  selectReviewsState,
  (reviewsState) =>
    Object.values(reviewsState.byDish).flatMap(entry => entry.reviews)
);

// Reviews for a specific dish
export const makeSelectReviewsByDish = (dishId) => createSelector(
  selectReviewsState,
  (reviewsState) => reviewsState.byDish[dishId]?.reviews || []
);

// Review count by dish (number of review documents)
export const makeSelectReviewCountByDish = (dishId) => createSelector(
  selectReviewsState,
  (reviewsState) => reviewsState.byDish[dishId]?.reviews.length || 0
);

// Sum of commentsCount field across reviews of a dish (if you treat nested replies separately)
export const makeSelectCommentsCountAggregateByDish = (dishId) => createSelector(
  selectReviewsState,
  (reviewsState) =>
    (reviewsState.byDish[dishId]?.reviews || [])
      .reduce((sum, r) => sum + (r.commentsCount || 0), 0)
);

// Average rating for a dish
export const makeSelectAverageRatingByDish = (dishId) => createSelector(
  selectReviewsState,
  (reviewsState) => {
    const list = reviewsState.byDish[dishId]?.reviews || [];
    if (!list.length) return 0;
    return +(list.reduce((s, r) => s + (r.rating || 0), 0) / list.length).toFixed(2);
  }
);