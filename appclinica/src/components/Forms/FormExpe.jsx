import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useCallApi } from "../../hooks/useCallApi";
import { useSubmitForm } from "../../hooks/useSubmitForm";
import { Button, FormControl, FormHelperText, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { SelectUser } from "../selects/SelectUserC";
import { SelectTipoSangre} from "../selects/SelectTipoSangre";
import { SelectEnfermedades } from "../selects/SelectEnfermedad";
import { SelectAlergia } from "../selects/SelectAlergia";
import { SelectMedicamentos } from "../selects/SelectMedicamento";
import AddIcon from '@mui/icons-material/Add'
import { FormCirugia } from "./FormCirugia";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import toast from 'react-hot-toast'

export function FormExpediente(){
    const navigate = useNavigate()
    const routeParams = useParams()

    //Id para actualizar
    const id= routeParams.id
    const esCrear = !id
    
    //Valores a precargar cuando actualice
    const [values, setValues] = useState(null)

    //Validaciones
    const userSchema = yup.object({

        idUsuario: yup.string()
        .required('El usuario  es requerido.')
        .typeError('Debe seleccionar el usuario'),

        idTipoSangre: yup.string()
        .required('El tipo de sangre es requerido.')
        .typeError('Debe seleccionar el tipo de sangre correspondiente'),

         telefono: yup.string()
        .required('El número de teléfono es requerido.')
        .length(8, 'El número de teléfono debe tener 8 dígitos')
        .matches(/^\d+$/, 'El número de teléfono solo puede contener caracteres numéricos'),

        fechaNac: yup.date()
        .required('La fecha de nacimiento es requerida.')    
        .min(new Date('1900-01-01'), 'La fecha no puede ser anterior a 1900-01-01')
        .max(new Date(), 'La fecha no puede ser posterior a la fecha actual'),


        domicilio: yup.string()
        .required('La dirección de residencia es requerida.')
        .min(5, 'La dirección de residencia debe estar compuesta por más de 5 caracteres.')
 
    })

    //Establece el fomularo
    //Valores por defecto 
    const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
        //Serán los valores iniciales
        defaultValues:{
          idUsuario:'',
          idTipoSangre:'',
          telefono:'',
          fechaNac:'',
          domicilio:'',
          alergias:[],
          medicamentos:[],
          enfermedades:[],
          cirugia:[
            {
                nombre:'',
                lugar:'',
                fecha:'',
                hora:''
                
            }
          ]
        },
        //Valores a precargar para modificar
        values,
        //Asignar validaciones
        resolver:yupResolver(userSchema)
    })

    //UseFieldArray
    const {fields, append,prepend,remove,swap,move,insert } = useFieldArray({
        control, //control props proviene de useForm
        name:'cirugia' //nombre unico del campo Array
  
      })
      //Elimina Cirugia del listado
      const removeCirugia = (index) =>{
        if(fields.length===1){
            return
        }
        remove(index)
      }
      //Agrega Cirugia 
      const addNewCirugia = () => {
        append({
            nombre:'',
            lugar:'',
            fecha:'',
            hora:''
        })
      }

    //Valores del formulario
    const [formData, setData] = useState(null)
    //Acciones : POST PUT  
    const [action, setAction] = useState('POST')
    //Establece la info. que enviara 
    const [start, setStart] = useState(false)
    //Respuesta de la solicitud de actualizar del API 
    const { data, error, loaded } = useCallApi({ endpoint: `expediente/getForm/${id}` })
    //Respuesta de la solicitud 
    const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'expediente', action, formData, start })

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

        return navigate('/expediente')
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
                {esCrear ? 'Crear' : 'Modificar'} Expediente
            </Typography>
        </Grid>
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
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
        
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
            
                name='idTipoSangre'
                control={control}
                render={({ field, index})=>(
                  <SelectTipoSangre
                    key={index}
                    index={index}
                    field={field}
                    error={Boolean(errors.idTipoSangre)}
                    onChange={(e)=>setValue('idTipoSangre', e.target.value,{shouldValidate:true})}
                  />
                )}
               />     
            </FormControl>
          </Grid>
        
        
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
                <Controller
                  name='telefono'
                  control={control}
                  render={({field})=>(
                      <TextField
                      {... field}
                      id='telefono'
                      label='Teléfono'
                      error={Boolean(errors.telefono)}
                      helperText={errors.telefono ? errors.telefono.message : ''}
                      />
                    )}  
                 />
            </FormControl>
        </Grid>
        <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
                name='fechaNac'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='fechaNac'
                    label='Fecha de Nacimiento' 
                    type={'date'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.fechaNac)}
                    helperText={errors.fechaNac ? errors.fechaNac.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
                name='domicilio'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='domicilio'
                    label='Domicilio'
                    error={Boolean(errors.domicilio)}
                    helperText={errors.domicilio ? errors.domicilio.message : ''}
                  />
                )}
               />     
            </FormControl>
          </Grid>
        
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
            
                name='alergias'
                control={control}
                render={({ field, index})=>(
                  <SelectAlergia
                    key={index}
                    index={index}
                    field={field}
                    onChange={(e)=>setValue('alergias',e.target.value,{shouldValidate:true})} 

                  />
                )}
               />     
            </FormControl>
          </Grid>
         
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
                name='medicamentos'
                control={control}
                render={({ field, index})=>(
                  <SelectMedicamentos
                  key={index}
                  index={index}
                  field={field}
                  onChange={(e)=>setValue('medicamentos',e.target.value,{shouldValidate:true})} 

                  />
                )}
               />     
            </FormControl>
          </Grid>
    
                  
          <Grid item sm={12} md={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 2 }}>
            <Controller
                name='enfermedades'
                control={control}
                render={({ field, index})=>(
                  <SelectEnfermedades
                  key={index}
                  index={index}
                  field={field}
                  onChange={(e)=>setValue('enfermedades',e.target.value,{shouldValidate:true})} 

                  />
                )}
               />     
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Typography variant='h5' style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
             margin:'10px 0', fontSize:'30px',  display:'flex', justifyContent:'left'}}>
                Cirugías
                <Tooltip title='Agregar Cirugías'>
                  <span>
                    <ControlPointIcon
                      style={{color: '#442c2e'}}
                      onClick={addNewCirugia}
                    >
                      <AddIcon />
                    </ControlPointIcon>
                  </span>
                </Tooltip>
              </Typography>
              {/* Array de controles de actor. no olvidar key */}
              {fields.map((field,index)=>(
                <FormCirugia
                  key={index}
                  index={index}
                  onRemove={removeCirugia}
                  field={field}
                  control={control}
                  disableRemoveButton={field.length===1}
                  onChange={(e)=>setValue('cirugia',e.target.value,{shouldValidate:true})} 
                />
              ))}
              
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.cirugia ? errors.cirugia.message : ' '}</FormHelperText>
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