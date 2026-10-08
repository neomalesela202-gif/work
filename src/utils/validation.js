const cleanIsbn = (isbn) => isbn.replace(/[-\s]/g, '')

export function validateBook(v, books, editingId) {
  const e = {}
  if (!v.title.trim()) e.title = 'Title is required'
  if (!v.author.trim()) e.author = 'Author is required'
  if (!v.genre.trim()) e.genre = 'Genre is required'

  const isbn = cleanIsbn(v.isbn)
  if (!isbn) e.isbn = 'ISBN is required'
  else if (!/^(\d{10}|\d{13})$/.test(isbn)) e.isbn = 'ISBN must be 10 or 13 digits'
  else if (books.some((b) => b.id !== editingId && cleanIsbn(b.isbn) === isbn))
    e.isbn = 'A book with this ISBN already exists'

  const qty = Number(v.quantity)
  if (v.quantity === '' || !Number.isInteger(qty) || qty < 0)
    e.quantity = 'Quantity must be a whole number (0 or more)'
  return e
}

export function validateUser(v, users, editingId) {
  const e = {}
  if (!v.name.trim()) e.name = 'Name is required'
  const mid = v.membershipId.trim().toLowerCase()
  if (!mid) e.membershipId = 'Membership ID is required'
  else if (users.some((u) => u.id !== editingId && u.membershipId.toLowerCase() === mid))
    e.membershipId = 'This membership ID is already in use'
  if (!['admin', 'librarian', 'member'].includes(v.role)) e.role = 'Choose a role'
  return e
}

export function validateTransaction(v, books) {
  const e = {}
  const book = books.find((b) => b.id === Number(v.bookId))
  const qty = Number(v.quantity)
  if (!book) e.bookId = 'Select a book'
  if (v.quantity === '' || !Number.isInteger(qty) || qty < 1)
    e.quantity = 'Quantity must be a whole number of 1 or more'
  else if (book && v.type === 'borrow' && qty > book.quantity)
    e.quantity = `Only ${book.quantity} in stock`
  if (v.type === 'borrow' && !v.member) e.member = 'Select the member borrowing'
  return e
}
