import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function UserCard() {
  const classes = useStyles();

  return (
    <Card className={[classes.root, classes.flexCenter]}>
      <CardContent className={classes.flexCenter}>
        <img className={classes.profileImage} src="https://t3.ftcdn.net/jpg/02/26/33/90/360_F_226339055_JpvadLUXEq4VnymA195aQlrvSQVAq3rz.jpg" alt=""/>
        <Typography variant="h5" component="h2" className={classes.username}>
          @israelalagbe
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">View Profile</Button>
      </CardActions>
    </Card>
  );
}


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  username: {
    margin: 0
  },
  profileImage: {
    width: "7rem",
    height: "7rem",
    borderRadius: "50%"
  }
});