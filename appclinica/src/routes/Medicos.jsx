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
import { Box, Checkbox, FormControlLabel, IconButton, Link, Switch, TablePagination, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {useCallApi} from '../hooks/useCallApi'
import EditIcon from '@mui/icons-material/Edit'
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FEDBD0',
    color: '#442c2e',
    fontSize: '18px',
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily:'Raleway',

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
    id: 'correo',
    numeric: false,
    disablePadding: false,
    label: 'Correo'
  },
  {
    id: 'genero',
    numeric: false,
    disablePadding: false,
    label: 'Género'
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
  const {numSelected} = props
  const {idSelected} = props
  const update = () => {
    console.log(idSelected)
    return navigate(`/medico/update/${idSelected}`)
  }
  const crear = () => {
    return navigate(`/medico/create/`)
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
        {numSelected} Médico Seleccionado
      </Typography>
      )
    : (
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h5'
        id='tableTitle'
        component='div'
        style={{fontFamily:'Raleway', fontWeight: 'bold', color: '#442c2e',
        margin:'20px 0 19px 0', textAlign:'center'}}
      >
        Médicos Registrados
      </Typography>
      )}
       {numSelected > 0
        ? (<>
           <Tooltip title='Actualizar Médico'>
            <IconButton onClick={update}>
              <EditIcon key={idSelected} />
            </IconButton>
          </Tooltip>
           </>)
        : (
          <Tooltip title='Agregar Médico'>
          <IconButton onClick={crear}>
            <ControlPointDuplicateIcon/>
          </IconButton>
          </Tooltip>
          )}
    </Toolbar>
  )
}
TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired
}

export default function TableMedico(){
 
  const { data, error, loaded } = useCallApi({ endpoint: 'usuario/getMedicos/1' })
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
      {data && data.length > 0 && 
      <Box sx={{ width: '100%'}}
      style={{marginTop:'-130px'}}>
        <Paper  sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} />
          <input 
        type={'text'}
        placeholder='Buscar por cédula'
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
                            val.cedula.toLowerCase().includes(searchTerm.toLocaleLowerCase())
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
                  <StyledTableCell>{row.apellidos}</StyledTableCell>
                  <StyledTableCell>{row.cedula}</StyledTableCell>
                  <StyledTableCell>{row.correo}</StyledTableCell>
                  <StyledTableCell>{row.genero}</StyledTableCell>


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

