import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Genre } from "../../../../Services/Interfaces/Interfaces";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../../../../Services/Auth/FirebaseAuthProvider";
export default function GenreForm({ initialData, onSubmit, isLoading }: any) {
    const [isEdit, setIsEdit] = useState(false);
    const [bannerImagePreview, setBannerImagePreview] = useState<any>(null);
    const [bannerImageUpload, setBannerImageUpload] = useState<any>(null);
    const [formData, setFormData] = useState<Genre>({
        _id: '',
        title: '',
        cantidad: 0,
        bannerImg: ''
    });
    const handleBannerImageUpload = (file: File) => {
        setBannerImageUpload(file);
        setBannerImagePreview(URL.createObjectURL(file));
    };
    const uploadBannerFile = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!file) return resolve('');
            const imageRef = ref(storage, `images/${file.name + v4()}`);
            uploadBytes(imageRef, file)
                .then((snapshot) => {
                    getDownloadURL(snapshot.ref)
                        .then((url) => {
                            resolve(url);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };
    useEffect(() => {
        if (initialData) {
            setIsEdit(true)
            setFormData(initialData);
        } else {
            setIsEdit(false)
        }
    }, [initialData]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bannerImg = await uploadBannerFile(bannerImageUpload!);
        let finalData = {
            ...formData,
            bannerImg: bannerImg
        }
        onSubmit(finalData);
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
                helperText="Enter your name"
                id="name"
                name="title"
                label="Nombre"
                value={formData.title}
                onChange={handleInputChange}
                sx={{
                    width: '30vw',
                    mt: '8px'
                }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginTop: '16px', width: '100%' }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Subir imagen
                    <input
                        type="file"
                        id="upload-banner-img"
                        hidden
                        onChange={(e) => handleBannerImageUpload(e.target.files![0])}
                    />
                </Button>
                <Box sx={{ height: { xs: '80px', sm: '200px', md: '250px' }, width: { xs: '200px', sm: '400px', md: '500px' }, opacity: 0.5, background: `url(${bannerImagePreview})`, backgroundPosition: 'center', backgroundSize: 'cover', position: 'relative', border: '2px dashed #c9c9c9' }} />
            </Box>
            <Button type="submit" variant="contained" disabled={isLoading}>Enviar</Button>
        </Box>
    );
}