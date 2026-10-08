import { useState } from 'react'
import Field from './Field'

export default function LoginForm({ onLogin }) {
  const [values, setValues] = useState({ name: '', membershipId: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.name.trim() || !values.membershipId.trim()) {
      setError('Please enter your name and membership ID')
      return
    }
    setError(onLogin(values) ?? '')
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Login</h3>
      <Field label="Name">
        <input name="name" value={values.name} onChange={handleChange} />
      </Field>
      <Field label="Membership ID">
        <input name="membershipId" value={values.membershipId} onChange={handleChange} />
      </Field>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
      <p className="hint">Default admin: name <b>Admin</b>, membership ID <b>ADMIN001</b></p>
    </form>
  )
}
