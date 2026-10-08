import { useEffect } from 'react'
import TransactionForm from '../components/TransactionForm'

export default function Transactions({ books, setBooks, users, transactions, setTransactions }) {
  useEffect(() => {
    document.title = 'Transactions | Community Library'
  }, [])

  const record = ({ bookId, type, quantity, member }) => {
    const book = books.find((b) => b.id === bookId)
    const change = type === 'add' ? quantity : -quantity

    // update stock
    setBooks(books.map((b) => (b.id === bookId ? { ...b, quantity: b.quantity + change } : b)))

    // add to history log
    setTransactions([
      {
        id: Date.now(),
        date: new Date().toLocaleString(),
        bookTitle: book.title,
        type,
        quantity,
        member,
      },
      ...transactions,
    ])
  }

  return (
    <div>
      <h2>Transactions</h2>
      <TransactionForm books={books} users={users} onSubmit={record} />

      <h3>History</h3>
      <table>
        <thead>
          <tr><th>Date</th><th>Book</th><th>Type</th><th>Qty</th><th>Member</th></tr>
        </thead>
        <tbody>
          {transactions.length === 0 && <tr><td colSpan="5">No transactions yet.</td></tr>}
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.bookTitle}</td>
              <td>{t.type === 'add' ? 'Stock added' : 'Borrowed'}</td>
              <td>{t.type === 'add' ? `+${t.quantity}` : `-${t.quantity}`}</td>
              <td>{t.member || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
