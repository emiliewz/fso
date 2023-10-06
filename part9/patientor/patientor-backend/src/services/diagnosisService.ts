import diagnoses from '../../data/diagnoses';
import { Disgnosis } from '../../types';

const getDiagnosis = (): Disgnosis[] => {
  return diagnoses;
};

export default {
  getDiagnosis
};