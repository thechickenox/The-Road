import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
interface HeaderProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  presentacionRef: React.RefObject<HTMLDivElement>;
  offerSectionRef: React.RefObject<HTMLDivElement>;
  aboutUsSectionRef: React.RefObject<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ scrollToSection, presentacionRef, offerSectionRef, aboutUsSectionRef }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem onClick={() => scrollToSection(presentacionRef)}>
          <ListItemText primary="Explora" />
        </ListItem>
        <ListItem onClick={() => scrollToSection(offerSectionRef)}>
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem onClick={() => scrollToSection(aboutUsSectionRef)}>
          <ListItemText primary="Para Desarrolladores" />
        </ListItem>
        <ListItem >
          <ListItemText>
            <Link to={'/login'}>Inicia Sesión</Link>
          </ListItemText>
        </ListItem>
        <ListItem >
          <ListItemText>
            <Link to={'/login'}>Únete</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Box sx={{
              mr: 2,
              width: '50px'
            }}>
              <Typography sx={{
                fontFamily: 'Bebas Neue'
              }}>
                The Road
              </Typography>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Box sx={{
                mr: 2,
                width: '100px'
              }}>
                <Typography sx={{
                  fontFamily: 'Bebas Neue'
                }}>
                  The Road
                </Typography>
              </Box>
              <Button color="inherit" onClick={() => scrollToSection(presentacionRef)}>Explora</Button>
              <Button color="inherit" onClick={() => scrollToSection(offerSectionRef)}>Productos</Button>
              <Button color="inherit" onClick={() => scrollToSection(aboutUsSectionRef)}>Para Desarrolladores</Button>
            </Box>
            <Box>
              <Link to={'/login'}>
                <Button color="inherit">Inicia Sesión</Button>
              </Link>
              <Link to={'/login'}>
                <Button color="inherit">Únete</Button>
              </Link>
            </Box>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Header;