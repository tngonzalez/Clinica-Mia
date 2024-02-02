import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectGenero(field){
    const {data,error,loaded} = useCallApi({endpoint: 'genero'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='genero'>Género</InputLabel>
                    <Select
                    {...field}
                    labelId='genero'
                    label='genero'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((genero) =>(
                    <MenuItem key={genero.id} value={genero.id}>
                    {genero.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}