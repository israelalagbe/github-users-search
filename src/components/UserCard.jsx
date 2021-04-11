import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";


export default function UserCard({ user, openProfile }) {
  const classes = useStyles();

  return (
    <Card className={`${classes.root} ${classes.flexCenter}`}>
      <CardContent className={classes.flexCenter}>
        <img
          className='profileImage'
          src={user.avatar_url}
          alt=""
        />
        <h2 className={classes.username}>
          @{user.login}
        </h2>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary" onClick={()=> openProfile(user)}>
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  username: {
    margin: 0,
  }
});
