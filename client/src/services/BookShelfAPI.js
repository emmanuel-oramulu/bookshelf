import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


class BookShelfAPI {
  async register (username, email, password) {
    const res = await api.post('/auth/register', {
      username, email, password
    });

    return res.data.data;
  }

  async login (email, password) {
    const res = await api.post('/auth/login', {
      email, password
    });

    return res.data.data;
  }

  async getBooks () {
    const res = await api.get('/books');

    return res.data.data;
  }

  async addBook (bookData) {
    const res = await api.post('/books', bookData);

    return res.data.data;
  }

  async updateBook (id, bookData) {
    const res = await api.put(`/books/${id}`, bookData);

    return res.data.data;
  }

  async deleteBook (id) {
    const res = await api.delete(`/books/${id}`);

    return res.data.data;
  }
}

export default new BookShelfAPI();