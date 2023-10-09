import NewEntry from './components/NewEntry'
import Diaries from './components/Diaries'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import { DiaryEntry } from './types'
import { getAllDiaries } from './diaryService'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <Notification info={msg} />
      <NewEntry diaries={diaries} setDiaries={setDiaries} setMsg={setMsg}/>
      <Diaries diaries={diaries}/>
    </div>
  )
}

export default App