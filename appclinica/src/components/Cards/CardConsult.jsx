import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useCallApi } from "../../hooks/useCallApi";

export function CardConsult(){
    const {data, error, loaded} = useCallApi({ endpoint: 'consultorio' })

    return(
        <Grid container spacing={3} marginTop='-150px'>
            {!loaded && <div><strong>Cargando...</strong></div>}
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
                              <strong> Ubicación:</strong> {item.ubicacion}
                            </Typography>
                            <Typography variant='body2'>
                                <strong>Especialidad:</strong> {item.especialidad}
                            </Typography>
                            <Typography variant='body2'>
                                <strong>Precio por consulta:</strong> ₡ {item.precio}
                            </Typography>
                            <Typography variant='body2'>
                               <strong> Medico encargado:</strong> {item.medico} {item.apellidos}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
             ))}
        </Grid>
    )
}