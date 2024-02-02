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
import { Box, FormControlLabel, Switch, TableSortLabel, Toolbar, Typography } from '@mui/material';
import { useCallApi } from '../../hooks/useCallApi';
import { useParams } from 'react-router-dom';


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
    id: 'fecha',
    numeric: false,
    disablePadding: false,
    label: 'Fecha'
  },
  {
    id: 'hora',
    numeric: false,
    disablePadding: false,
    label: 'Hora'
  },
  {
    id: 'consultorio',
    numeric: false,
    disablePadding: false,
    label: 'Consultorio'
  },
  {
    id: 'ubicacion',
    numeric: false,
    disablePadding: false,
    label: 'Ubicación'
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
            onClick={createSortHandler(headCell.id)}
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
  onRequestSort: PropTypes.func.isRequired
}

function TableToolbar(){

  return(
    <Toolbar>
      <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
            style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
            margin:'15px 0 19px 0', textAlign:'center'}}
        >
            Citas Canceladas
        </Typography>
    </Toolbar>
  );
}


export default function TableCancel(){

  const routeParams = useParams()
  const { data, error, loaded } = useCallApi({ endpoint: `cita/cancel/${routeParams.id}` })
  const [dense, setDense] = React.useState(false)

  const [searchTerm, setSearchTerm] = React.useState("")


  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }
  


  // Avoid a layout jump when reaching the last page with empty data.
 
return(
  <>
      {!loaded && <div> <strong>Cargando...</strong></div>}
      {data && data.length > 0 && 
      <Box sx={{ width: '100%'}}
      style={{marginTop:'-130px'}}>
        <Paper  sx={{ width: '100%', mb: 2 }}>

        <TableToolbar />
         <input 
        type={'text'}
        placeholder='Buscar por fecha'
        style={{margin:'20px 190px', width:'60%', textAlign:'center',
         padding:'10px', fontSize: '15px',fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e' }}
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
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <StyledTableRow>
                  {/*Aca se mencionan cada una de los celdas*/}   
                  <StyledTableCell/>
                     
                  <StyledTableCell  
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                      >   
                    {row.nombre}
                  </StyledTableCell>
                  <StyledTableCell>{row.fecha}</StyledTableCell>
                  <StyledTableCell>{row.hora}</StyledTableCell>
                  <StyledTableCell>{row.consultorio}</StyledTableCell>
                  <StyledTableCell>{row.ubicacion}</StyledTableCell>

                </StyledTableRow>
                  )
                })}

 
            </TableBody>
          </Table>
        </TableContainer>

        </Paper>
        <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
          />
      </Box> } 
  </>
  )}

