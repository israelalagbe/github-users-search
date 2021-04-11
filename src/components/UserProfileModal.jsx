import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/actions/users";
import { Button } from "@material-ui/core";

export default function UserProfileModal({ username, user, isOpen, handleClose }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const selectedUser = useSelector((states) => states.user.selectedUser);
  console.log(selectedUser);

  useEffect(() => {
    /**
     * I'm refetching user profile on this page so as to get the complete user object
     * which is not available from the search result
     */
    dispatch(fetchUser(username));
  }, []);

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <div className={classes.textRight}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          {selectedUser ? (
            <>
              <h2>User Profile</h2>
              <div className={classes.flexCenter}>
                <img className="profileImage" src={selectedUser.avatar_url} alt="" />
                <h2 className={classes.username}>@{selectedUser.login}</h2>
              </div>
              <div>
                <p>
                  <b>Fullname</b>: {selectedUser.name}
                </p>
                <p>
                  <b>Email</b>: {selectedUser.email}
                </p>
                <p>
                  <b>Followers</b>: {selectedUser.followers}
                </p>
                <p>
                  <b>Following</b>: {selectedUser.following}
                </p>
                <p>
                  <b>Bio</b>: {selectedUser.bio ?? ""}
                </p>
                <p>
                  <b>Location</b>: {selectedUser.location ?? ""}
                </p>
                <p>
                  <b>Twitter Username</b>: {selectedUser.twitter_username ?? ""}
                </p>
                <p>
                  <b>Public Repos</b>: {selectedUser.public_repos}
                </p>
                <p>
                  <b>Public Gists</b>: {selectedUser.public_gists}
                </p>
                <a href={`https://github.com/${selectedUser.login}`} target="_blank" rel="noreferrer">
                  <Button size="small" color="secondary">
                    View Profile on Github
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="flex-center">
              <CircularProgress size={25} />
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none !important",
    "&:focus": {
      outline: "none",
    },
  },
  textRight: {
    textAlign: "right",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  paper: {
    width: "500px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down(780)]: {
      width: "90%",
    },
  },
}));
