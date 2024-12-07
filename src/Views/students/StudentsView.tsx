import React from "react";
import { Box } from "@mui/material";
import StudentsSidebar from "../../Components/Models/Students/Sidebar";
import { Outlet } from "react-router-dom";

export default function StudentsView(){
    return ( 
        <Box sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <StudentsSidebar></StudentsSidebar>
            <Box sx={{
                width: '100%',
                marginTop: '64px'
            }}>
                <Outlet></Outlet>
            </Box>
        </Box>
    )
}