interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number
}

const exerciseCalculator = (dailyExercise: number[], goal: number): Result => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter(e => e > 0).length;
  const average = dailyExercise.reduce((a,b) => a+b) / dailyExercise.length;
  const success = average >= goal ? true : false;
  let rating, ratingDescription
  if (success) {
    rating = 3
    ratingDescription = 'well done!'
  } else {
    if (trainingDays >= 4) {
      rating = 2
      ratingDescription = 'not too bad but could be better'
    } else {
      rating = 1
      ratingDescription = 'keep trying!'
    }
  }
  const target = goal;


  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average 
  }
}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))