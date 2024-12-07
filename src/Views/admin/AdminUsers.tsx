import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import UsersDataTable from "../../Components/Models/Admin/UsersDataTable";
import UserForm from "../../Components/Models/Admin/Forms/UserForm";
import * as usersService from '../../Services/Api/UsersService';
import { User } from "../../Services/Interfaces/Interfaces";

export default function AdminUsers() {
    const emptyUser: User = {
        name: '',
        lastname: '',
        email: '',
        rolename: '',
        creationDate: '',
        points: 0
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedUser, setSelectedUser] = useState<User>(emptyUser);
    const [users, setUsers] = useState<User[]>();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(emptyUser);
    };

    const handleFormSubmit = async (data: User) => {
        try {
            delete data._id; // Asume que `data` puede tener `_id` en algunos casos
            const response = await usersService.createUser(data);
            await handleAddUser();
            handleClose();
            return response;
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleAddUser = async () => {
        await getUsers();
    };

    const getUsers = async () => {
        try {
            const data = await usersService.fetchUsers();
            const newData = data.data;
            setUsers(newData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{
                width: '100%',
                paddingInline: { xs: '16px', sm: '24px', md: '42px' },
                mt: '24px',
            }}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10}>
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                background: 'white',
                                borderRadius: '10px',
                                padding: '8px 20px',
                            }}>
                                <TextField 
                                    id="standard-basic" 
                                    label="Buscar..." 
                                    variant="standard" 
                                    fullWidth 
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Button 
                                onClick={() => setOpen(true)} 
                                variant="contained" 
                                fullWidth 
                                sx={{
                                    fontSize: { xs: '16px', md: '24px' },
                                }}
                            >
                                Agregar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <UsersDataTable initialData={users} />
                </Grid>
            </Grid>
            <Dialog 
                fullScreen={fullScreen} 
                open={open} 
                onClose={handleClose} 
                PaperProps={{ sx: { padding: '16px', maxWidth: '600px', margin: 'auto' } }}
            >
                <DialogTitle>Agregar Usuario</DialogTitle>
                <DialogContent>
                    <UserForm initialData={selectedUser} onSubmit={handleFormSubmit} isEdit={false} />
                </DialogContent>
            </Dialog>
        </>
    );
}