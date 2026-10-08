import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import UserForm from '../components/UserForm'

export default function Users({ users, setUsers, currentUser, setCurrentUser }) {
  const [editing, setEditing] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Users | Community Library'
  }, [])

  // returns an error message, or nothing on success
  const login = ({ name, membershipId }) => {
    const user = users.find(
      (u) =>
        u.membershipId.toLowerCase() === membershipId.trim().toLowerCase() &&
        u.name.toLowerCase() === name.trim().toLowerCase(),
    )
    if (!user) return 'Invalid name or membership ID'
    setCurrentUser(user)
    navigate('/')
  }

  const addUser = (data) => setUsers([...users, { ...data, id: Date.now() }])

  const updateUser = (data) => {
    const updated = { ...editing, ...data }
    setUsers(users.map((u) => (u.id === editing.id ? updated : u)))
    if (currentUser.id === editing.id) setCurrentUser(updated)
    setEditing(null)
  }

  const deleteUser = (id) => {
    if (id === currentUser.id) return alert('You cannot delete the account you are logged in with.')
    if (!window.confirm('Delete this user?')) return
    setUsers(users.filter((u) => u.id !== id))
    if (editing?.id === id) setEditing(null)
  }

  if (!currentUser) {
    return (
      <div>
        <h2>User Login</h2>
        <LoginForm onLogin={login} />
      </div>
    )
  }

  if (currentUser.role !== 'admin') {
    return (
      <div>
        <h2>User Management</h2>
        <p>
          Logged in as <b>{currentUser.name}</b> ({currentUser.role}). Only admins can manage users.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2>User Management</h2>
      <UserForm
        key={editing?.id ?? 'new'}
        initial={editing}
        users={users}
        onSubmit={editing ? updateUser : addUser}
        onCancel={() => setEditing(null)}
      />

      <table>
        <thead>
          <tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.membershipId}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => setEditing(u)}>Update</button>{' '}
                <button className="danger" onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
