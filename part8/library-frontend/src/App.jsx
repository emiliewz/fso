import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <div className='container'>
      <Link className='p-2 ps-0 text-decoration-none' to='/'>authors</Link>
      <Link className='p-2 text-decoration-none' to='/books'>books</Link>
      <Link className='p-2 text-decoration-none' to='/create'>add book</Link>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/create' element={<NewBook />} />
      </Routes>

    </div>
  )
}

export default App