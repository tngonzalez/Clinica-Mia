import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Grid,  MenuList } from '@mui/material';
import { Container } from '@mui/system';
import { Toaster } from 'react-hot-toast'
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ResponsiveDrawer  from '../lists/listItems.jsx'



const drawerWidth = 230;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


const mdTheme = createTheme();

export default function Dashboard({children}) {
  const {user, decodeToken, autorize} = useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())

  const [open, setOpen] = React.useState(false);
  const handleControlNav = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    setUserData(decodeToken())
  },[user])

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:'#FEDBD0', color:'#442c2e'}}>
          
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          > 
            <IconButton //Menu Hamburguesa
              edge="start"
              color='#442c2e'
              aria-label="open drawer"
              onClick={handleControlNav}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> 
          <Typography //Nombre Clinica
              component="h1" 
              variant="h6"
              noWrap
              sx={{ 
                flexGrow: 10,
                fontFamily:'Raleway',
                fontSize: '35px',
                textAlign: 'center',
                textTransform:'uppercase',
                letterSpacing: '.4rem'
                 }}>
              <a href="/" style={{color:'#442c2e', textDecoration: 'none' }}>
            <img src="/imagenes/Logo.png" style={{marginTop:"5px", marginBottom:"-6px"}}/>  
              Clinica Mia
              </a>
            </Typography>

            <Box //Avatar del usuario
             sx={{ flexGrow: 0 }}> 
            <Tooltip title="Más información">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountBoxSharpIcon fontSize="large" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              color='#442c2e'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {/* Perfil + Cerrar Sesión */}
              {userData && ( 
              <MenuList component='a' href={`/perfil/${userData?.id}`}>
                  <MenuItem >
                    <Typography textAlign='center'>
                      Perfil
                    </Typography>
                  </MenuItem>
                  <MenuItem component='a' href='/logout'>
                    <Typography textAlign='center'>Cerrar Sesión</Typography>
                  </MenuItem>
              </MenuList>  
              )}

            </Menu>
              
          </Box>
          </Toolbar>
        </AppBar>
        
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],

            }}
            style={{backgroundColor:'#FEEAE6', color:'#442c2e'}}
          >
           <IconButton>
           <img src="/imagenes/SideBarLogo.png" style={{marginBottom:"-13px"}}/>  
            </IconButton>

            <IconButton onClick={handleControlNav}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" style={{backgroundColor:'#FEEAE6', color:'#442c2e', height:'1300px'}}>
          
          <ResponsiveDrawer/>

          </List>
        </Drawer>
        
       
         <Box
          component="main"
          sx={{
            backgroundColor: '#d7ccc8',
            flexGrow: 1,
            height: 'auto',
            overflow: 'auto',
          }}
        >
            <Toaster/>

        <Toolbar />
        
          <Container >
            <Grid style={{margin:'200px 0 0 0 '}}>
              {/* Agregar los routes correspondientes */}
              <Grid >
              {children}
              </Grid>
              </Grid>
          </Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
