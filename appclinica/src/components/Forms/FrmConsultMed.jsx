import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { SelectEspe } from "../selects/SelectEspe";
import { SelectUser } from "../selects/SelectUserMed";
import toast from 'react-hot-toast'

export function FrmConsultMed(){
    const navigate = useNavigate()
    const routeParams = useParams()

    //Id para actualizar
    const id= routeParams.id
    const esCrear = !id
    
    //Valores a precargar cuando actualice
    const [values, setValues] = useState(null)

    //Validaciones
    const consultSchema = yup.object({
        nombre: yup.string()
        .required('El nombre es requerido.')
        .min(2, 'El nombre debe estar compuesto por más de 2 caracteres.'),
        
        ubicacion: yup.string()
        .required('La ubicación es requerida.')
        .min(4, 'La ubicación debe estar compuesta por más de 4 caracteres.')
        .max(20, 'La ubicación no debe contener más de 20 caracteres.'),

        precio: yup.number()
        .typeError('El precio debe estar compuesta exclusivamente por números.')
        .required('El precio es requerida.'),

        idEspecialidad: yup.string()
        .required('La especialidad es requerida.')
        .typeError('Debe seleccionar la especialidad correspondiente'),

        idUsuario: yup.string()
        .required('El medico responsable es requerido.')
        .typeError('Debe seleccionar el medico responsable')
    })

    //Establece el fomularo
    //Valores por defecto 
    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
            nombre:'',
            ubicacion:'',
            precio:'',
            idEspecialidad:'',
            idUsuario:''
        },
        //Valores a precargar para modificar
        values,
        //Asignar validaciones
        resolver:yupResolver(consultSchema)
    })

    //Valores del formulario
    const [formData, setData] = useState(null)
    //Acciones : POST PUT  
    const [action, setAction] = useState('POST')
    //Establece la info. que enviara 
    const [start, setStart] = useState(false)
    //Respuesta de la solicitud de actualizar del API 
    const { data, error, loaded } = useCallApi({ endpoint: `consultorio/getForm/${id}` })
    //Respuesta de la solicitud 
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'consultorio', action, formData, start })

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
                {esCrear ? 'Crear' : 'Modificar'} Consultorio
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
                name='ubicacion'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='ubicacion'
                    label='Ubicación'
                    error={Boolean(errors.ubicacion)}
                    helperText={errors.ubicacion ? errors.ubicacion.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='precio'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='precio'
                    label='Precio'
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
            
                name='idEspecialidad'
                control={control}
                render={({ field, index})=>(
                  <SelectEspe
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idEspecialidad)}
                    onChange={(e)=>setValue('idEspecialidad', e.target.value,{shouldValidate:true})}
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