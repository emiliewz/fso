import diagnoses from '../../data/diagnoses';
import { DisgnosisEntry } from '../../types';

const getEntries = (): DisgnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries
};