import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Controller } from 'react-hook-form'
import TodayIcon from '@mui/icons-material/Today';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export function FormCirugia ({ control, index, onRemove, disableRemoveButton, field }) {
  return (
    <section >
      <Grid container spacing={4} alignContent={'center'} display={'flex'} justifyContent={'center'}>
        <List>
          <ListItem style={{margin:'20px 150px 0 230px'}}>
            <ListItemIcon>
              <Tooltip title={`Cirugía ${index + 1}`} >
                <IconButton>
                  <TodayIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
            <ListItemText >
              <Controller
                key={index}
                name={`cirugia[${index}].nombre`}
                control={control}
                render={({ field }) => (
                    <TextField
                    {...field}
                    label='Nombre'
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cirugia[${index}].lugar`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Lugar'
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }}>
              <Controller
                key={index}
                name={`cirugia[${index}].fecha`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Fecha'
                    type={'date'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </ListItemText>
            <ListItemText sx={{ m: 1 }} style={{}}>
              <Controller
                key={index}
                name={`cirugia[${index}].hora`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Hora'
                    type={'time'}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </ListItemText>
            <ListItemIcon>
              <Tooltip title={`Eliminar Cirugía ${index + 1}`}>
                <span>
                  <IconButton
                    key={index}
                    edge='end' disabled={disableRemoveButton}
                    onClick={() => onRemove(index)} aria-label='Eliminar'
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </ListItemIcon>
          </ListItem>
        </List>
      </Grid>
    </section>
  )
}
