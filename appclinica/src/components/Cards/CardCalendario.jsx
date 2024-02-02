import React from 'react'
import { Box, Button, Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { useCallApi } from "../../hooks/useCallApi";
import { Link, useParams } from 'react-router-dom';

export default function CardsCalendario(){
    const routeParams = useParams()
    const {data, error, loaded} = useCallApi({ endpoint: `cita/getCitasXid/${routeParams.id}` })

    const [searchTerm, setSearchTerm] = React.useState("")

    return(
    <Grid container spacing={3} marginTop='-150px'>

          <Grid item md={12}>
                <Grid textAlign={'center'}>
                    <input 
                    style={{margin:'20px 190px', width:'60%', textAlign:'center',
                            padding:'10px', fontSize: '15px',fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e' }}
                       type="text"
                       placeholder='Buscar por consultorio'
                        onChange = {(e)=>{
                         setSearchTerm(e.target.value);
                            }}
                       />
                       <Typography textAlign={'right'} margin={'20px'}>
                           <strong> Consultorios disponibles: <br /></strong>
                            Psicología <br/> 
                            Obstetricia <br />
                            Oftamología <br/>
                            Odontología <br />
                            Medicina General <br />
                       </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={12} margin={1} marginTop={'-80px'}>
            {!loaded && <div><strong>Cargando...</strong></div>}
            {data && data.map((item)=>(

                <Grid item margin={'-2px -10px'} md={6} key={item.id}>
                    {(data)
                       .filter(val => {
                        if(searchTerm === ""){
                            return val;
                        }else if(val.consultorio.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                        ){
                            return val;
                        }
                        })
                        .map((item,index)=> {

                            return (
                    <Card item md={4}>
                        <CardHeader
                            style={{
                            backgroundColor: '#FDAF95',
                            color: '#fff',
                            textShadow: '#e38877 0px 2px 0px',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontFamily:'Raleway',
                            marginBottom: '10px',
                            borderBottom: 5,
                        }}
                            title={item.fecha}
                        />

                        <CardContent 
                        style={{

                            backgroundColor: '#FEDBD0',
                            backgroundImage: 'linear-gradient(0deg, rgba(254,219,208,1) 92%, rgba(255,189,183,1) 100%)',
                            color: '#442c2e',
                            textAlign: 'center',
                            fontFamily:'Raleway',
                            marginTop: '-19px'
                        }}>
                            
                            <Typography variant='body1' marginBottom={'15px'} marginTop={'-10px'}>
                              <strong>Hora:</strong> {item.hora}
                            </Typography>
                            <Typography variant='body2'>
                              <strong>Nombre:</strong> {item.nombre}
                            </Typography>

                            <Typography variant='body2'>
                              <strong>Ubicación:</strong> {item.ubicacion}
                            </Typography>

                            <Typography variant='body2'>
                              <strong>Precio: ₡</strong> {item.precio}
                            </Typography>

                            <Typography variant='body2' margin={'10px'}>
                                <strong>Consultorio:</strong> {item.consultorio}
                            </Typography>
                            
                        </CardContent>
       
                        <Grid item sm={12} md={12} alignContent='center' display={'flex'} justifyContent={'center'} >
                            <Button variant='contained' sx={{px: 38}}
                            style={{fontFamily:'Raleway',  color: '#442c2e',
                            fontSize:'20px', backgroundColor:  '#d7ccc8'}}
                            key={item.id} component={Link} to={`/citas/${item.id}`}>Reservar</Button>
                        </Grid>
                    </Card>
                 
                      )
                    })} 
                </Grid>
             ))}
            </Grid>
        </Grid>
    )
}