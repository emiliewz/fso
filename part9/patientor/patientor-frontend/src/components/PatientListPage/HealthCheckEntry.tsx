import { healthCheckEntry } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, yellow, orange } from '@mui/material/colors';
import { Card, CardContent, Box, Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const HealthCheckEntry = ({ entry }: {entry: healthCheckEntry}) => {

  const healthCheckRatingIcon = (n: number) => {
    switch (n) {
      case 0:
        return <FavoriteIcon color='success' />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: orange[500] }} />;
      case 3:
        return <FavoriteIcon sx={{ color: red[500] }}/>;
      default:
        return <FavoriteIcon color='disabled'/>;
    }
  };

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
            {healthCheckRatingIcon(entry.healthCheckRating)}
          </Typography>
          <Typography>
            diagnose by {entry.specialist}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthCheckEntry;