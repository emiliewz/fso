import { hospitalEntry } from '../../types';
import { Card, CardContent, Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


const HospitalEntry = ({ entry }: {entry: hospitalEntry}) => {
  return (
    <Box sx={[{ minWidth: 275 }, { mb: 1.5 }]}>
      <Card variant='outlined' >
        <CardContent>
          <Typography>
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography>
            <em>{entry.description}</em>
          </Typography>
          <Typography>
            Distarge: {entry.discharge.criteria} {entry.discharge.date}
          </Typography>
          <Typography>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HospitalEntry;