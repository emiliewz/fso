import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Diagnosis } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  diagnoses: Diagnosis[]
  diagnosisCodes: string[]
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>,
}

const DiagnosesSelect = ({ diagnoses, diagnosisCodes, setDiagnosisCodes }: Props) => {
  // const [diagnosisCodes, setCodes] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  if (!diagnoses) return null;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={handleChange}
          input={<OutlinedInput label='Diagnosis codes' />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.name} value={d.code}>
              <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
              <ListItemText primary={d.code} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DiagnosesSelect;