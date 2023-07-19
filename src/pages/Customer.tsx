import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { CustomerType } from "../types";
import styles from '../styles/Customer.module.css';

const Customer = () => {
    const [customer, setCustomer] = useState<CustomerType | null>(null);
    const [file, setFile] = useState<string>();
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');
    const [feedback, setFeedback] = useState('');
    const params = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/customers/${params.id}`)
            .then(res => setCustomer(res.data.data));
    }, []);

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = e => {
                setFile(btoa(e.target?.result as string));
                setFileType(file.type);
                setFileName(file.name);
            };
        }
    };

    const handleSubmit = () => {
        axios
            .post('http://localhost:4000', { file, fileType })
            .then(res => setFeedback(res.data.message))
            .catch(err => setFeedback(err.message));
    }

    return (
        <div className={styles.container}>
            <div>{customer?.id}. {customer?.first_name} {customer?.last_name}</div>
            <div>City: {customer?.city}</div>
            <div>Company: {customer?.company}</div>
            <div className={styles.fileContainer}>
                <input className={styles.file} type="file" id="file" onChange={e => handleFileUpload(e.target.files?.[0] ?? null)} />
                <label className={styles.fileLabel} htmlFor="file">Edit {fileName}</label>
                <div className={styles.fileName}>{fileName}</div>
                <button className={styles.button} type="submit" onClick={handleSubmit}>Submit</button>
            </div>
            <div>{feedback}</div>
            <Link to={'/'}><button className={styles.button}>Back</button></Link>
        </div>
    );
};

export default Customer;
