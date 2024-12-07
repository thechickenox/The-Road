import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { User } from "../../../../Services/Interfaces/Interfaces";

interface UserFormProps {
    initialData?: any;
    onSubmit: (data: User) => void;
    isEdit: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, isEdit }) => {
    const [formData, setFormData] = useState<User>({
        _id: '',
        uid: '',
        name: '',
        lastname: '',
        email: '',
        password: '',
        rolename: '',
        creationDate: new Date(),
        points: 0
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'points' ? parseInt(value) : value
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(formData);
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name as string]: value as string
        }));
    };
    return (
        <Box
            component="form"
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                p: '10px'
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                id="name"
                name="name"
                label="Nombre"
                value={formData.name}
                onChange={handleInputChange}
                sx={{ width: '30vw', mt: '8px' }}
            />
            <TextField
                id="lastname"
                name="lastname"
                label="Apellido"
                value={formData.lastname}
                onChange={handleInputChange}
                sx={{ width: '30vw', mt: '8px' }}
            />
            <TextField
                id="email"
                name="email"
                label="Correo Electrónico"
                value={formData.email}
                onChange={handleInputChange}
                sx={{ width: '30vw', mt: '8px' }}
            />
            {!isEdit && (
                <TextField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    sx={{ width: '30vw', mt: '8px', mb: '8px' }}
                />
            )}

            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                    labelId="role-label"
                    id="rolename"
                    name="rolename"
                    value={formData.rolename}
                    sx={{ width: '30vw' }}
                    onChange={handleSelectChange}
                >
                    <MenuItem value={'Administrador'}>Administrador</MenuItem>
                    <MenuItem value={'Estudiante'}>Estudiante</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">Enviar</Button>
        </Box>
    );
}

export default UserForm;