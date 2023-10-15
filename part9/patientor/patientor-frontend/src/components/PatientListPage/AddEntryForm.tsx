import { useState } from 'react';
import { Alert, TextField, Button, Grid, Card } from '@mui/material';
import patientService from '../../services/patients';
import { Entry, EntryWithoutId, HealthCheckRating } from '../../types';
import axios from 'axios';

interface Props {
  id : string
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>
}

const AddEntryForm = ({ id, setEntries }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState(['']);
  const [error, setError] = useState('');

  const notifyWith = (e: string) => {
    setError(e);
    setTimeout(()=> setError(''), 3000);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const healthCheckRate = Object.values(HealthCheckRating).find(h => h === Number(healthCheckRating));
    
    const entry: EntryWithoutId = {
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating: healthCheckRate as HealthCheckRating,
      type: 'HealthCheck'
    };
    
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

  return (
    <Card sx={[{ minWidth: 275 }, { mb: 1.5 }]}>
      {error && <Alert severity='error'>{error}</Alert>}
      <h2 style={{marginLeft: 10}}>New HealthCheck entry</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Discription'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label='Date'
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label='Healthcheck rating'
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(target.value)}
        />
        <TextField
          label='Diagnosis codes'
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes([...target.value])}
        />

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