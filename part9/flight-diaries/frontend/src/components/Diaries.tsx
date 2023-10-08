import { DiaryEntry } from "../types"

const Diaries = ({ diaries }: { diaries: DiaryEntry[]}) => {

  return (
    <div>
      <h2>Diary entries</h2>

      {
        diaries.map(d => (
          <div key={d.id}>
            <h3>{d.date}</h3>
            <p>
              visibility: {d.visibility}
              <br />
              weather: {d.weather}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Diaries