import { useState } from 'react'
import { createNewDiary } from '../diaryService'
import { DiaryEntry, Visibility, Weather } from '../types'

const NewEntry = ({ diaries, setDiaries }: { 
    diaries: DiaryEntry[]
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>}) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('' as Weather)
  const [visibility, setVisibility] = useState<Visibility>('' as Visibility)
  const [comment, setComment] = useState('')  


  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNewDiary({ date, weather, visibility, comment})
    .then( data => {
      setDiaries(diaries.concat(data))
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date: <input 
            value={date}
            onChange={({target}) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: <input 
            value={visibility}
            onChange={({target}) => setVisibility(target.value as Visibility)}
          />
        </div>
        <div>
          weather: <input 
            value={weather}
            onChange={({target}) => setWeather(target.value as Weather)}
          />
        </div>
        <div>
          comment: <input 
            value={comment}
            onChange={({target}) => setComment(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default NewEntry