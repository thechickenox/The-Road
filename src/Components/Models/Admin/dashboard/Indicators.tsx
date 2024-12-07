import React, { useEffect, useState } from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import * as usersService from '../../../../Services/Api/UsersService'
import * as roadsService from '../../../../Services/Api/RoadsService'
import * as activitiesService from '../../../../Services/Api/ActivitiesService'
const IndicatorContainer = styled(Box)`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(279.76deg, rgba(73, 67, 123, 0.5) 0%, rgba(116, 165, 176, 0.5) 99.5%);
  backdrop-filter: blur(40px);
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default function IndicatorCharts() {
    const [users, setUsers] = useState(null);
    const [roads, setRoads] = useState(null);
    const [activities, setActivities] = useState(null);
    async function fetchAll(){
        const usersRes = await usersService.fetchUsers();
        const roadsRes = await roadsService.fetchRoads();
        const activitiesRes = await activitiesService.fetchActivities();
        setUsers(usersRes.data.length);
        setRoads(roadsRes.data.length);
        setActivities(activitiesRes.data.length);
    }
    useEffect(()=> {
        fetchAll();
    }, [])
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
                <IndicatorContainer>
                    <Typography fontSize={'24px'} color={'white'}>Actividades</Typography>
                    <Typography fontSize={'32px'} color={'white'}>{activities}</Typography>
                </IndicatorContainer>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <IndicatorContainer>
                    <Typography fontSize={'24px'} color={'white'}>Rutas</Typography>
                    <Typography fontSize={'32px'} color={'white'}> {roads} </Typography>
                </IndicatorContainer>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
                <IndicatorContainer>
                    <Typography fontSize={'24px'} color={'white'}>Total de Usuarios</Typography>
                    <Typography fontSize={'32px'} color={'white'}> {users} </Typography>
                </IndicatorContainer>
            </Grid>
        </Grid>
    );
}