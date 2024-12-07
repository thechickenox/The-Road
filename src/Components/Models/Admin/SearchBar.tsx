import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";


export default function SearchBar(){
    return (
        <Grid container spacing={3}>
            <Grid item xs={10}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    background: 'white',
                    borderRadius: '10px',
                    paddingTop: '8px',
                    paddingBottom: '16px',
                    paddingInline: '20px',
                }}> 
                    <TextField id="standard-basic" label="Buscar..." variant="standard" sx={{
                        width: '100%',
                    }} />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" sx={{
                    width: "100%",
                    height: "100%",
                    fontSize: "24px",
                }}>
                    Agregar
                </Button>
            </Grid>
        </Grid>
    )
}