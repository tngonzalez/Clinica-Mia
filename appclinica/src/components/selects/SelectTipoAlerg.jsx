import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectTipoAlergia(field){
    const {data,error,loaded} = useCallApi({endpoint: 'tipoalergia'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='tipoalergia'>Tipo de Alergia</InputLabel>
                    <Select
                    {...field}
                    labelId='tipoalergia'
                    label='tipoalergia'
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((tipoalergia) =>(
                    <MenuItem key={tipoalergia.id} value={tipoalergia.id}>
                    {tipoalergia.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}