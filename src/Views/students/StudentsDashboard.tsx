import { Grid } from "@mui/material";
import News from "../../Components/Models/Students/News";
import ActivitiesList from "../../Components/Models/Students/ActivitiesLists";
import React from "react";
import GenresList from "../../Components/Models/Students/GenresList";
export default function StudentsDashboard(){
    return(
        <Grid container spacing={2} sx={{
            paddingInline: {xs:'20px',sm:'24px',md:'42px'},
            mt:'32px'
        }}>
            <Grid item xs={12} >
                <News></News>
            </Grid>
            <Grid item xs={12}>
                <GenresList></GenresList>
            </Grid>
            <Grid item xs={12}>
                <ActivitiesList></ActivitiesList>
            </Grid>
        </Grid>
    )
}