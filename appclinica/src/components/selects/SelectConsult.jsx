import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectConsult(field){
    const {data,error,loaded} = useCallApi({endpoint: 'consultorio'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='consultorio'>Consultorio</InputLabel>
                    <Select
                    {...field}
                    labelId='consultorio'
                    label='consultorio'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((consultorio) =>(
                    <MenuItem key={consultorio.id} value={consultorio.id}>
                    {consultorio.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}