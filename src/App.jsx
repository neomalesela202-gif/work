import { Routes, Route, Navigate } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Transactions from './pages/Transactions'
import Users from './pages/Users'

const seedUsers = [{ id: 1, name: 'Admin', membershipId: 'ADMIN001', role: 'admin' }]

const seedBooks = [
  { id: 101, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Classic', isbn: '9780141439518', quantity: 5 },
  { id: 102, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', isbn: '9780743273565', quantity: 1 },
  { id: 103, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', isbn: '9780061120084', quantity: 3 },
]

export default function App() {
  // All data lives in localStorage via our custom hook
  const [books, setBooks] = useLocalStorage('lib_books', seedBooks)
  const [users, setUsers] = useLocalStorage('lib_users', seedUsers)
  const [transactions, setTransactions] = useLocalStorage('lib_transactions', [])
  const [currentUser, setCurrentUser] = useLocalStorage('lib_currentUser', null)

  const loggedIn = Boolean(currentUser)
  const staff = loggedIn && currentUser.role !== 'member'

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
      <main className="container">
        <Routes>
          <Route path="/" element={loggedIn ? <Dashboard books={books} /> : <Navigate to="/users" replace />} />
          <Route
            path="/books"
            element={staff ? <Books books={books} setBooks={setBooks} /> : <Navigate to="/users" replace />}
          />
          <Route
            path="/transactions"
            element={
              staff ? (
                <Transactions
                  books={books}
                  setBooks={setBooks}
                  users={users}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              ) : (
                <Navigate to="/users" replace />
              )
            }
          />
          <Route
            path="/users"
            element={
              <Users users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser} />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
