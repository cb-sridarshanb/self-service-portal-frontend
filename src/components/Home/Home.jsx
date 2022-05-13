import { Container, Button } from "@mui/material";
import styles from "./Home.module.css"
const Home = ({userDetails}) => {
    console.log(userDetails);
    const arrOfUserDetails = Object.entries(userDetails);
    return (
        <Container>
            <h2 className={styles.title}>Hi {userDetails.firstName + " " + userDetails.lastName}</h2>
            <p className={styles.listTitle}>User details</p>
            <div>
                <Button variant="outlined">Edit Details</Button>
            </div>
            <ul className={styles.detailsList}>
                {arrOfUserDetails.map(user => {
                    return (<li id={user[0]}>
                            <p>{user[0]}:</p>
                            <p>{user[1]}</p>
                        </li>);
                })}
            </ul>
        </Container>
    )     
}

export default Home;