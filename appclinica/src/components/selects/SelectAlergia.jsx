import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectAlergia(field){
    const {data,error,loaded} = useCallApi({endpoint: 'alergia'})
    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='alergia'>Alergias</InputLabel>
                    <Select
                    {...field}
                    labelId='alergia'
                    label='alergia'
                    multiple
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((alergia) =>(
                    <MenuItem key={alergia.id} value={alergia.id}>
                    {alergia.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
    )
}