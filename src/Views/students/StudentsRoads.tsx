import React from "react";
import { Grid } from "@mui/material";
import BestRoutes from "../../Components/Models/Students/BestRoutes";
import MyRoads from "../../Components/Models/Students/MyRoads";

export default function StudentsRoads() {
    return (
        <Grid container spacing={2} sx={{
            paddingInline: '42px',
            mt: '32px'
        }}>
            <Grid item xs={12} >
                <MyRoads></MyRoads>
            </Grid>
            <Grid item xs={12}>
                <BestRoutes></BestRoutes>
            </Grid>
        </Grid>
    )
}