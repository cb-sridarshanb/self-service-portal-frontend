import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
Table;
import {
  Container,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Card,
} from "@mui/material";
import { useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const CssButton = styled(Button)({
  "&.MuiButton-root": {
    background: "#b6b2ff",
    border: "2px solid #03003e",
    color: "#03003e",
    "&.MuiButton-root:hover": {
      background: "#03003e",
      color: "#b6b2ff",
    },
  },
});

const CustomContainer = styled(Container)({
  "&": {
    background: "#8E2DE2" /* fallback for old browsers */,
    background:
      "-webkit-linear-gradient(to right, #4A00E0, #8E2DE2)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #4A00E0, #8E2DE2)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    maxWidth: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const CustomDialog = styled(Dialog)({
  "& .MuiDialog-container": {
    // display: "block",
    background: "red",
  },
});

export default function Home({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
  userToken,
}) {
  console.log(user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useState(user);
  const [viewDetails, setViewDetails] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const openViewDetailsModal = () => {
    setViewDetails(true);
  };

  const closeViewDetailsModal = () => {
    setViewDetails(false);
  };

  const setFirstName = (e) => {
    setUserInfo((prevState) => ({ ...prevState, firstName: e.target.value }));
  };

  const setLastName = (e) => {
    setUserInfo((prevState) => ({ ...prevState, lastName: e.target.value }));
  };

  const setAge = (e) => {
    setUserInfo((prevState) => ({ ...prevState, age: e.target.value }));
  };

  const setAddress1 = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      addressLine1: e.target.value,
    }));
  };

  const setAddress2 = (e) => {
    setUserInfo((prevState) => ({
      ...prevState,
      addressLine2: e.target.value,
    }));
  };

  const setStates = (e) => {
    setUserInfo((prevState) => ({ ...prevState, state: e.target.value }));
  };

  const setCity = (e) => {
    setUserInfo((prevState) => ({ ...prevState, city: e.target.value }));
  };

  const setCountry = (e) => {
    setUserInfo((prevState) => ({ ...prevState, country: e.target.value }));
  };

  const submitDetails = () => {
    handleClose();
    fetch("http://localhost:8080/portal/edit-details", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(userInfo),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          alert("Successfully edited");
        } else {
          const text = await response.text();
          alert(text);
        }
      })
      .catch((e) => console.log(e));
  };

  const deleteAccount = () => {
    fetch(`http://localhost:8080/portal/remove-user/${userInfo.email}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
        closeDeleteModal();
        setIsAuthenticated(false);
        setUser(null);
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
    setUser(null);
  };

  return (
    <>
      <CustomContainer>
        <h2 className={styles.title}>
          Hi {userInfo.firstName + " " + userInfo.lastName}
        </h2>
        <div>
          <div className={styles.buttonGroup}>
            <div>
              <CssButton variant="outlined" onClick={openViewDetailsModal}>
                View Details
              </CssButton>
              <Dialog
                fullWidth
                open={viewDetails}
                // TransitionComponent={Transition}
                // keepMounted
                onClose={closeViewDetailsModal}
                // aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"User Details"}</DialogTitle>
                <DialogContent>
                  <TableContainer component={Card}>
                    <Table
                      style={{ minWidth: "100%" }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "700" }}>
                            Information
                          </TableCell>
                          <TableCell
                            style={{ fontWeight: "700" }}
                            align="right"
                          >
                            Entry
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(userInfo).map((user) => {
                          if (user[0] !== "password") {
                            return (
                              <TableRow
                                key={user[0]}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  style={{ textTransform: "capitalize" }}
                                  component="th"
                                  scope="row"
                                >
                                  {user[0]}
                                </TableCell>
                                <TableCell
                                  style={{ fontWeight: "700" }}
                                  align="right"
                                >
                                  {user[1]}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeViewDetailsModal}>Close</Button>
                </DialogActions>
              </Dialog>
            </div>
            <div>
              <CssButton variant="outlined" onClick={handleClickOpen}>
                Edit Details
              </CssButton>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit details</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ marginBottom: "2rem" }}>
                    Change your personal details if you wish!
                  </DialogContentText>
                  <div className={styles.editDetails}>
                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      fullWidth
                      variant="outlined"
                      disabled
                      defaultValue={userInfo.email}
                    />
                    <TextField
                      id="firstname"
                      label="First Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.firstName}
                      onChange={setFirstName}
                    />
                    <TextField
                      id="lastname"
                      label="Last Name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.lastName}
                      onChange={setLastName}
                    />
                    <TextField
                      id="age"
                      label="Age"
                      type="number"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.age}
                      onChange={setAge}
                    />
                    <TextField
                      id="address1"
                      label="Address Line 1"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.addressLine1}
                      onChange={setAddress1}
                    />
                    <TextField
                      id="address2"
                      label="Address Line 2"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.addressLine2}
                      onChange={setAddress2}
                    />
                    <TextField
                      id="state"
                      label="State"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.state}
                      onChange={setStates}
                    />
                    <TextField
                      id="city"
                      label="City"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.city}
                      onChange={setCity}
                    />
                    <TextField
                      id="country"
                      label="Country"
                      type="text"
                      fullWidth
                      variant="outlined"
                      defaultValue={userInfo.country}
                      onChange={setCountry}
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <CssButton onClick={submitDetails}>Confirm Edit</CssButton>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <CssButton variant="outlined" onClick={openDeleteModal}>
                Delete Account
              </CssButton>
              <Dialog open={deleteModal} onClick={closeDeleteModal}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ marginBottom: "2rem" }}>
                    Are you sure you want to delete the account?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={closeDeleteModal}>
                    No
                  </Button>
                  <CssButton onClick={deleteAccount}>Yes</CssButton>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <CssButton variant="outlined" onClick={logout}>
                Log out
              </CssButton>
            </div>
          </div>
        </div>
      </CustomContainer>
    </>
  );
}
