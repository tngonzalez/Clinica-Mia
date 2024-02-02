
import { Button, FormControl, Grid, List, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from '../../hooks/useSubmitForm';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { SelectUsuarios } from "../selects/SelectUsuarios";

export function DetalleUser(){
    const navigate = useNavigate()
    const routeParams = useParams()

    const { data, error, loaded } = useCallApi({ endpoint: `expediente/getXIdUser/${routeParams.id}` })
    
    return(
        <>
            {!loaded && <div><strong>Cargando...</strong></div>}
            {data && 
                <div style={{fontFamily:'Raleway', color: '#442c2e',
                textAlign:'center', marginTop:'-100px',paddingTop:'20px',width:'80%', marginLeft:'120px'}}>

                  <Container component='main'  maxWidth='sm' alignContent='center' display={'flex'} justifyContent={'center'} style={{
                    paddingTop:'20px', paddingBottom:'20px', backgroundColor:'#FEEAE6', height: 'auto', width:'100%',  borderStyle:'double'}}>
                    
                    <Typography variant='h5' component='h1' gutterBottom >
                    {data.nombre} {data.apellidos} - {data.cedula}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>E-mail:</Box> {data.correo}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Género:</Box> {data.genero}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Tipo de sangre:</Box> {data.tipoSangre}
                    </Typography>

                    <Typography variant='body1'>
                       <Box fontWeight='bold' display='inline'>Fecha de nacimiento:</Box> {data.fechaNac}
                    </Typography>

                    <Typography variant='body1' height={'40px'}>
                       <Box fontWeight='bold' display='inline'>Domicilio:</Box> {data.domicilio}
                    </Typography>

                   </Container>

                </div>  
            }
        </>
    )

}