import { NavLink } from 'react-router-dom'

export default function Navbar({ currentUser, onLogout }) {
  const staff = currentUser && currentUser.role !== 'member'
  return (
    <nav className="navbar">
      <h1>Community Library</h1>
      <div className="links">
        {currentUser && <NavLink to="/">Dashboard</NavLink>}
        {staff && <NavLink to="/books">Books</NavLink>}
        {staff && <NavLink to="/transactions">Transactions</NavLink>}
        <NavLink to="/users">{currentUser ? 'Users' : 'Login'}</NavLink>
      </div>
      {currentUser && (
        <div className="who">
          {currentUser.name} ({currentUser.role})
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}
