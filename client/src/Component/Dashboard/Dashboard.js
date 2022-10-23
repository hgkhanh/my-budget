import React from 'react';
import Button from '@mui/material/Button';

 export const Dashboard = ({ yearData }) => {
    return(
        <div>
            {JSON.stringify(yearData)}
            <Button variant="contained">Hello World</Button>
        </div>
    )
}
