import { Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SingleSystemStatus({ status, title }) {
    return <span className='d-flex justify-content-center align-items-center gap-3' >
        <div className={status == 2 ? 'bg-success' : status == 1 ? 'bg-danger' : 'bg-warning'} style={{ width: "15px", height: "15px", borderRadius: "50px" }} />
        <p className='m-0'>{title}</p>
    </span>
}
