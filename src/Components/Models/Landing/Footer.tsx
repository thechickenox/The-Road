import React from 'react';
import { Box, Typography, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
interface FooterProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  presentacionRef: React.RefObject<HTMLDivElement>;
  offerSectionRef: React.RefObject<HTMLDivElement>;
  aboutUsSectionRef: React.RefObject<HTMLDivElement>;
}
const Footer: React.FC<FooterProps> = ({ scrollToSection, presentacionRef, offerSectionRef, aboutUsSectionRef }) => {
  const languages = ['JavaScript', 'HTML', 'CSS', 'TypeScript', 'React', 'Angular', 'Python'];
  const developers = [
    'Eduardo Chan Caamal',
    'Carlos André Castro Rodriguez',
    'Maximiliano Gomez Bacab',
    'Adrian Alberto Sanchez Arevalo',
  ];

  return (
    <Box sx={{
      background: 'linear-gradient(0deg, rgba(255,255,255,1) 50%, rgba(209,220,238,1) 100%)',
      padding: 4,
      marginTop: 4,
      paddingTop: 10
    }}>
      <Grid container spacing={4} sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom sx={{
            fontFamily: 'Bebas Neue'
          }}>
            The Road
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Lenguajes disponibles</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {languages.map((lang, index) => (
              <Chip label={lang} key={index} sx={{ margin: 0.5, backgroundColor: '#82c6c1', color: '#ffffff', fontWeight: 'bold' }} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <Typography variant="h6" gutterBottom>
            Mapa de sitio
          </Typography>
          <List sx={{
            p: 0
          }}>
            <ListItem onClick={() => scrollToSection(presentacionRef)} sx={{
              p: 0,
              cursor: 'pointer'
            }}>
              <ListItemText primary="Explora" />
            </ListItem>
            <ListItem onClick={() => scrollToSection(offerSectionRef)} sx={{
              p: 0,
              cursor: 'pointer'
            }}>
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem onClick={() => scrollToSection(aboutUsSectionRef)} sx={{
              p: 0,
              cursor: 'pointer'
            }}>
              <ListItemText primary="Para Desarrolladores" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={1.5}>
          <Typography variant="h6" gutterBottom>
            Contacto
          </Typography>
          <Typography variant="body1">9983711000</Typography>
          <Typography variant="body1">The Road</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="h6" gutterBottom>
            Desarrolladores
          </Typography>
          {developers.map((dev, index) => (
            <Typography variant="body2" key={index}>
              {dev}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
