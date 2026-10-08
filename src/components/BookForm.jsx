import { useState } from 'react'
import Field from './Field'
import { validateBook } from '../utils/validation'

const empty = { title: '', author: '', genre: '', isbn: '', quantity: '' }

// Used for both adding (no `initial`) and updating (with `initial`)
export default function BookForm({ initial, books, onSubmit, onCancel }) {
  const [values, setValues] = useState(initial ?? empty)
  const [errors, setErrors] = useState({})
  const editing = Boolean(initial)

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validateBook(values, books, initial?.id)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    onSubmit({
      title: values.title.trim(),
      author: values.author.trim(),
      genre: values.genre.trim(),
      isbn: values.isbn.trim(),
      quantity: Number(values.quantity),
    })
    if (!editing) setValues(empty)
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>{editing ? 'Update Book' : 'Add New Book'}</h3>
      <Field label="Title" error={errors.title}>
        <input name="title" value={values.title} onChange={handleChange} />
      </Field>
      <Field label="Author" error={errors.author}>
        <input name="author" value={values.author} onChange={handleChange} />
      </Field>
      <Field label="Genre" error={errors.genre}>
        <input name="genre" value={values.genre} onChange={handleChange} />
      </Field>
      <Field label="ISBN" error={errors.isbn}>
        <input name="isbn" value={values.isbn} onChange={handleChange} />
      </Field>
      <Field label={editing ? 'Quantity' : 'Initial Quantity'} error={errors.quantity}>
        <input name="quantity" type="number" min="0" value={values.quantity} onChange={handleChange} />
      </Field>
      <div className="actions">
        <button type="submit">{editing ? 'Save Changes' : 'Add Book'}</button>
        {editing && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
