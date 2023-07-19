import axios from "axios";
import { useEffect, useState } from "react";

import { CityType } from "../types";
import styles from '../styles/Cities.module.css';
import { Link } from "react-router-dom";

const Cities = () => {
    const [cities, setCities] = useState<CityType[]>([])

    useEffect(() => {
        axios
            .get('http://localhost:4000/cities')
            .then(res => setCities(res.data.data));
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.item}>
            <div>Name</div>
            <div>Customers</div>
            </div>
            {
                cities.map(city => (
                    <div className={styles.item}>
                        <div>{city.name}</div>
                        <div>{city.count}</div>
                    </div>
                ))
            }
            <Link to={'/'}><button className={styles.button}>Back</button></Link>
        </div>
    );
};

export default Cities;
