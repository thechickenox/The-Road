import React from "react";
import { Grid } from "@mui/material";
import ActivitiesList from "../../Components/Models/Students/ActivitiesLists";
import GenresList from "../../Components/Models/Students/GenresList";

export default function StudentsActivities(){
    return (
        <Grid container spacing={2} sx={{
            paddingInline: '42px',
            mt: '32px',
            width: '100%',
        }}>
            <Grid item xs={12}>
                <GenresList></GenresList>
            </Grid>
            <Grid item xs={12} >
                <ActivitiesList></ActivitiesList>
            </Grid>
        </Grid>
    )
}