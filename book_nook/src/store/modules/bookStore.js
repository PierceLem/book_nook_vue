import axios from "axios";

export default {
  namespaced: true,

  state: () => ({
    savedBooks: [],
    reviewedBooks: [],
    books: [],
    reviews: {},
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

    SET_USER_BOOKS(state, { reviewedBooks, savedBooks }) {
      state.reviewedBooks = reviewedBooks;
      state.savedBooks = savedBooks;
    },

    APPEND_BOOKS(state, { books, total }) {
      state.books.push(...books);
      state.total = total;
    },

    INCREMENT_OFFSET(state) {
      state.offset += state.limit;
    },

    SET_REVIEWS(state, { bookId, reviews }) {
      state.reviews[bookId] = {
        items: reviews,
        myReview: reviews.find((r) => r.is_owner) || null,
      };
    },

    UPDATE_BOOK(state, { bookId, changes }) {
      const updateBook = (book) => {
        if (book.id === bookId) {
          Object.assign(book, changes);
        }
      };

      state.books.forEach(updateBook);
      state.reviewedBooks.forEach(updateBook);
      state.savedBooks.forEach(updateBook);
    },

    REMOVE_SAVED_BOOK(state, bookId) {
      state.savedBooks = state.savedBooks.filter(
        (book) => book.id !== bookId
      );
    },

    ADD_SAVED_BOOK(state, book) {
      state.savedBooks.push(book);
    },

    REMOVE_REVIEWED_BOOK(state, bookId) {
      state.reviewedBooks = state.reviewedBooks.filter(
        (book) => book.id !== bookId
      );
    },

    ADD_REVIEWED_BOOK(state, book) {
      state.reviewedBooks.push(book);
    },

    UPSERT_REVIEW(state, { review, book }) {
      const bookId = book.id;

      if (!state.reviews[bookId]) {
        state.reviews[bookId] = {
          items: [],
          myReview: null,
        };
      }

      const reviews = state.reviews[bookId].items;
      const index = reviews.findIndex((r) => r.is_owner);

      if (index !== -1) {
        reviews.splice(index, 1, review);
      } else {
        reviews.unshift(review);
      }

      state.reviews[bookId].myReview = review;
    },

    REMOVE_REVIEW(state, { reviewId, bookId }) {
      const bookReviews = state.reviews[bookId];

      if (!bookReviews) {
        return;
      }

      bookReviews.items = bookReviews.items.filter(
        (review) => review.id !== reviewId
      );

      bookReviews.myReview = null;
    },

    CLEAR_REVIEWS(state, bookId) {
      delete state.reviews[bookId];
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

    async saveBook({ commit }, { book }) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("User is not authenticated. No token found.");
        }

        const response = await axios.post(
          "/toggle-save-book/",
          {
            book_data: {
              title: book.title,
              id: book.id,
            },
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const updatedBook = {
          ...book,
          is_saved: response.data.is_saved,
        };

        commit("UPDATE_BOOK", {
          bookId: book.id,
          changes: {
            is_saved: response.data.is_saved,
          },
        });

        if (response.data.is_saved) {
          commit("ADD_SAVED_BOOK", updatedBook);
        } else {
          commit("REMOVE_SAVED_BOOK", book.id);
        }
      } catch (error) {
        console.error("Error saving/unsaving book:", error);
        throw error;
      }
    },

    async fetchReviews({ commit }, bookId) {
      try {
        const response = await axios.get(
          `/reviews/${bookId}`
        );

        commit("SET_REVIEWS", {
          bookId,
          reviews: response.data,
        });
      } catch (error) {
        console.error(
          "Error fetching reviews:",
          error
        );

        commit("SET_REVIEWS", {
          bookId,
          reviews: [],
        });

        throw error;
      }
    },

    async submitReview({ commit }, { book, review, rating }) {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      const response = await axios.post(
        "/review-options/",
        {
          book_data: {
            title: book.title,
            id: book.id,
          },
          review,
          rating: Math.round(rating * 2),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      commit("UPSERT_REVIEW", {
        review: response.data.review,
        book,
      });

      commit("ADD_REVIEWED_BOOK", {
        ...book,
        average_rating: response.data.average_rating,
        review_count: response.data.review_count,
      });

      commit("UPDATE_BOOK", {
        bookId: book.id,
        changes: {
          average_rating: response.data.average_rating,
          review_count: response.data.review_count,
        },
      });
    },

    async deleteReview({ commit }, { reviewId, bookId }) {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not authenticated. No token found.");
      }

      const response = await axios.delete(
        "/review-options/",
        {
          data: { id: reviewId },
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      commit("REMOVE_REVIEW", {
        reviewId,
        bookId,
      });

      commit("REMOVE_REVIEWED_BOOK", bookId);

      commit("UPDATE_BOOK", {
        bookId,
        changes: {
          average_rating: response.data.average_rating,
          review_count: response.data.review_count,
        },
      });
    },

    async fetchUserBooks({ commit }) {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "User is not authenticated. No token found."
          );
        }

        const response = await axios.get(
          "/bookshelf/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        commit("SET_USER_BOOKS", {
          reviewedBooks:
            response.data.reviewed_books,
          savedBooks:
            response.data.saved_books,
        });
      } catch (err) {
        this.error = "Failed to fetch books.";
      } finally {
        this.loading = false;
      }
    },
  },
};
