import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectEnfermedades(field){
    const {data,error,loaded} = useCallApi({endpoint: 'enfermedades'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='enfermedades'>Enfermedades</InputLabel>
                    <Select
                    {...field}
                    labelId='enfermedades'
                    label='enfermedades'
                    multiple
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((enfermedades) =>(
                    <MenuItem key={enfermedades.id} value={enfermedades.id}>
                    {enfermedades.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}