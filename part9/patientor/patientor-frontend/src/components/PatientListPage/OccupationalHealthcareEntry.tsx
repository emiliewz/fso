import WorkIcon from '@mui/icons-material/Work';
import { occupationalHealthcareEntry } from '../../types';
import { Card, CardContent, Box, Typography } from '@mui/material';

const OccupationalHealthcareEntry = ({ entry }: {entry: occupationalHealthcareEntry}) => (
    <Box sx={[{ minWidth: 275 }, { mb: 1.5 }]}>
      <Card variant='outlined' >
        <CardContent>
          <Typography>
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography>
            <em>{entry.description}</em>
          </Typography>
          {entry.sickLeave 
            ? <Typography>
                SickLeave: From {entry.sickLeave?.startDate} to {entry.sickLeave?.endDate}
              </Typography>
            : null
          }
          <Typography>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );

export default OccupationalHealthcareEntry;