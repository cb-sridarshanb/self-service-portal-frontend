import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Container } from "@mui/material";
import { useState } from "react";
import styles from "./Home.module.css";

export default function Home({ userDetails, changeView }) {
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useState(userDetails);

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
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert(data);
        closeDeleteModal();
        changeView("signin");
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    changeView("signin");
  };

  return (
    <>
      <Container>
        <h2 className={styles.title}>
          Hi {userInfo.firstName + " " + userInfo.lastName}
        </h2>
        <p className={styles.listTitle}>User details</p>
        <div>
          <div className={styles.buttonGroup}>
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Edit Details
              </Button>
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
                  <Button onClick={submitDetails}>Confirm Edit</Button>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <Button variant="outlined" onClick={openDeleteModal}>
                Delete Account
              </Button>
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
                  <Button onClick={deleteAccount}>Yes</Button>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <Button variant="outlined" onClick={logout}>
                Log out
              </Button>
            </div>
          </div>
        </div>
        <ul className={styles.detailsList}>
          {Object.entries(userInfo).map((user) => {
            if (user[0] !== "password") {
              return (
                <li key={user[0]}>
                  <p>{user[0]}:</p>
                  <p>{user[1]}</p>
                </li>
              );
            }
          })}
        </ul>
      </Container>
    </>
  );
}
