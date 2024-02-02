import React, { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import image from '/imagenes/LogoHome.png';
import { Box, Chip, List } from '@mui/material';
import { UserContext } from '../context/UserContext';

export function Home () {
  const {user, decodeToken, autorize} = useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())

  return (
    <Container sx={{ p: 2 }} maxWidth='sm' color='#442c2e'>

      <img style={{height:'500px', width:'500px', marginTop:'-290px', marginBottom:'-150px'}} src={image}/>
      <Typography
         component="h1" 
         variant="h6"
         noWrap
         sx={{ 
           flexGrow: 10,
           fontFamily:'Raleway',
           fontSize: '35px',
           textAlign: 'center',
           fontStyle:'italic',
           textTransform:'uppercase',
           letterSpacing: '.4rem',
           marginBottom:'60px'
            }}
        gutterBottom
      >
        Clinica Mia
      </Typography>

      <Typography 
               sx={{ 
                flexGrow: 10,
                fontFamily:'Raleway',
                fontSize: '20px',
                textAlign: 'center',
                fontStyle:'italic',
                textTransform:'uppercase',
                letterSpacing: '.4rem'
                 }}
      paragraph>
       Bienvenido a nuestros sistema
      </Typography>

      <Typography 
               sx={{ 
                flexGrow: 10,
                fontFamily:'Raleway',
                fontSize: '20px',
                textAlign: 'center',
                fontStyle:'italic',
                textTransform:'-moz-initial',
                letterSpacing: '.4rem'
                 }}
                 
      paragraph>
       Es un placer serviles.
      </Typography>

    <Box style={{fontFamily:'Raleway', flexGrow: 10, marginTop:'150px'}}>

      <Typography style={{fontFamily:'Raleway',fontSize: '20px', textAlign: 'center',
                fontStyle:'italic', marginBottom:'20px'}}>
       <strong>Contacto</strong>
      </Typography>
      <Typography>
       <List>
         <li style={{marginBottom:'20px'}}>
          <strong>E-mail:</strong> <a href="mailto:miaclinica09@gmail.com" style={{textDecoration:'none',color:'#442c2e', fontStyle:'italic'}}>miaclinica09@gmail.com</a>
         </li>
         <li style={{marginBottom:'20px'}}>
            <strong>Teléfono:</strong> <a href="tel:2450-0021" style={{textDecoration:'none',color:'#442c2e', fontStyle:'italic'}}>(506) 2450-0021</a>
         </li>
         <li style={{marginBottom:'20px'}}>
          <strong>Dirección:</strong> Edificio La Paz, Torre Médica #2.
         </li>
       </List>
      </Typography>
    </Box>
    </Container>
  )
}
