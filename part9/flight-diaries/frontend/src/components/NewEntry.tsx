import { useState } from 'react'
import { createNewDiary } from '../diaryService'
import { DiaryEntry, Visibility, Weather } from '../types'
import axios from 'axios'

const NewEntry = ({ diaries, setDiaries, setMsg }: { 
    diaries: DiaryEntry[]
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
    setMsg: React.Dispatch<React.SetStateAction<string>>
  }) => {
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
    .catch(e => {
      let errorMessage = ''
      if (axios.isAxiosError(e)) {
        errorMessage += e.response?.data
      } 
      setMsg(errorMessage)
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>

      <form onSubmit={diaryCreation}>
        <div>
          date: <input 
            type='date'
            value={date}
            onChange={({target}) => setDate(target.value)}
          />
        </div>

        <div>
          visibility: &nbsp; 
          great<input
            type='radio'
            value='great'
            name='visibility'
            onChange={() => setVisibility('great' as Visibility)}
          /> &nbsp; 
          good<input
            type='radio'
            value='good'
            name='visibility'
            onChange={() => setVisibility('good' as Visibility)}
          /> &nbsp; 
          ok<input
            type='radio'
            value='ok'
            name='visibility'
            onChange={() => setVisibility('ok' as Visibility)}
          /> &nbsp; 
          poor<input
            type='radio'
            value='poor'
            name='visibility'
            onChange={() => setVisibility('poor' as Visibility)}
          /> 
        </div>

        <div>
          weather: &nbsp; 
          sunny<input
            type='radio'
            value='sunny'
            name='weather'
            onChange={() => setWeather('sunny' as Weather)}
          /> &nbsp; 
          rainy<input
            type='radio'
            value='rainy'
            name='weather'
            onChange={() => setWeather('rainy' as Weather)}
          /> &nbsp; 
          cloudy<input
            type='radio'
            value='cloudy'
            name='weather'
            onChange={() => setWeather('cloudy' as Weather)}
          /> &nbsp; 
          stormy<input
            type='radio'
            value='stormy'
            name='weather'
            onChange={() => setWeather('stormy' as Weather)}
          /> &nbsp; 
          windy<input
            type='radio'
            value='windy'
            name='weather'
            onChange={() => setWeather('windy' as Weather)}
          />
        </div>

        <div>
          comment: <input 
            type='text'
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