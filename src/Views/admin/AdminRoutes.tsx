import React, { useEffect, useState } from "react";
import RoadsDataTable from "../../Components/Models/Admin/RoadsDataTable";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import * as roadsService from '../../Services/Api/RoadsService'

export default function AdminRoutes() {
    const [roads, setRoads] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRoads = async () => {
        try {
            const data = await roadsService.fetchRoads();
            setRoads(data.data);
        } catch (error) {
            console.error('Error fetching roads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRoads();
    }, []);

    return (
        <Grid container spacing={2} sx={{
            width: '100%',
            paddingInline: { xs: '16px', sm: '24px', md: '42px' },
            mt: '24px',
        }}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={10}>
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
                    <Grid item xs={12} sm={2}>
                        <Link to={'/administrador/crear-ruta'}>
                            <Button variant="contained" sx={{
                                width: "100%",
                                height: "100%",
                                fontSize: { xs: '18px', sm: '16px', md: '24px'},
                            }}>
                                Agregar
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <RoadsDataTable initialData={roads} />
            </Grid>
        </Grid>
    );
}