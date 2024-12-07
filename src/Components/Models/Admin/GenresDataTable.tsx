import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { EditNotifications, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { Genre } from '../../../Services/Interfaces/Interfaces';
import * as genreService from '../../../Services/Api/GenresService';
import GenreForm from './Forms/GenresForm';

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

function GenresDataTable({ initialData }: any) {
  const emptyGenre: Genre = {
    _id: '',
    title: '',
    cantidad: 0,
  };

  const [genres, setGenres] = useState<Genre[]>(initialData || []);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<Genre>(emptyGenre);
  const [open, setOpen] = useState(false);
  const [forceRender, setForceRender] = useState(0); // Estado para forzar la re-renderización

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 580 },
    { field: 'cantidad', headerName: 'Cantidad de Vistas', width: 400 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
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
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const tabletColumns: GridColDef[] = [
    { field: 'title', headerName: 'Titulo', width: 220 },
    { field: 'cantidad', headerName: 'Cantidad de Vistas', width: 150 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
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
            <DeleteIcon />
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
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setSelectedGenre(emptyGenre);
  };

  const handleEdit = (genre: Genre) => {
    setSelectedGenre(genre);
    setOpen(true);
  };

  const handleFormSubmit = async (data: Genre) => {
    try {
      await genreService.updateGenreById(data);
      await fetchGenres();
      handleClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

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
      await genreService.deleteGenreById(id);
      setGenres((prevGenres) => prevGenres.filter((genre) => genre._id !== id));
      setForceRender((prev) => prev + 1); // Cambia el estado para forzar la re-renderización
    } catch (error) {
      console.error('Error eliminando género:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await genreService.fetchGenres();
      setGenres(response.data);
      setForceRender((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching genres:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (!initialData || initialData.length === 0) {
      fetchGenres();
    } else {
      setGenres(initialData);
    }
    setLoading(false);
  }, [initialData]);

  return (
    <>
      <Box sx={{
        width: '100%',
        padding: '24px',
        borderRadius: '10px',
        backgroundColor: '#FFFFFF',
        overflowX: 'scroll'
      }}>

        <StyledDataGrid
          key={`data-grid-${forceRender}`} // Agrega la clave para forzar la re-renderización
          rows={genres}
          columns={isMobile ? mobileColumns : isTablet ? tabletColumns : columns}
          loading={loading}
          getRowId={(row) => row._id || ''}
          autoHeight
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Género</DialogTitle>
        <DialogContent>
          <GenreForm initialData={selectedGenre} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GenresDataTable;