import { isNotNumber } from './utils';

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string
  target: number,
  average: number
}

interface BmiExerciseData {
  value1: number[],
  value2: number
}

const parseArguments2 = (args: string[]): BmiExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 10) throw new Error('Too many arguments')
  if (args.slice(2).filter(e => isNotNumber(e)).length === 0) {
    return {
      value1: args.slice(3).map(e => Number(e)),
      value2: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const exerciseCalculator = (dailyExercise: number[], goal: number): Result => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter(e => e > 0).length;
  const average = dailyExercise.reduce((a,b) => a+b) / dailyExercise.length;
  const success = average >= goal ? true : false;
  let rating, ratingDescription;
  if (success) {
    rating = 3;
    ratingDescription = 'well done!';
  } else {
    if (trainingDays >= trainingDays / 2 && average >= goal / 2) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    } else {
      rating = 1;
      ratingDescription = 'bad';
    }
  }
  const target = goal;

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average 
  };
};

try {
  const {value1, value2} = parseArguments2(process.argv);
  console.log(exerciseCalculator(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}