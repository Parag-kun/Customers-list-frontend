import { CustomerType } from "../types"

import styles from '../styles/CustomerCard.module.css';

type PropsType = {
    customer: CustomerType
};

const CustomerCard = ({ customer }: PropsType) => {
    return (
        <div className={styles.card}>
            <div className={styles.fields}>{customer.first_name} {customer.last_name}</div>
        </div>
    )
};

export default CustomerCard;
