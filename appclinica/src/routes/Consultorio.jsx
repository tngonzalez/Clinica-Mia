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
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
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
  },
  {
    id: 'especialidad',
    numeric: false,
    disablePadding: false,
    label: 'Especialidad'
  },
  {
    id: 'medico',
    numeric: false,
    disablePadding: false,
    label: 'Médico'
  },
  {
    id: 'apellidos',
    numeric: false,
    disablePadding: false,
    label: 'Apellidos'
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
    return navigate(`/consultorio/update/${idSelected}`)
  }
  const consultoriosC = () => {
    return navigate(`/consult`)
  }
  const consultorioC = () => {
    return navigate(`/consultorio/${idSelected}`)
  }
  const crear = () => {
    return navigate(`/consultorio/create/`)
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
        {numSelected} Consultorio Seleccionado
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
        Consultorio Registrados
      </Typography>
      )}
       {numSelected > 0
        ? (<>
        <Tooltip title='Mostrar Consultorio'>
          <IconButton onClick={consultorioC}>
            <RemoveRedEyeIcon key={idSelected}/>
          </IconButton>
          </Tooltip>
          <Tooltip title='Actualizar Consultorio'>
            <IconButton onClick={update}>
              <EditIcon key={idSelected} />
            </IconButton>
          </Tooltip>
           </>)
        : (
          <Tooltip title='Agregar Consultorio'>
          <IconButton onClick={crear}>
            <ControlPointDuplicateIcon/>
          </IconButton>
          </Tooltip>
          )}
          <Tooltip title='Mostrar Consultorios'>
          <IconButton onClick={consultoriosC}>
            <FolderCopyIcon/>
          </IconButton>
          </Tooltip>
    </Toolbar>
  )
}
TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  idSelected: PropTypes.number.isRequired
}

export default function TableConsultorio(){
 
  const { data, error, loaded } = useCallApi({ endpoint: 'consultorio/' })
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)


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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty data.
  const emptydata =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

return(
  <>
      {!loaded && <div> <strong>Cargando...</strong></div>}
      {data && data.length > 0 && 
      <Box sx={{ width: '100%'}}
      style={{marginTop:'-130px'}}>
        <Paper  sx={{ width: '100%', mb: 2 }}>
        <TableToolbar numSelected={selected.length} idSelected={Number(selected[0]) || 0} />
        
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
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
                  <StyledTableCell>{row.ubicacion}</StyledTableCell>
                  <StyledTableCell>₡{row.precio}</StyledTableCell>
                  <StyledTableCell>{row.especialidad}</StyledTableCell>
                  <StyledTableCell>{row.medico}</StyledTableCell>
                  <StyledTableCell>{row.apellidos}</StyledTableCell>

                </StyledTableRow>
                  )
                })}

                {emptydata > 0 && (
                  <StyledTableRow 
                  style={{
                    height: (dense ? 33 : 53) * emptydata
                  }}>

                  <StyledTableCell colSpan={6} />
                  </StyledTableRow>
                  )}   
            </TableBody>
          </Table>
        </TableContainer>
         {/* Paginacion */}
         <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
          />
      </Box> } 
  </>
  )}

