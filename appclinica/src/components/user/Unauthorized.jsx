import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import WarningIcon from '@mui/icons-material/Warning';

export function Unauthorized () {
  return (
    <Container sx={{ p: 2 }} maxWidth='sm'>
      <Typography
       align='center'
       gutterBottom
       marginBottom={'20px'}
       marginTop={'-70px'}
       >
      <WarningIcon sx={{ fontSize: 200}}/>
      </Typography>

      <Typography
        component='h3'
        variant='h3'
        align='center'
        color='text.primary'
        gutterBottom
        style={{fontFamily:'Raleway', color: '#442c2e'}}
      >
        Autorización Denegada
      </Typography>
      <Typography variant='h5' align='center' color='text.secondary' marginTop={'50px'} paragraph  
      style={{fontFamily:'Raleway', color: '#442c2e'}}>
        Usuario sin autorización. Inténtelo con otro usuario.
      </Typography>
    </Container>
  )
}
