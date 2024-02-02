import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectRol(field){
    const {data,error,loaded} = useCallApi({endpoint: 'rol'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='rol'>Rol</InputLabel>
                    <Select
                    {...field}
                    labelId='rol'
                    label='rol'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((rol) =>(
                    <MenuItem key={rol.id} value={rol.id}>
                    {rol.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}