import { useState } from 'react';
import { Alert, TextField, Button, Grid, Card, ToggleButtonGroup, ToggleButton, Input } from '@mui/material';
import patientService from '../../services/patients';
import { BaseEntry, Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from '../../types';
import axios from 'axios';
import { assertNever } from './PatientPage';
import DiagnosesSelect from './DiagnosesSelect';

interface Props {
  id : string
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
  diagnoses: Diagnosis[]
}

type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

type Type = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

const AddEntryForm = ({ id, setEntries, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [type, setType] = useState<Type>('HealthCheck');
  const [employee, setEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  

  const notifyWith = (e: string) => {
    setError(e);
    setTimeout(()=> setError(''), 5000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const baseEntry: BaseEntryWithoutId = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };
    
    switch (type) {
      case 'HealthCheck':
        const healthCheckRate = Object.values(HealthCheckRating).find(h => h === Number(healthCheckRating));
        const newHelathCheckEntry: EntryWithoutId = {
          ...baseEntry,
          healthCheckRating: healthCheckRate as HealthCheckRating,
          type: 'HealthCheck',
        };
        createEntry(newHelathCheckEntry);
        break;
      case 'OccupationalHealthcare':
        const newOccupationalHealthcareEntry: EntryWithoutId = {
          ...baseEntry,
          employerName: employee,
          sickLeave: {
            startDate, endDate
          },
          type: 'OccupationalHealthcare',
        };
        createEntry(newOccupationalHealthcareEntry);
        break;
      case 'Hospital':
        const newHospitalEntry: EntryWithoutId = {
          ...baseEntry,
          discharge: {
            date: dischargeDate, criteria: dischargeCriteria
          },
          type: 'Hospital',
        };
        createEntry(newHospitalEntry);
        break ;
      default:
        assertNever(type);
    }
  };

  const createEntry = async (entry: EntryWithoutId) => {
    try {
      const result = await patientService.addEntry(id, entry);
      setEntries(v => v.concat(result));
      console.log(result);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          notifyWith(message);
        } else {
          notifyWith('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        notifyWith('Unknown error');
      }
    }
  };

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    newType: string | null,
  ) => {
    setType(newType as Type);
  };

  return (
    <Card sx={[{ minWidth: 275 }, { mb: 1.5 }]}>
      {error && <Alert severity='error'>{error}</Alert>}
      <h2 style={{marginLeft: 10}}>New HealthCheck entry</h2>
      <form onSubmit={handleSubmit}>
        <ToggleButtonGroup
          color='primary'
          value={type}
          exclusive
          onChange={handleType}
          aria-label='Type'
        >
          <ToggleButton value='HealthCheck'>HealthCheck</ToggleButton>
          <ToggleButton value='OccupationalHealthcare'>OccupationalHealthcare</ToggleButton>
          <ToggleButton value='Hospital'>Hospital</ToggleButton>
        </ToggleButtonGroup>

        <TextField
          label='Discription'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
          Date: <Input
          fullWidth
          value={date}
          type='date'
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {type === 'HealthCheck' && <TextField
          label='Healthcheck rating'
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 0, max: 3 } }}
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />}

        <DiagnosesSelect diagnoses={diagnoses} diagnosisCodes={diagnosisCodes} setDiagnosisCodes={setDiagnosisCodes} />

        {type === 'OccupationalHealthcare' && <>
          <TextField
            label='Employee'
            fullWidth
            value={employee}
            onChange={({ target }) => setEmployee(target.value)}
          />
            SickLeaveStart: <Input
            fullWidth
            value={startDate}
            type='date'
            onChange={({ target }) => setStartDate(target.value)}
          />
            SickLeaveEnd: <Input
            fullWidth
            value={endDate}
            type='date'
            onChange={({ target }) => setEndDate(target.value)}
          />
        </>}

        {type === 'Hospital' && <>
          DischargeDate: <Input
            fullWidth
            value={dischargeDate}
            type='date'
            onChange={({ target }) => setDischargeDate(target.value)}
          />
          <TextField
            label='DischargeCriteria'
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>}

        <Grid>
          <Grid item>
            <Button
              color='error'
              variant='contained'
              style={{ float: 'left' }}
              type='button'
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: 'right',
              }}
              type='submit'
              variant='contained'
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default AddEntryForm;