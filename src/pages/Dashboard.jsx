import { useEffect } from 'react'

const LOW_STOCK = 2

export default function Dashboard({ books }) {
  useEffect(() => {
    document.title = 'Dashboard | Community Library'
  }, [])

  const totalCopies = books.reduce((sum, b) => sum + b.quantity, 0)
  const lowCount = books.filter((b) => b.quantity < LOW_STOCK).length

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="card stat"><strong>{books.length}</strong> Titles</div>
        <div className="card stat"><strong>{totalCopies}</strong> Total copies</div>
        <div className="card stat"><strong>{lowCount}</strong> Low stock</div>
      </div>

      <table>
        <thead>
          <tr><th>Title</th><th>Author</th><th>Genre</th><th>Available</th><th>Status</th></tr>
        </thead>
        <tbody>
          {books.length === 0 && <tr><td colSpan="5">No books yet.</td></tr>}
          {books.map((b) => (
            <tr key={b.id} className={b.quantity < LOW_STOCK ? 'low' : ''}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genre}</td>
              <td>{b.quantity}</td>
              <td>{b.quantity === 0 ? 'Out of stock' : b.quantity < LOW_STOCK ? 'Low stock' : 'In stock'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
