import { Female, Male, Transgender } from "@mui/icons-material";
import { Patient } from "../../types";

const PatientPage = ({ patient }: { patient: Patient | null | undefined }) => {
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
        <>
          {e.date} <em>{e.description}</em>
          <ul>
            {e.diagnosisCodes?.map(d => (
              <li>{d}</li>
            ))}
          </ul>
        </>
      ))}
    </div>
  );
};

export default PatientPage;