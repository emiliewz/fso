export const isNotNumber = (argument: unknown): boolean => isNaN(Number(argument));

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight/(height/100)**2;
  if (bmi < 16.0) return 'Underweight (Severe thinness)';
  if (bmi <= 16.9) return 'Underweight (Moderate thinness)';
  if (bmi <= 18.4) return 'Underweight (Mild thinness)';
  if (bmi <= 24.9) return 'Normal (healthy weight)';
  if (bmi <= 29.9) return 'Overweight (Pre-obese)';
  if (bmi <= 39.9) return 'Obese (Class II)';
  return 'Obese (Class III)';
};