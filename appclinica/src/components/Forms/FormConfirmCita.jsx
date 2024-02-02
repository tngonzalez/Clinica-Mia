import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import {SelectConsult} from '../selects/SelectConsult'
import toast from 'react-hot-toast'
import { SelectUser } from "../selects/SelectUserC";

export function FormConfirmCita(){
    const navigate = useNavigate()
    const routeParams = useParams()

    //Id para actualizar
    const id= routeParams.id
    const esCrear = id
    
    //Valores a precargar cuando actualice
    const [values, setValues] = useState(null)

    //Validaciones
    const userSchema = yup.object({
        idUsuario: yup.string()
        .required('Debe seleccionar su número de identificación para asignar correctamente la cita.')
        .typeError('Debe seleccionar su número de identificación para asignar correctamente la cita.')
    })

    //Establece el fomularo
    //Valores por defecto 
    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
            id:'',
            nombre:'',
            fecha:'',
            cedula:'',
            hora:'',
            idConsultorio:'',
            idUsuario:''
        },
        //Valores a precargar para modificar
        values,
        //Asignar validaciones
        resolver:yupResolver(userSchema)
    })

    //Valores del formulario
    const [formData, setData] = useState(null)
    //Acciones : POST PUT  
    const [action, setAction] = useState('POST')
    //Establece la info. que enviara 
    const [start, setStart] = useState(false)
    //Respuesta de la solicitud de actualizar del API 
    const { data, error, loaded } = useCallApi({ endpoint: `cita/getForm/${id}` })
    //Respuesta de la solicitud 
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'cita/createCU', action, formData, start })

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
            else{ 
                setAction('PUT')
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

    if(responseData != null && responseData != 'Error en el servidor'){
      toast.success(responseData, {
        position:'top-center',
        duration:5000
        })
      return navigate('/')
    }
   
  
  },[responseData, data,esCrear])

return(
    <>
    <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
    <Grid container spacing={2} style={{marginTop:'-150px'}}>
        <Grid item xs={12} sm={12}>
            <Typography variant='h4' gutterBottom
             style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
             margin:'15px 0 19px 0', textAlign:'center', fontSize:'38px'}}>
                Reservar Cita
            </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                <Controller
                  name='nombre'
                  control={control}
                  render={({field})=>(
                      <TextField
                      disabled
                      {... field}
                      id='nombre'
                      label='Nombre'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Boolean(errors.nombre)}
                      helperText={errors.nombre ? errors.nombre.message : ''}
                      />
                    )}  
                 />
            </FormControl>
        </Grid>
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='fecha'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    disabled
                    id='fecha'
                    label='Fecha'
                    type={'date'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.fecha)}
                    helperText={errors.fecha ? errors.fecha.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='hora'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    disabled
                    id='hora'
                    label='Hora'
                    type={'time'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.hora)}
                    helperText={errors.hora ? errors.hora.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='idConsultorio'
                control={control}
                render={({ field, index})=>(
                  <SelectConsult
                    disabled
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idConsultorio)}
                    onChange={(e)=>setValue('idConsultorio', e.target.value,{shouldValidate:true})}
                  />
                )}
               />     
            </FormControl>
          </Grid>

          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
            
                name='idUsuario'
                control={control}
                render={({ field, index})=>(
                  <SelectUser
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idUsuario)}
                    onChange={(e)=>setValue('idUsuario', e.target.value,{shouldValidate:true})}
                  />
                )}
               />     
            </FormControl>
          </Grid>
        
          
          <Grid item sm={12} md={12} alignContent='center' display={'flex'} justifyContent={'center'}>
            <Button type='submit' variant='text' sx={{px: 20}}
             style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
            fontSize:'30px', backgroundColor: '#FEDBD0', textTransform:'none' }}>Guardar</Button>


          </Grid>
    </Grid>
    </form>

    </>
)

} 