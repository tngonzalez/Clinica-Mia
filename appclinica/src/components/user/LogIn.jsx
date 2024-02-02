// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import image from '/imagenes/SideBarNormal.png';
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../../context/UserContext'
import { Box, CssBaseline, Paper } from '@mui/material'
import toast from 'react-hot-toast'

export function SignInSide () {
  const navigate = useNavigate()
  const {saveUser} =useContext(UserContext)
  // Esquema de validación
  // Esquema de validación
  const loginSchema = yup.object({
    correo: yup.string()
    .required('El correo electrónico es requerido.')
    .min(6, 'El correo debe estar compuesto por más de 6 caracteres')
    .email('El correo electrónico es incorrecto.'),

    clave: yup.string()
    .required('La clave son requerida.')
    .min(5, 'La clave debe estar compuesta por más de 5 caracteres.')
    .max(20, 'La clave no debe contener más de 20 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 
    'La clave debe contener al menos una letra mayúscula, una letra minúscula y un número')

  })
  const { control, handleSubmit, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      correo: '',
      clave: ''
    },
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'usuario/login', action: 'POST', formData, start })
  // Accion submit
  const onSubmit = (formData) => {
    try {
      // Establecer valores del formulario
      console.log(formData)
      setData(formData)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
    } catch (e) {
      // handle your error
      console.log(e)
      setStart(false);
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData!=null && responseData ==="Usuario no valido") {
      // Guardar token
      notify();
      setStart(false);
      setTimeout(() =>{
        document.location.reload();
      })
    }else{
      if(responseData!=null){
      welcome();
      saveUser(responseData)
      return navigate('/')
      }
    }
  }, [responseData])
const notify = () =>toast.error('Usuario no valido. Intentelo nuevamente.', {
    duration: 4000,
    position: 'top-center'
})
const welcome = () =>toast.success('Bienvenido a Clinica Mia', {
  duration: 4000,
  position: 'top-center'
})
  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>

          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundRepeat: "no-repeat",
              backgroundColor:'#FEEAE6',
              backgroundSize: "cover",
              backgroundPosition: "center"
           }}
            
          >        
            <img style={{height:'200px', width:'70%', margin:'10px 80px'}} src={image}/>
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
                marginBottom:'20px',
                marginTop:'-20px'
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
            Bienvenidos a nuestros sistema
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
          </Grid>
          
          <Grid  item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            backgroundColor='#FEDBD0'>

                <Box 
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                    <Typography component="h1" variant="h5" color='#442c2e'
                      sx={{ 
                      flexGrow: 10,
                      fontFamily:'Raleway',
                      fontSize: '30px',
                      textAlign: 'center',
                      textTransform:'uppercase',
                      letterSpacing: '.4rem'
                        }}
                        marginTop={'-25px'}>
                      Clinica Mia
                    </Typography>
                    
                    <Box  textAlign={'center'}  
                    sx={{ 
                      mt: 4,
                      fontFamily:'Raleway',
                      fontSize: '20px'
                    }}
                    color='#442c2e'
                      >
                    <Grid item xs={12} sm={12}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <Controller
                          name='correo'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id='correo'
                              label='Correo'
                              error={Boolean(errors.correo)}
                              helperText={errors.correo ? errors.correo.message : ' '}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
                        <Controller
                          name='clave'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id='clave'
                              label='Clave'
                              type='password'
                              error={Boolean(errors.clave)}
                              helperText={errors.clave ? errors.clave.message : ' '}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                      <Button type='submit' variant='contained' style={{backgroundColor:'#FEEAE6', color:'#442c2e', fontWeight:'bold', padding:'10px 40px'}}>Iniciar Sesión</Button>
                    </Grid>

                    <Grid item style={{marginLeft:'55px', marginTop:'50px', marginBottom:'-40px'}}>
                         <Link to={`/registro`}>¿No tienes cuenta? Registrate.</Link>
                    </Grid>

                  </Box>

                </Box>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
