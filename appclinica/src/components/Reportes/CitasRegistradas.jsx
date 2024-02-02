import * as React from 'react';
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, TableSortLabel, TextField, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallApi } from '../../hooks/useCallApi';
import { GridToolbar } from '@mui/x-data-grid';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FEDBD0',
    color: '#442c2e',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily:'Raleway'
    

  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily:'Raleway',
    color: '#442c2e',
    fontSize:'16px'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,

  },
}));


//Insertar la info. en la tabla 
const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre'
  },
  {
    id: 'apellidos',
    numeric: false,
    disablePadding: false,
    label: 'Apellidos'
  },
  {
    id: 'cedula',
    numeric: false,
    disablePadding: false,
    label: 'Cédula'
  },
  {
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha'
  },
  {
    id: 'consultorio',
    numeric: false,
    disablePadding: false,
    label: 'Consultorio'
  },
  {
    id: 'cantidadCitas',
    numeric: false,
    disablePadding: false,
    label: 'Cantidad de citas'
  }

]

function TableHeader(props) {
  const {onRequestSort} = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return (
       <TableHead>
          <TableRow>
            <StyledTableCell padding='checkbox'>

            </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
            
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
             
            </TableSortLabel>
          </StyledTableCell>
        ))}
           </TableRow>
        </TableHead>
  )
}

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,

}

function TableToolbar(props){
  const {numSelected} = props


  return(
    <Toolbar 
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
      ...(numSelected > 0 && {
        backgroundColor:'#FEEAE6'
      })
     }} 

    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h5'
        id='tableTitle'
        component='div'
        style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
        margin:'20px 0 19px 0', textAlign:'center'}}
      >
        Citas Registradas por Día
      </Typography>
    </Toolbar>
  )
}
TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired
}

export default function TableCitas(){
 
  const { data, error, loaded } = useCallApi({ endpoint: 'cita' })
  const [selected, setSelected] = React.useState([])
  const [dense, setDense] = React.useState(false)
 
  const [searchTerm, setSearchTerm] = React.useState("")

  const isSelected = (name) => selected.indexOf(name) !== -1
 
return(
  <>
      {!loaded && <div> <strong>Cargando...</strong></div>}
      {data && data.length >= 1 && 
      <Box sx={{ width: '100%'}}
      style={{marginTop:'-130px'}}>
        <Paper  sx={{ width: '100%', mb: 2 }}>

        <TableToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} slots={{toolbar:GridToolbar}}/>
        <TextField 
        label='Buscar por fecha creación'
        type={'date'}
        InputLabelProps={{
            shrink: true,
          }}
        style={{margin:'20px 180px', width:'60%', textAlign:'center',
         padding:'10px', fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e' }}
        onChange = {(e)=>{
            setSearchTerm(e.target.value);
        }}
       />

        <TableContainer>
          <Table
           sx={{ minWidth: 750 }} 
           aria-label="tableTitle"
           size={dense ? 'small' : 'medium'}
           >
            <TableHeader
             numSelected={selected.length}
             rowCount={data.length}
            />

            <TableBody>
            {(data)
                    .filter(val => {
                        if(searchTerm === ""){
                            return val; 
                        }else if (
                            val.fecha.toLowerCase().includes(searchTerm.toLocaleLowerCase())
                        ){  
                            return val;
                        }
                    }).map((row, index) => {
                      const isItemSelected = isSelected(row.id)
                      const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <StyledTableRow>

                  <StyledTableCell>
                     
                  </StyledTableCell>
                  <StyledTableCell  
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      >   
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell>{row.apellidos}</StyledTableCell>
                  <StyledTableCell>{row.cedula}</StyledTableCell>
                  <StyledTableCell>{row.fecha}</StyledTableCell>
                  <StyledTableCell>{row.consultorio}</StyledTableCell>
                  <StyledTableCell style={{textAlign:'center'}}>{row.cantidadCitas} </StyledTableCell>

                </StyledTableRow>
                  )
                })}

 
            </TableBody>
          </Table>
        </TableContainer>

        </Paper>
       
      </Box> } 
  </>
  )}

