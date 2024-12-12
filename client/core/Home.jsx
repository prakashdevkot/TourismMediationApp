import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TourismMediationApp from './../assets/images/TourismMediationApp.jpg';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(5),
    boxShadow: theme.shadows[3],
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  content: {
    padding: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography variant="h5" className={classes.title}>
        Home Page
      </Typography>
      <CardMedia
        className={classes.media}
        image={TourismMediationApp}
        title="Tourism Mediation App"
      />
      <CardContent className={classes.content}>
        <Typography variant="body1" component="p">
          Hi! Welcome to the Tourism Mediation. We are delighted to have you here.
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Tourism Mediation Application
        </Typography>
      </CardContent>
    </Card>
  );
}
