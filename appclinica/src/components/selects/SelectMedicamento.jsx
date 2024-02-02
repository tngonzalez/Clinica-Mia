import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from "../../hooks/useCallApi";

export function SelectMedicamentos(field){
    const {data,error,loaded} = useCallApi({endpoint: 'medicamento'})

    return(
        <>
            {loaded && (
                <> 
                <InputLabel id='medicamento'>Medicamentos</InputLabel>
                    <Select
                    {...field}
                    labelId='medicamento'
                    label='medicamento'
                    multiple
                    defaultValue={[]}
                    value={field.field.value}
                    >
                    {data.map((medicamento) =>(
                    <MenuItem key={medicamento.id} value={medicamento.id}>
                    {medicamento.nombre}
                    </MenuItem>
                    ))}
                    </Select>
                </>
            )}
        </>
      )
}