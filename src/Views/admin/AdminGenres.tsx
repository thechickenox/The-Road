import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField, useMediaQuery, useTheme } from "@mui/material";
import GenresDataTable from "../../Components/Models/Admin/GenresDataTable";
import GenreForm from "../../Components/Models/Admin/Forms/GenresForm";
import { Genre } from "../../Services/Interfaces/Interfaces";
import * as genreService from '../../Services/Api/GenresService';
import Swal from "sweetalert2";
import Loader from "../../Components/Models/shared/Loader";

export default function AdminGenres() {
    const emptyGenre: Genre = {
        _id: '',
        title: '',
        cantidad: 0,
    }
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedGenre, setSelectedGenre] = useState<Genre>(emptyGenre);
    const [open, setOpen] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleClose = () => {
        setOpen(false);
        setSelectedGenre(emptyGenre);
    };

    const handleFormSubmit = async (data: Genre) => {
        try {
            setIsLoadingSubmit(true)
            delete data._id;
            const response = await genreService.createGenre(data);
            await getGenres();
            setIsLoadingSubmit(false)
            handleClose();
            Swal.fire({
                title: 'Genero Creado con exito',
            })
            return response;
        } catch (error) {
            console.error('Error creating genre:', error);
        }
    };

    const getGenres = async () => {
        try {
            setIsLoading(true);
            const data = await genreService.fetchGenres();
            const newData = data.data;
            setGenres(newData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    useEffect(() => {
        getGenres();
    }, []);

    return (
        <>
            {isLoading ? (
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
                                    disabled={isLoadingSubmit}
                                    sx={{
                                        fontSize: { xs: '14px', md: '16px' },
                                        padding: { xs: '8px', md: '12px' },
                                    }}
                                >
                                    Agregar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <GenresDataTable initialData={genres} />
                    </Grid>
                </Grid>
            )}
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                PaperProps={{ sx: { padding: '16px', maxWidth: '600px', margin: 'auto' } }}
            >
                <DialogTitle>Agregar Género</DialogTitle>
                <DialogContent>
                    <GenreForm initialData={selectedGenre} onSubmit={handleFormSubmit} isLoading={isLoadingSubmit} />
                </DialogContent>
            </Dialog>
        </>
    );
}