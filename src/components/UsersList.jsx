import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePagination";
import Grid from "@material-ui/core/Grid";
import SearchForm from "./SearchForm";
import { makeStyles } from "@material-ui/core";
import useModal from "../util/useModal";
import UserProfileModal from "./UserProfileModal";
import { fetchUsers } from "../store/actions/users";
import UserCard from "./UserCard";

const UsersList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profileModal = useModal();

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(12);

  const [search, setSearchText] = React.useState("");

  const { users, total } = useSelector((state) => state.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    Promise.resolve("for batching hook update").then(() => {
      setLimit(parseInt(event.target.value, 10));
      //Set the current page back to zero when limit changes
      setPage(0);
    });
  };

  const handleSearchTextChange = async (text) => {
    Promise.resolve("for batching hook update").then(() => {
      setSearchText(text);
      setPage(0);
    });
  };

  useEffect(() => {
    if (search) {
      dispatch(
        fetchUsers({
          q: search,
          limit,
          page,
        })
      );
    }
  }, [dispatch, limit, page, search]);

  return (
    <div className={classes.root}>
      {profileModal.isOpen && (
        <UserProfileModal
          username={profileModal.modalData.login}
          user={profileModal.modalData}
          isOpen={profileModal.isOpen}
          handleClose={profileModal.close}
        />
      )}

      <Paper className={`${classes.paper} tableContainer`}>
        <br />
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item md={4} xs={11} className={classes.form}>
            <SearchForm searchText={search} setSearchText={handleSearchTextChange} />
          </Grid>
        </Grid>
        <br />
        {users.length ? (
          <>
            <Grid container direction="row" spacing={2}>
              {users.map((user) => (
                <Grid item md={3} xs={12} sm={6} key={user.id}>
                  <UserCard openProfile={profileModal.open} user={user} />
                </Grid>
              ))}
            </Grid>
            <br />

            <TablePagination
              rowsPerPageOptions={[8, 12, 16, 20, 28, 32, 26]}
              colSpan={3}
              count={total}
              rowsPerPage={limit}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </>
        ) : (
          <h1 className={classes.noResultMessage}>No search result found</h1>
        )}
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    overflowX: "hidden",
  },
  form: {
    zIndex: 1000,
  },
  noResultMessage: {
    textAlign: "center",
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
}));

export default UsersList;
