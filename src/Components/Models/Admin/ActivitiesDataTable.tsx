import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { EditNotifications } from '@mui/icons-material';
import { Activity } from '../../../Services/Interfaces/Interfaces'; // Asegúrate de importar la interfaz correcta
import * as activitiesService from '../../../Services/Api/ActivitiesService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const StyledDataGrid = styled(DataGrid)(() => ({
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#f0f0f0',
    border: 'none'
  },
  '& .MuiDataGrid-withBorderColor': {
    border: 'transparent'
  },
  '& .MuiDataGrid-cell': {
    borderTop: '0px transparent'
  },
}));

const ActivitiesDataTable: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 250 },
    { field: 'description', headerName: 'Descripción', width: 220 },
    { field: 'genre', headerName: 'Genero', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <EditNotifications />
          </IconButton>
          <IconButton
            onClick={() => confirmDelete(params.row._id)}
            color="secondary"
            aria-label="delete"
          >
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const tabletColumns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 200 },
    { field: 'description', headerName: 'Descripción', width: 180 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <EditNotifications />
          </IconButton>
          <IconButton
            onClick={() => confirmDelete(params.row._id)}
            color="secondary"
            aria-label="delete"
          >
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const mobileColumns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
            aria-label="edit"
          >
            <EditNotifications />
          </IconButton>
          <IconButton
            onClick={() => confirmDelete(params.row._id)}
            color="secondary"
            aria-label="delete"
          >
            <GridDeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const confirmDelete = (id: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await activitiesService.deleteActivityById(id);
      getActivities();
      return response;
    } catch (error) {
      console.error('Error eliminando actividad:', error);
      throw new Error();
    }
  };

  const handleEdit = (activity: Activity) => {
    navigate(`editar-actividad/${activity._id}`);
  };

  const getActivities = async () => {
    try {
      const data = await activitiesService.fetchActivities();
      const newData = data.data;
      setActivities(newData);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <Box sx={{
      width: '100%',
      padding: '24px',
      borderRadius: '10px',
      backgroundColor: '#FFFFFF',
      overflowX: 'scroll'
    }}>
      <StyledDataGrid
        rows={activities}
        columns={isMobile ? mobileColumns : isTablet ? tabletColumns : columns}
        loading={loading}
        getRowId={(row) => row._id || ''}
        autoHeight
      />
    </Box>
  );
};

export default ActivitiesDataTable;