import NewEntry from './components/NewEntry'
import Diaries from './components/Diaries'
import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { getAllDiaries } from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      App
      <NewEntry />
      <Diaries diaries={diaries}/>
    </div>
  )
}

export default App