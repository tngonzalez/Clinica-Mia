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
import { Box, Checkbox, FormControlLabel, IconButton, Switch, TablePagination, TableSortLabel, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {useCallApi} from '../hooks/useCallApi'
import EditIcon from '@mui/icons-material/Edit'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

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
  },
  {
    id: 'precio',
    numeric: false,
    disablePadding: false,
    label: 'Precio'
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
  onRequestSort: PropTypes.func.isRequired,

}

function TableToolbar(props){
  const navigate = useNavigate()
  const routeParams = useParams()
  const {numSelected} = props
  const {idSelected} = props
  const update = () => {
    console.log(idSelected)
    return navigate(`/citas/update/${idSelected}`)
  }
  const detalle = () => {
    console.log(idSelected)
    return navigate(`/detalle/${idSelected}`)
  }
  const crear = () => {
    return navigate(`/citas/create/`)
  }
  const cancel = () => {
    return navigate(`/cancelada/${routeParams.id}`)
  }
  const reserved = () => {
    return navigate(`/reservada/${routeParams.id}`)
  }

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
    {numSelected > 0
    ? (
      <Typography
        sx={{ flex: '1 1 100%' }}
        color='inherit'
        variant='subtitle1'
        component='div'
        style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
        margin:'15px 0 19px 0', textAlign:'center', fontSize:'20px'}}
      >
        {numSelected} Cita Seleccionado
      </Typography>
      )
    : (
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h5'
        id='tableTitle'
        component='div'
        style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
        margin:'15px 0 19px 30px', textAlign:'center'}}
      >
        Citas Registradas
      </Typography>
      )}
       {numSelected > 0
        ? (<>
         {/*Detalle Cita*/}
          <Tooltip title='Detalle Cita'>
            <IconButton onClick={detalle}>
              <CalendarTodayIcon key={idSelected} />
            </IconButton>
          </Tooltip>
           <Tooltip title='Actualizar Cita'>
            <IconButton onClick={update}>
              <EditIcon key={idSelected} />
            </IconButton>
          </Tooltip>

           </>)
        : (
          <Tooltip title='Agregar Cita'>
          <IconButton onClick={crear}>
            <ControlPointDuplicateIcon/>
          </IconButton>
          </Tooltip>
          )}
          {/*Citas canceladas */}
          <Tooltip title='Citas Canceladas'>
          <IconButton onClick={cancel}>
            <EventBusyIcon/>
          </IconButton>
          </Tooltip>
          {/*Citas reservadas */}
          <Tooltip title='Citas Reservadas'>
          <IconButton onClick={reserved}>
            <HowToRegIcon/>
          </IconButton>
          </Tooltip>
    </Toolbar>
  )
}
TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired
}

export default function TableCitas(){
  
  const routeParams = useParams()
  const {data, error, loaded} = useCallApi({ endpoint: `cita/getCitasXRol/${routeParams.id}`})

  const [selected, setSelected] = React.useState([])
  const [dense, setDense] = React.useState(false)
 
  const [searchTerm, setSearchTerm] = React.useState("")

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }


  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }
  

  const isSelected = (name) => selected.indexOf(name) !== -1
 
return(
  <>
      {!loaded && <div> <strong>Cargando...</strong></div>}
      {data && data.length >= 1 && 
      <Box sx={{ width: '100%'}}
      style={{marginTop:'-130px'}}>
        <Paper  sx={{ width: '100%', mb: 2 }}>

        <TableToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} />
        <TextField 
        type={'date'}
        label='Buscar por fecha de registro'
        InputLabelProps={{
          shrink: true,
        }}
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
                  <StyledTableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  
                  >
              {/*Aca se mencionan cada una de los celdas*/}   
                  <StyledTableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                  </StyledTableCell>
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
                  <StyledTableCell>₡ {row.precio}</StyledTableCell>


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

