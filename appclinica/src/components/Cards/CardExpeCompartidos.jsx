import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useCallApi } from "../../hooks/useCallApi";
import { Link, useParams } from "react-router-dom";

export default function CardExpeCompar(){
    const routeParams = useParams()
    const {data, error, loaded} = useCallApi({ endpoint: `expediente/getExpeCompartidos/${routeParams.id}`})

    return(
        <Grid container spacing={3} marginTop='-150px'>
            {!loaded && <div><strong>No existen expedientes compartidos con este usuario.</strong></div>}
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
                        title='Expediente compartido'
                        subheader={item.id}
                        />
                        <CardContent 
                        style={{
                            backgroundColor: '#FEDBD0',
                            color: '#442c2e',
                            textAlign: 'center',
                            fontFamily:'Raleway',
                            marginTop: '-19px'
                        }}>
                             <Typography variant='body1' style={{marginBottom:'20px'}}>
                                <strong>Fecha de envío:</strong> {item.fecha}
                            </Typography> 
                            <Typography variant='body1'>
                              <strong> Enviado por:</strong> {item.nombre } {item.apellidos} - {item.cedula}
                            </Typography>
                         
                        </CardContent>

                        <Grid item sm={12} md={12} alignContent='center' display={'flex'} justifyContent={'center'}>
                            <Button variant='contained' 
                            style={{fontFamily:'Raleway',  color: '#442c2e',
                            fontSize:'20px', backgroundColor:  '#d7ccc8', width:'100%'}}
                            key={item.id} component={Link} to={`/compartido/${item.id}`}>Mas información...</Button>
                        </Grid>

                    </Card>
                </Grid>
             ))}
        </Grid>
    )
}