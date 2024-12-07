import React from 'react';
import ts from '../../../assets/Img/tsbanner.png'
import css from '../../../assets/Img/cssbanner.png'
import html from '../../../assets/Img/htmlbanner.png'
import js from '../../../assets/Img/javascriptbanner.png'
import python from '../../../assets/Img/pythonbanner.png'
import react from '../../../assets/Img/reactbanner.png'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
const Presentacion = () => {
  return (
    <div className="presentation-container">
      <div className="background-icons">
        <img src={js} alt="JS Icon" className="icon js-icon" />
        <img src={python} alt="Python Icon" className="icon python-icon" />
        <img src={html} alt="HTML Icon" className="icon html-icon" />
        <img src={css} alt="CSS Icon" className="icon css-icon" />
        <img src={ts} alt="TS Icon" className="icon ts-icon" />
        <img src={react} alt="REACT Icon" className="icon react-icon" />
        <div className="soloIcon1 soloIcon"></div>
        <div className="soloIcon2 soloIcon"></div>
        <div className="soloIcon3 soloIcon"></div>
        <div className="soloIcon4 soloIcon"></div>
        <div className="soloIcon5 soloIcon"></div>
        <div className="soloIcon6 soloIcon"></div>
        <div className="soloIcon7 soloIcon"></div>
        <div className="soloIcon8 soloIcon"></div>
        <div className="soloIcon9 soloIcon"></div>
      </div>
      <Box className="content" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '90%',
      }}>
        <Typography sx={{
          fontSize: { xs: '50px',sm:'65', md:'70', lg: '80px' },
          fontFamily: 'Bebas Neue',
          fontWeight: 'bold',
          letterSpacing: '6px',
          lineHeight: 'normal'
        }}>Domina la programación</Typography>
        <Typography sx={{
          fontSize: { xs: '32px',sm:'40px', lg: '52px' }
        }}>Practica constantemente</Typography>
        <Typography sx={{
          opacity: '.5',
          fontSize: { xs: '16px',sm:'20px', lg: '20px' },
          width: '60%',
          mb: '20px'
        }}>Mejora tus habilidades de desarrollo entrenando continuamente con desafíos actuales y potencia tus habilidades.</Typography>
        <Link to={'/login'}>
          <button className="join-button">Unirme</button>
        </Link>
      </Box>
    </div>
  );
};

export default Presentacion;