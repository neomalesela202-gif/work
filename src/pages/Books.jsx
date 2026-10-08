import { useState, useEffect } from 'react'
import BookForm from '../components/BookForm'

export default function Books({ books, setBooks }) {
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    document.title = 'Books | Community Library'
  }, [])

  const addBook = (data) => setBooks([...books, { ...data, id: Date.now() }])

  const updateBook = (data) => {
    setBooks(books.map((b) => (b.id === editing.id ? { ...b, ...data } : b)))
    setEditing(null)
  }

  const deleteBook = (id) => {
    if (!window.confirm('Delete this book?')) return
    setBooks(books.filter((b) => b.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  return (
    <div>
      <h2>Book Management</h2>
      {/* key resets the form whenever we switch between add / edit */}
      <BookForm
        key={editing?.id ?? 'new'}
        initial={editing}
        books={books}
        onSubmit={editing ? updateBook : addBook}
        onCancel={() => setEditing(null)}
      />

      <table>
        <thead>
          <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Qty</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {books.length === 0 && <tr><td colSpan="6">No books yet.</td></tr>}
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.isbn}</td>
              <td>{b.quantity}</td>
              <td>
                <button onClick={() => setEditing(b)}>Update</button>{' '}
                <button className="danger" onClick={() => deleteBook(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
