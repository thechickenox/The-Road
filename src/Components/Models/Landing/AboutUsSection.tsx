import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, } from '@mui/material';
import Img1 from '../../../assets/images/andre.jpeg'; 
import Img2 from '../../../assets/images/pollo.jpeg'; 
import Img3 from '../../../assets/images/lalo.jpeg'; 
import Img4 from '../../../assets/images/max.jpeg'; 

const AboutUs = () => {
  const teamMembers = [
    { name: 'Carlos Castro', role: 'Backend', img: Img1 },
    { name: 'Ana Pérez', role: 'Frontend', img: Img2 },
    { name: 'Luis Gómez', role: 'UI/UX', img: Img3 },
    { name: 'Marta Díaz', role: 'Full Stack', img: Img4 },
  ];

  return (
    <Box sx={{ padding: 10 }}>
      <Typography variant="h2" align="center" gutterBottom sx={{
        fontFamily: 'Bebas Neue'
      }}>
        ¿Quiénes somos?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={6} sm={6} md={3} key={index} sx={{ borderRadius: '10px'}}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={member.img} 
                alt={member.name}
                sx={{ height: { xs: 260, sm: 290, md: 400 }, 
                objectFit: 'cover' ,
                borderRadius: '10px',
                filter: 'grayscale(80%)',
                transition: 'all 500ms ease-in-out', 
                ":hover":{
                  filter: 'grayscale(0%)'
                }
              }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUs;
