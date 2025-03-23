import React, { useEffect, useState } from 'react';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simuler une requête API pour récupérer les livres
    const fakeBooks = [
      { id: 1, title: 'Livre 1', author: 'Auteur 1', cover: 'https://via.placeholder.com/150' },
      { id: 2, title: 'Livre 2', author: 'Auteur 2', cover: 'https://via.placeholder.com/150' },
      { id: 3, title: 'Livre 3', author: 'Auteur 3', cover: 'https://via.placeholder.com/150' },
    ];
    setBooks(fakeBooks);
  }, []);

  return (
    <div className="App">
      <h1 className="text-center my-4">Bibliothèque Intelligente</h1>
      <BookList books={books} />
    </div>
  );
}

export default App;