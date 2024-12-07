import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ActivitiesByGenre from "../../Components/Models/Students/ActivitiesByGenre";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BestRoutes from "../../Components/Models/Students/BestRoutes";

export default function ActivitiesViewByGenre() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Esto te llevará a la página anterior
    };
    const { activityGenre } = useParams();
    return (
        <Grid container spacing={2} sx={{
            paddingInline: '42px',
            mt: '32px',
            width: '100%',
        }}>
            <Box onClick={handleGoBack} sx={{
                position: 'absolute',
                top: 90,
                left: { xs: 50, sm: 90, md: 90 },
                background: '#82C6C1',
                zIndex: 100,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                cursor: 'pointer'
            }}>
                <ArrowBackIcon sx={{
                    color: '#fff'
                }}></ArrowBackIcon>
            </Box>
            <Grid item xs={12} >
                <ActivitiesByGenre></ActivitiesByGenre>
            </Grid>
            <Grid item xs={12}>
                <BestRoutes title='Rutas que te pueden gustar'/>
            </Grid>
        </Grid>
    )
}