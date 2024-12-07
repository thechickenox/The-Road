import ActivitiesDataTable from "../../Components/Models/Admin/ActivitiesDataTable";
import { Box, Button, Grid, TextField } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"

export default function AdminActivities() {
    const navigate = useNavigate();

    const crearActividad = () => {
        navigate('/administrador/crear-actividad');
    }

    return (
        <Grid container spacing={2} sx={{
            width: '100%',
            paddingInline: {xs: '10px', md:'42px'},
            mt: '24px',
        }}>
            <Grid item xs={12} sx={{
                marginLeft: '0'
            }}>
                <Grid container spacing={{xs: '10px', md: '24px'}}>
                    <Grid item xs={9} md={10}>
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
                    <Grid item xs={3} md={2}>
                        <Button 
                            variant="contained" 
                            sx={{
                                width: "100%",
                                height: "100%",
                                fontSize: {xs: '12px',sm: '12px', md:'16px', lg:"24px"}
                            }}
                            onClick={crearActividad}
                        >
                            Agregar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <ActivitiesDataTable></ActivitiesDataTable>
            </Grid>
        </Grid>
    )
}
