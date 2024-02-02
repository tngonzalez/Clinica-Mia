import { Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallApi } from "../../hooks/useCallApi";
import { Link, useParams } from "react-router-dom";

export function CardCancelarCita(){
    const routeParams = useParams()
    const {data, error, loaded} = useCallApi({ endpoint: `cita/getCita/${routeParams.id}`})

    return(
        <Grid container spacing={3} marginTop='-150px'>
            {!loaded && 
            <div>
                <strong>No posee citas reservadas</strong>
                <br/>
                <CircularProgress color="secondary" />
            </div>
            }
            {data && data.map((item)=>(
                <Grid item xs={6} key={item.id}>
                    <Card>
                        <CardHeader
                            style={{
                            backgroundColor: '#FEDBD0',
                            color: '#442c2e',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontFamily:'Raleway'
                        }}
                            title={item.nombre}
                        />
                        <CardContent 
                        style={{
                            backgroundColor: '#FEDBD0',
                            color: '#442c2e',
                            textAlign: 'center',
                            fontFamily:'Raleway',
                            marginTop: '-19px'
                        }}>
                            <Typography variant='body2'>
                              <strong> Fecha:</strong> {item.fecha}
                            </Typography>
                            <Typography variant='body2'>
                                <strong>Hora:</strong> {item.hora}
                            </Typography>
                            <Typography variant='body2'>
                                <strong>Observación:</strong> {item.observacion}
                            </Typography>                           
                        </CardContent>

                        <Grid item sm={12} md={12} alignContent='center' display={'flex'} justifyContent={'center'}>
                            <Button variant='contained' 
                            style={{fontFamily:'Raleway',  color: '#442c2e',
                            fontSize:'20px', backgroundColor:  '#d7ccc8', width:'100%'}}
                            key={item.id} component={Link} to={`/cancelar/${item.id}`}>Cancelar Cita</Button>
                        </Grid>

                    </Card>
                </Grid>
             ))}
        </Grid>
    )
}