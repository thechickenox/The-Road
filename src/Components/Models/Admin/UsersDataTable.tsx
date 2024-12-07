import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, styled, useMediaQuery, useTheme } from '@mui/material';
import { EditNotifications, Delete as DeleteIcon } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { User } from '../../../Services/Interfaces/Interfaces';
import * as usersService from '../../../Services/Api/UsersService';
import UserForm from './Forms/UserForm';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#f0f0f0',
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderTop: '0px transparent',
  },
  // Estilo específico para tablet
  [theme.breakpoints.down('md')]: {
    '& .MuiDataGrid-cell': {
      fontSize: '0.75rem',
    },
    '& .MuiDataGrid-columnHeaders': {
      fontSize: '0.875rem',
    },
  },
  // Estilo específico para móvil
  [theme.breakpoints.down('sm')]: {
    '& .MuiDataGrid-cell': {
      fontSize: '0.65rem',
    },
    '& .MuiDataGrid-columnHeaders': {
      fontSize: '0.75rem',
    },
  },
}));


function UsersDataTable({ initialData }: any) {
  const [users, setUsers] = useState<User[]>(initialData || []);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'email', headerName: 'Correo Electrónico', width: 250 },
    { field: 'rolename', headerName: 'Rol', width: 150 },
    { field: 'points', headerName: 'Puntos', width: 150 },
    {
      field: 'creationDate',
      headerName: 'Fecha de Creación',
      width: 200,
      type: 'date',
      valueGetter: (params) => new Date(params),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row as User)}
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
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'rolename', headerName: 'Rol', width: 150 },
    { field: 'points', headerName: 'Puntos', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row as User)}
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
  ]; // Usa las mismas columnas para tablet en este ejemplo
  
  const mobileColumns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 120 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row as User)}
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

  const handleFormSubmit = async (data: User) => {
    try {
      await usersService.updateUserById(data);
      await getUsers();
      handleClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await usersService.deleteUserById(id);
      await getUsers();
    } catch (error) {
      console.error('Error eliminando usuario:', error);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const getUsers = async () => {
    try {
      const data = await usersService.fetchUsers();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          rows={users}
          columns={isMobile ? mobileColumns : (isTablet ? tabletColumns : columns)}
          loading={loading}
          getRowId={(row) => row._id || ''}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          {selectedUser && <UserForm initialData={selectedUser} onSubmit={handleFormSubmit} isEdit={true} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UsersDataTable;