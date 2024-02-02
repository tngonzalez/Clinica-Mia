import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectTipoSangre(field){
    const {data,error,loaded} = useCallApi({endpoint: 'tiposangre'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='tiposangre'>Tipo de Sangre</InputLabel>
                    <Select
                    {...field}
                    labelId='tiposangre'
                    label='tiposangre'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((tiposangre) =>(
                    <MenuItem key={tiposangre.id} value={tiposangre.id}>
                    {tiposangre.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}