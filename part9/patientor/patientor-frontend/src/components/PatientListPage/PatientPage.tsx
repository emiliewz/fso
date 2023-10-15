import { Female, Male, Transgender } from '@mui/icons-material';
import { Diagnosis, Patient, Entry } from '../../types';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';
import AddEntryForm from './AddEntryForm';
import { useEffect, useState } from 'react';

const PatientPage = ({ patient }: { patient: Patient | null | undefined, diagnoses: Diagnosis[] | undefined }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    if (patient?.entries){
      setEntries(patient.entries);
    }
  }, [patient]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry} key={entry.id}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} key={entry.id}/>;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} key={entry.id}/>;
      default:
        return assertNever(entry);
    }
  };

  if ( !patient ) return null;

  return (
    <div>
      <h2>{patient.name} {
        patient.gender === 'female' 
          ? <Female />
          : patient.gender === 'male' 
          ? <Male />
          : <Transgender />}
      </h2> 
      <p>
        ssh: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>

      <AddEntryForm id={patient.id} setEntries={setEntries}/>

      <h3>entries</h3>
      {/* {patient.entries.map(e => (
        <div key={e.id}>
          {e.date} <em>{e.description}</em>
          <ul>
            {e.diagnosisCodes?.map(d => (
              <li key={`${e.id}${d}`}>{d} {diagnoses?.find(p => p.code === d)?.name}</li>
            ))}
          </ul>
        </div>
      ))} */}
      {entries?.map(entry => EntryDetails({entry}))}
    </div>
  );
};

export default PatientPage;