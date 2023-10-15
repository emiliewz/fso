import { Female, Male, Transgender } from "@mui/icons-material";
import { Diagnosis, Patient } from "../../types";

const PatientPage = ({ patient, diagnoses }: { patient: Patient | null | undefined, diagnoses: Diagnosis[] | undefined }) => {
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

      <h3>entries</h3>
      {patient.entries.map(e => (
        <div key={e.id}>
          {e.date} <em>{e.description}</em>
          <ul>
            {e.diagnosisCodes?.map(d => (
              <li key={`${e.id}${d}`}>{d} {diagnoses?.find(p => p.code === d)?.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;