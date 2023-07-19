import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import CustomerCard from "../components/CustomerCard";
import styles from '../styles/Home.module.css'
import { CustomerType } from "../types";

const Home = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [index, setIndex] = useState(0);
    const [disableRIght, setDisaableRight] = useState(false);
    const [disableLeft, setDisaableLeft] = useState(true);

    const limit = 4;

    useEffect(() => {
        axios
            .get(
                `http://localhost:4000/search?first_name=${firstName}&last_name=${lastName}&city=${city}&start=${index}&end=${index + limit}`
            )
            .then(res => {
                setCustomers(res.data.data);

                setDisaableRight(index + limit >= res.data.length);
                setDisaableLeft(index == 0);
            });
    }, [firstName, lastName, city, index]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Customers</h1>

            <div className={styles.searchContainer}>
                <h3 className={styles.searchHeading}>
                    Search By
                </h3>
                <div className={styles.searchItems}>
                    <div>
                        <span>Firstname</span>
                        <input className={styles.searchInput} type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <span>Lastname</span>
                        <input className={styles.searchInput} type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                    <div>
                        <span>City</span>
                        <input className={styles.searchInput} type="text" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className={styles.cardContainer}>
                {
                    customers.map(customer => <Link to={`/customers/${customer.id}`}><CustomerCard customer={customer} /></Link>)
                }
            </div>
            <div className={styles.pagination}>
                <button className={styles.paginationButtons} onClick={() => setIndex(prevIndex => prevIndex - limit)} disabled={disableLeft}>&lt;</button>
                <button className={styles.paginationButtons} onClick={() => setIndex(prevIndex => prevIndex + limit)} disabled={disableRIght}>&gt;</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={'/cities'}><button className={styles.citiesButton}>Check customer distribution by cities</button></Link>
            </div>
        </div>
    );
};

export default Home;
