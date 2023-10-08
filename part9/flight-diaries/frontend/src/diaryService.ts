import axios from 'axios'
import { NewDiaryEntry } from './types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

export const createNewDiary = (object: NewDiaryEntry) => {
  return axios
    .post(baseUrl, object)
    .then(response => response.data)
}
