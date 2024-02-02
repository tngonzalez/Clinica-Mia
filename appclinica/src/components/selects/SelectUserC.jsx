import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectUser(field){
    const {data,error,loaded} = useCallApi({endpoint: 'usuario/getClientes/2'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='usuario'>Usuario</InputLabel>
                    <Select
                    {...field}
                    labelId='usuario'
                    label='usuario'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((usuario) =>(
                    <MenuItem key={usuario.id} value={usuario.id}>
                    {usuario.cedula}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}