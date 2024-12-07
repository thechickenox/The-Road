import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logoutImg from '../../../assets/icons/Log-out.png';
import userImg from '../../../assets/icons/users.png';
import profileImg from '../../../assets/icons/profile.png';
import genreImg from '../../../assets/icons/genre.png';
import { Breadcrumbs, capitalize } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dashboard from '../../../assets/icons/Home.png'
import roads from '../../../assets/icons/My-Activities.png'
import activities from '../../../assets/icons/Activities.png'
import { useAuth } from '../../../Services/Auth/AuthProvider';
import BuildIcon from '@mui/icons-material/Build';
const mainItems = [
    {
        route: 'dashboard',
        text: 'Dashboard',
        img: dashboard
    },
    {
        text: 'Rutas',
        route: 'rutas',
        img: roads
    },
    {
        text: 'Actividades',
        route: 'actividades',
        img: activities
    },
    {
        text: 'Generos',
        route: 'generos',
        img: genreImg
    },
    {
        text: 'Usuarios',
        route: 'usuarios',
        img: profileImg
    }
];

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const handleLogout = (e: any) => {
        e.preventDefault();
        logout();
        navigate('/');
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                backgroundColor: 'white'
            }}>
                <Toolbar sx={{
                    background: 'white'
                }}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            color: 'black',
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Breadcrumbs aria-label="breadcrumb">
                        {
                            pathnames.map((pathname, index) => {
                                return (
                                    <Link key={index} to={pathname}>
                                        {capitalize(pathname)}
                                    </Link>
                                )
                            })
                        }
                    </Breadcrumbs>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <List sx={{ flexGrow: 1 }}>
                        {mainItems.map((text, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <Link to={text.route}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                                height: '24px',
                                                width: '24px'
                                            }}
                                        >
                                            <img src={text.img} alt="home" width={'100%'} height={'100%'} />
                                        </ListItemIcon>
                                        <ListItemText primary={text.text} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} onClick={handleLogout}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        height: '24px',
                                        width: '24px'
                                    }}
                                >
                                    <img src={logoutImg} alt={'logout'} width={'100%'} height={'100%'} />
                                </ListItemIcon>
                                <ListItemText primary={'Cerrar Sesión'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
