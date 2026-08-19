import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    savedBooks: [],
    reviewedBooks: [],
    books: [],
    reviews: [],
    myReview: null,
    query: "",
    filters: [],
    limit: 20,
    offset: 0,
    total: 0,
  }),

  mutations: {
    SET_QUERY(state, query) {
      state.query = query;
    },

    RESET_BOOKS(state) {
      state.books = [];
      state.offset = 0;
      state.total = 0;
    },

    SET_BOOKS(state, { books, total }) {
      state.books = books;
      state.total = total;
    },

    APPEND_BOOKS(state, { books, total }) {
      state.books.push(...books);
      state.total = total;
    },

    INCREMENT_OFFSET(state) {
      state.offset += state.limit;
    },

    TOGGLE_SAVE_BOOK(state, book) {
      const index = state.books.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        state.books[index].is_saved = book.isSaved;
      }
    },

    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
      state.myReview = reviews.find((r) => r.is_owner) || null;
    },

    UPSERT_REVIEW(state, review) {
      const index = state.reviews.findIndex((r) => r.is_owner);
      if (index !== -1) {
        state.reviews.splice(index, 1, review);
      } else {
        state.reviews.unshift(review);
      }
      state.myReview = review;
    },

    REMOVE_REVIEW(state, reviewId) {
      state.reviews = state.reviews.filter((r) => r.id !== reviewId);
      state.myReview = null;
    },
  },

  actions: {
    async filterBooks({ state, commit }, { genres, reset = false }) {
      if (reset || state.query !== genres) {
        commit("SET_QUERY", genres);
        commit("RESET_BOOKS");
      }

      const response = await axios.get("/search-books/", {
        params: {
          tags: genres,
          limit: state.limit,
          offset: state.offset,
        },
      });

      const books = response.data.books;

      if (state.offset === 0) {
        commit("SET_BOOKS", {
          books,
          total: response.data.total || books.length,
        });
      } else {
        commit("APPEND_BOOKS", {
          books,
          total: response.data.total || state.total,
        });
      }

      commit("INCREMENT_OFFSET");
    },

    async searchBooks({ state, commit }, { query, reset = false }) {
      if (reset || query !== state.query) {
        commit("SET_QUERY", query);
        commit("RESET_BOOKS");
      }

      const response = await axios.get("/search-books/", {
        params: {
          q: state.query,
          limit: state.limit,
          offset: state.offset,
        },
      });

      const payload = {
        books: response.data.books,
        total: response.data.total,
      };

      if (state.offset === 0) {
        commit("SET_BOOKS", payload);
      } else {
        commit("APPEND_BOOKS", payload);
      }

      commit("INCREMENT_OFFSET");
    },

    async saveBook({ commit }, { bookId, title }) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.post(
          `/toggle-save-book/`,
          {
            book_data: {
              title: title,
              id: bookId,
            }
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        commit("TOGGLE_SAVE_BOOK", {
          id: bookId,
          isSaved: response.data.is_saved,
        });
      } catch (error) {
        console.error("Error liking/unliking book:", error);
        throw error;
      }
    },

    async fetchReviews({ commit }, bookId) {
      try {
        const response = await axios.get(`/reviews/${bookId}`);
        commit("SET_REVIEWS", response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        commit("SET_REVIEWS", []);
        throw error;
      }
    },

    async submitReview({ commit }, { bookData, review, rating }) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      const response = await axios.post(
        "/review-options/",
        {
          book_data: bookData,
          review: review,
          rating: Math.round(rating * 2),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      commit("UPSERT_REVIEW", response.data);
      return response.data;
    },

    async deleteReview({ commit }, reviewId) {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      await axios.delete("/review-options/", {
        data: { id: reviewId },
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      commit("REMOVE_REVIEW", reviewId);
    },
  },

  getters: {
    hasMore(state) {
      return state.books.length < state.total;
    },

    reviewCount(state) {
      return state.reviews.length;
    },
  },
};