
import { Button, FormControl, Grid, List, ListItemText, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from '../../hooks/useSubmitForm';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { SelectUser } from '../selects/SelectUserC';

export function DetalleExpeCompartido(){
    const navigate = useNavigate()
    const routeParams = useParams()

    //Id para actualizar
    const id= routeParams.id
    const esCrear = !id
    
    //Valores a precargar cuando actualice
    const [values, setValues] = useState(null)

    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
          id:'',
          idUsuario:''
        },
        //Valores a precargar para modificar
        values
    })

    const [formData, setData] = useState(null)
    //Acciones : POST PUT  
    const [action, setAction] = useState('POST')
    //Establece la info. que enviara 
    const [start, setStart] = useState(false)

    const { data, error, loaded } = useCallApi({ endpoint: `expediente/${routeParams.id}` })
    
   const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'expediente/enviarExpe/', action, formData, start })


    //Accion Submit 
    const onSubmit = (DataForm) => {
        try {
            console.log(DataForm)

            //Establece los valores de form 
            setData(DataForm)
            //Indica que se puede realizar la solicitud del API
            setStart(true)
            //Establece el tipo de metodo HTTP
            if (esCrear) {
                  setAction('POST')
            }
        } catch (e) {
        }
    }

      // Si ocurre error al realizar el submit
      const onError = (errors, e) => console.log(errors, e)

  //Indica la accion, trae datos para precargar
  useEffect(()=>{
    //Verificar si recibe la respuesta
    setValues(data)

    if(responseData != null){
      toast.success(responseData, {
        position:'top-center',
        duration:5000
        })
      return navigate('/')
    }
   
  
  },[responseData, data,esCrear])

    return(
        <>
            {!loaded && <div><strong>Cargando...</strong></div>}
            {data && 
                <div style={{fontFamily:'Raleway', color: '#442c2e',
                textAlign:'center', marginTop:'-160px',paddingTop:'20px',width:'80%', marginLeft:'120px'}}>

                  <form onSubmit={handleSubmit(onSubmit, onError)}>
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

                    <Typography variant='body1' height={'160px'} marginBottom={'auto'}>
                       <Box fontWeight='bold'>Alergias:</Box>
                       <List sx={{ width: '100%', maxWidth: 650, bgcolor: '#d7ccc8' }}>
                           {data.alergias.map((item)=>( 
                           <ListItemText key={item.id}  primary={"    °  " +  item.nombre +": "+ item.reaccion +". "+ item.observacion +"  Corresponde a : " + item.tipoAlergia} />
                           ))}
                       </List>
                   </Typography>

                   <Typography variant='body1' height={'160px'} marginTop={'60px'}>
                       <Box fontWeight='bold'>Medicamentos:</Box>
                       <List sx={{ width: '100%', maxWidth: 650, bgcolor: '#d7ccc8' }}>
                           {data.medicamentos.map((item)=>( 
                           <ListItemText key={item.id}  primary={"    °  "+ item.nombre +" : "+ item.prescripcion} />
                           ))}
                       </List>
                   </Typography>

                   <Typography variant='body1' height={'160px'}>
                       <Box fontWeight='bold'>Enfermedades:</Box>
                       <List sx={{ width: '100%', maxWidth: 650, bgcolor: '#d7ccc8' }}>
                           {data.enfermedades.map((item)=>( 
                           <ListItemText key={item.id}  primary={"    °  "+item.nombre + ":  " + item.observacion} />
                           ))}
                       </List>
                   </Typography>

                   <Typography variant='body1'>
                       <Box fontWeight='bold'>Cirugías:</Box>
                       <List sx={{ width: '100%', maxWidth: 650, bgcolor: '#d7ccc8' }}>
                           {data.cirugia.map((item)=>( 
                           <ListItemText key={item.id}  primary={ "    °  " + item.nombre +".  Lugar:" +  item.lugar + ".  Fecha: " +  item.fecha + ".  Hora:" + item.hora} />
                           ))}
                       </List>
                   </Typography>

                   </Container>

                  </form>
                
                </div>
                
            }
        </>
    )

}