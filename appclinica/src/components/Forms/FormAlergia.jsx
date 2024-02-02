import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from "react-hook-form";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { SelectTipoAlergia } from "../selects/SelectTipoAlerg";
import toast from 'react-hot-toast'


export function FormAlergia(){
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
        .min(2, 'El nombre debe estar compuesto por más de 2 caracteres.'),
        
        reaccion: yup.string()
        .required('La reacción es requerida.')
        .min(4, 'La reacción debe estar compuestos por más de 4 caracteres.'),

        observacion: yup.string()
        .required('La observacion es requerida.')
        .min(6, 'La observacion debe estar compuesta por 6 caracteres.'),

        idTipo: yup.string()
        .required('El tipo de alergía es requerido.')
        .typeError('Debe seleccionar el tipo de alergía correspondiente')
    })

    //Establece el fomularo
    //Valores por defecto 
    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
            nombre:'',
            reaccion:'',
            observacion:'',
            idTipo:''
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
    const { data, error, loaded } = useCallApi({ endpoint: `alergia/getAlergia/${id}` })
    //Respuesta de la solicitud 
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'alergia', action, formData, start })

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
        return navigate('/alergia')
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
                {esCrear ? 'Crear' : 'Modificar'} Alergia
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
                name='reaccion'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='reaccion'
                    label='Reacción'
                    error={Boolean(errors.reaccion)}
                    helperText={errors.reaccion ? errors.reaccion.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
                name='observacion'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='observacion'
                    label='Observación'
                    error={Boolean(errors.observacion)}
                    helperText={errors.observacion ? errors.observacion.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
        
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <Controller
            
                name='idTipo'
                control={control}
                render={({ field, index})=>(
                  <SelectTipoAlergia
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idTipo)}
                    onChange={(e)=>setValue('idTipo', e.target.value,{shouldValidate:true})}
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