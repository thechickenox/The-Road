import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridDeleteIcon, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { EditNotifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared/Loader';
import * as roadsService from '../../../Services/Api/RoadsService'
import Swal from 'sweetalert2';
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

export default function RoadsDataTable({ initialData }: any) {
  const [roads, setRoads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 400 },
    { field: 'easyDescription', headerName: 'Descripción Corta', width: 350 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
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
      )
    }
  ];

  const tabletColumns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 200 },
    { field: 'easyDescription', headerName: 'Descripción Corta', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
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
      )
    }
  ];

  const mobileColumns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
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
      )
    }
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
    }).then((result: any) => {
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
      const res = await roadsService.deleteRoadsById(id);
      setRoads((prevRows) => prevRows.filter((row: any) => row._id !== id));
      return res
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`editar/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    if (initialData && initialData.length > 0) {
      setRoads(initialData);
    } else {
      console.error('initialData is empty or undefined', initialData);
    }
    setLoading(false);
  }, [initialData]);

  return (
    <Box sx={{
      width: '100%',
      padding: { xs: '16px', sm: '24px' },
      borderRadius: '10px',
      backgroundColor: '#FFFFFF',
      overflowX: 'auto'
    }}>
      {loading ? (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}>
          <Loader />
        </Box>
      ) : (
        <StyledDataGrid
          rows={roads}
          columns={isMobile ? mobileColumns : isTablet ? tabletColumns : columns}
          loading={loading}
          getRowId={(row) => row._id}
          autoHeight
        />
      )}
    </Box>
  );
};