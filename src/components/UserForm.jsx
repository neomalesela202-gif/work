import { useState } from 'react'
import Field from './Field'
import { validateUser } from '../utils/validation'

const empty = { name: '', membershipId: '', role: 'member' }

export default function UserForm({ initial, users, onSubmit, onCancel }) {
  const [values, setValues] = useState(initial ?? empty)
  const [errors, setErrors] = useState({})
  const editing = Boolean(initial)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateUser(values, users, initial?.id)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({ name: values.name.trim(), membershipId: values.membershipId.trim(), role: values.role })
    if (!editing) setValues(empty)
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>{editing ? 'Update User' : 'Add New User'}</h3>
      <Field label="Name" error={errors.name}>
        <input name="name" value={values.name} onChange={handleChange} />
      </Field>
      <Field label="Membership ID" error={errors.membershipId}>
        <input name="membershipId" value={values.membershipId} onChange={handleChange} />
      </Field>
      <Field label="Role" error={errors.role}>
        <select name="role" value={values.role} onChange={handleChange}>
          <option value="member">Member</option>
          <option value="librarian">Librarian</option>
          <option value="admin">Admin</option>
        </select>
      </Field>
      <div className="actions">
        <button type="submit">{editing ? 'Save Changes' : 'Add User'}</button>
        {editing && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
