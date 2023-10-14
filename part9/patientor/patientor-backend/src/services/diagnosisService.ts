import diagnoses from '../../data/diagnoses';
import { Disgnosis } from '../types';

const getEntries = (): Disgnosis[] => {
  return diagnoses;
};

export default {
  getEntries
};