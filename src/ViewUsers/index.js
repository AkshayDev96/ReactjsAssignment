import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useSelector } from 'react-redux';


//this component is for showing all the users details

const ViewUsers = () => {

    const users = useSelector(state => state.users?.users)

    return (
        <div className="card mt-5">
            {
                users?.length > 0 && (
                    <DataTable value={users} paginator rows={users?.length}  rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                        <Column header="Fist name" field='firstName'></Column>
                        <Column field='lastName' header="Last name" colSpan={1} ></Column>
                        <Column field='email' header="Email" colSpan={1}></Column>
                        <Column field='phone' header="Phone no." colSpan={1}></Column>
                        <Column field='gender' header="Gender" colSpan={1}></Column>
                        <Column field='dob' header="Date Of Birth" colSpan={1}></Column>
                    </DataTable>
                )
            }
        </div>
    );
}

export default ViewUsers;