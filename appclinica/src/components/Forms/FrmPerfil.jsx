import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import {SelectGenero} from '../selects/SelectGenero'
import {SelectRol} from '../selects/SelectRol'
import toast from 'react-hot-toast'

export function FrmPerfil(){
    const navigate = useNavigate()
    const routeParams = useParams()

    //Id para actualizar
    const id= routeParams.id
    const esCrear = !id
    
    //Valores a precargar cuando actualice
    const [values, setValues] = useState(null)

    //Validaciones
    const userSchema = yup.object({
      nombre: yup.string()
      .required('El nombre es requerido.')
      .min(2, 'El nombre debe estar compuesto por más de 2 caracteres.')
      .max(20, 'El nombre no debe contener más de 20 caracteres.'),

      apellidos: yup.string()
      .required('Los apellidos son requeridos.')
      .min(3, 'Los apellidos deben estar compuestos por más de 3 caracteres.')
      .max(20, 'Los apellidos no deben contener más de 20 caracteres.'),
 

      cedula: yup.number()
      .required('La cédula es requerida.')
      .min(9, 'La cédula debe estar compuesta por 9 caracteres.')
      .typeError('La cédula debe estar compuesta exclusivamente por números.'),

      correo: yup.string()
      .required('El correo electrónico es requerido.')
      .min(6, 'El correo debe estar compuesto por más de 6 caracteres')
      .email('El correo electrónico es incorrecto.'),

      idGenero: yup.string()
      .required('El género es requerido.')
      .typeError('Debe seleccionar el género correspondiente')
  })

    //Establece el fomularo
    //Valores por defecto 
    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
            nombre:'',
            apellidos:'',
            cedula:'',
            correo:'',
            clave:'',
            idGenero:'',
            idRol:''
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
    const { data, error, loaded } = useCallApi({ endpoint: `usuario/getForm/${id}` })
    //Respuesta de la solicitud 
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'usuario', action, formData, start })

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
            }else{
                setAction('PUT')
            }
        } catch (e) {
            //Error
        }
    }

      // Si ocurre error al realizar el submit
      const onError = (errors, e) => console.log(errors, e)

  //Indica la accion, trae datos para precargar
  useEffect(()=>{
    //Verificar si recibe la respuesta
    if(responseData != null){
      toast.success(responseData, {
        position:'top-center',
        duration:5000
        });
        return navigate('/')
    }

    //Establece valores iniciales. Precargar
  if(!esCrear && data){
      setValues(data)
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
                Datos personales
            </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                <Controller
                  name='nombre'
                  control={control}
                  render={({field})=>(
                      <TextField
                      {... field}
                      id='nombre'
                      label='Nombre'
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
                name='apellidos'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='apellidos'
                    label='Apellidos'
                    error={Boolean(errors.apellidos)}
                    helperText={errors.apellidos ? errors.apellidos.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='cedula'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='cedula'
                    label='Cédula'
                    error={Boolean(errors.cedula)}
                    helperText={errors.cedula ? errors.cedula.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='correo'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='correo'
                    label='Correo'
                    error={Boolean(errors.correo)}
                    helperText={errors.correo ? errors.correo.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>

          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
            
                name='idGenero'
                control={control}
                render={({ field, index})=>(
                  <SelectGenero
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idGenero)}
                    onChange={(e)=>setValue('idGenero', e.target.value,{shouldValidate:true})}
                  />
                )}
               />     
            </FormControl>
          </Grid>
         
          <Grid item sm={12} md={12} alignContent='center' display={'flex'} justifyContent={'center'}>
            <Button type='submit' variant='text' sx={{px: 20}}
             style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
            fontSize:'30px', backgroundColor: '#FEDBD0', textTransform:'none', marginTop:'40px'}}>Guardar</Button>
          </Grid>
    </Grid>
    </form>

    </>
)

} 