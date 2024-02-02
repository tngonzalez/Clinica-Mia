import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { Button, Grid, List, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useParams } from "react-router-dom";
import { useCallApi } from "../../hooks/useCallApi";

export function DetalleCita(){
    const routeParams = useParams()
     
    const { data, error, loaded } = useCallApi({ endpoint: `cita/${routeParams.id}` })

    return(
        <>
            {!loaded && <div><strong>Cargando...</strong></div>}
            {data && 
                <div style={{marginTop:'-160px',paddingTop:'50px',backgroundColor:'#FEEAE6', height: '360px', width:'80%', marginLeft:'120px',  borderStyle:'double', marginTop:'25px'}} >
                 
                  <Container component='main'  maxWidth='sm' style={{fontFamily:'Raleway',color: '#442c2e',textAlign:'center'}}>
                    
                    <Typography variant='h5' component='h1' gutterBottom  style={{marginBottom:'50px',fontFamily:'Raleway',color: '#442c2e',textAlign:'center' }}>
                  <strong>  {data.nombre} </strong>
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Fecha:</Box> {data.fecha} - {data.hora}
                    </Typography>


                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Ubicación:</Box>{data.ubicacion}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Precio por consulta:</Box> ₡{data.precio}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Consultorio:</Box> {data.consultorio}
                    </Typography>

                   </Container>
                
                </div>
                
            }
        </>
    )

}