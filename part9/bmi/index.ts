import express from 'express'
const app = express()

app.use('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})