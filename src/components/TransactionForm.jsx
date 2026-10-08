import { useState } from 'react'
import Field from './Field'
import { validateTransaction } from '../utils/validation'

const empty = { bookId: '', type: 'add', quantity: '', member: '' }

export default function TransactionForm({ books, users, onSubmit }) {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateTransaction(values, books)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({
      bookId: Number(values.bookId),
      type: values.type,
      quantity: Number(values.quantity),
      member: values.type === 'borrow' ? values.member : '',
    })
    setValues({ ...empty, type: values.type })
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Record Transaction</h3>
      <Field label="Book" error={errors.bookId}>
        <select name="bookId" value={values.bookId} onChange={handleChange}>
          <option value="">-- Select a book --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} (in stock: {b.quantity})
            </option>
          ))}
        </select>
      </Field>
      <Field label="Type">
        <select name="type" value={values.type} onChange={handleChange}>
          <option value="add">Add stock (new books arrived)</option>
          <option value="borrow">Deduct stock (book borrowed)</option>
        </select>
      </Field>
      {values.type === 'borrow' && (
        <Field label="Member" error={errors.member}>
          <select name="member" value={values.member} onChange={handleChange}>
            <option value="">-- Select a member --</option>
            {users.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name} ({u.membershipId})
              </option>
            ))}
          </select>
        </Field>
      )}
      <Field label="Quantity" error={errors.quantity}>
        <input name="quantity" type="number" min="1" value={values.quantity} onChange={handleChange} />
      </Field>
      <button type="submit">Record</button>
    </form>
  )
}
