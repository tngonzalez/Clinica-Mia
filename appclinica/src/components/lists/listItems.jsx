import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse, Link, List, ListSubheader} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import HealingIcon from '@mui/icons-material/Healing';
import ReportIcon from '@mui/icons-material/Report';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TodayIcon from '@mui/icons-material/Today';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

function ResponsiveDrawer() {
  const {user, decodeToken, autorize } =useContext(UserContext)
  const [userData, setUserData]=useState(decodeToken())

  useEffect(()=>{
    setUserData(decodeToken())
  },[user])

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = (
    <div style={{height:'990px',backgroundColor:'#FEEAE6', color:'#442c2e'}}>
      
     
      <List style={{marginLeft:'-10px'}}>

{userData && autorize({ allowedRoles: ['Médico', 'Administrador']}) && 
        <ListItem style={{marginTop:'-10px', marginBottom:'-15px'}}>
        <ListItemButton component={Link} to={`/usuario`}>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="Clientes"/>
        </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Administrador']}) && 
        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/medico`}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Medicos" />
            </ListItemButton>
        </ListItem>
}
{/*Consultorio por medico*/}

{userData && autorize({ allowedRoles: ['Médico']}) && 

    <ListItemButton onClick={handleClick} style={{marginBottom:'-15px', marginLeft:'15px', height:'50px'}}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Consultorio" style={{marginBottom:'15px'}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
}
{userData && autorize({ allowedRoles: ['Médico']}) && 

      <Collapse in={!open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }} style={{marginTop:'5px'}} component={Link} to={`/con`}>
            <ListItemIcon>
                <LibraryAddIcon/>
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 6 }} style={{marginTop:'-10px'}} component={Link} to={`/con/${userData?.idCE}`}>
            <ListItemIcon>
                <BorderColorIcon/>
            </ListItemIcon>
            <ListItemText primary="Actualizar" />
          </ListItemButton>
        </List>
      </Collapse>
}

{userData && autorize({ allowedRoles: ['Médico', 'Administrador']}) && 
        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/enfermedades`}>
            <ListItemIcon>
              <CoronavirusIcon />
            </ListItemIcon>
            <ListItemText primary="Enfermedades" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Médico', 'Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/medicamento`}>
            <ListItemIcon>
              <HealingIcon />
            </ListItemIcon>
            <ListItemText primary="Medicamentos" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/especialidad`}>
            <ListItemIcon>
              <FolderSpecialIcon />
            </ListItemIcon>
            <ListItemText primary="Especialidades" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Administrador']}) && 

              <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/consultorio`}>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Consultorio" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Médico','Administrador']}) && 

     <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/expediente`}>
            <ListItemIcon>
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText primary="Expediente" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Médico','Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/alergia`}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Alergías" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Médico','Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/cita/${userData?.id}`}>
            <ListItemIcon>
              <TodayIcon />
            </ListItemIcon>
            <ListItemText primary="Citas" />
            </ListItemButton>
        </ListItem>
}
    {/*Cliente + Admi + Med */}
{userData && autorize({ allowedRoles: ['Médico','Administrador', 'Cliente']}) && 

        <ListItem style={{marginBottom:'-10px'}}>
            <ListItemButton component={Link} to={`/calendario/${userData?.id}`}>
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Calendario" />
          </ListItemButton>
        </ListItem>
}                
  {/*Cliente */}

     {/*Expediente personal*/}
{userData && autorize({ allowedRoles: ['Cliente']}) && 

    <ListItemButton onClick={handleClick} style={{marginBottom:'-15px', marginLeft:'15px', height:'50px'}}>
        <ListItemIcon>
            <ContactPageIcon />
        </ListItemIcon>
        <ListItemText primary="Expediente" style={{marginBottom:'15px'}}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
}
{userData && autorize({ allowedRoles: ['Cliente']}) && 

      <Collapse in={!open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 6 }} style={{marginTop:'5px'}} component={Link} to={`/expe`}>
            <ListItemIcon>
                <LibraryAddIcon/>
            </ListItemIcon>
            <ListItemText primary="Agregar" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 6 }} style={{marginTop:'-10px'}} component={Link} to={`/expe/${userData?.idCE}`}>
            <ListItemIcon>
                <BorderColorIcon/>
            </ListItemIcon>
            <ListItemText primary="Actualizar" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 6 }} style={{marginTop:'-10px'}} component={Link} to={`/expediente/${userData?.idCE}`}>
            <ListItemIcon>
                <RemoveRedEyeIcon/>
            </ListItemIcon>
            <ListItemText primary="Mostrar" />
          </ListItemButton>
        </List>
      </Collapse>
}
    {/*Expediente compartido*/}
{userData && autorize({ allowedRoles: ['Cliente', 'Médico']}) && 

        <ListItem style={{marginBottom:'-15px', marginTop:'-10px'}}>
            <ListItemButton component={Link} to={`/compartidos/${userData?.id}`}>
            <ListItemIcon>
              <FolderSharedIcon />
            </ListItemIcon>
            <ListItemText primary="Compartidos" />
            </ListItemButton>
        </ListItem>
}
    {/*Historia de citas*/}
{userData && autorize({ allowedRoles: ['Cliente']}) && 

        <ListItem style={{marginBottom:'15px'}}>
            <ListItemButton component={Link} to={`/historial/${userData?.id}`}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary="Historial de citas" />
            </ListItemButton>
        </ListItem>
}
      </List>
      <Divider />

      <List style={{marginLeft:'-5px'}}> 
{userData && autorize({ allowedRoles: ['Médico','Administrador']}) && 
  
          <ListSubheader inset 
        style={{backgroundColor:'#FEEAE6', color:'#442c2e', fontWeight:'bolder',fontFamily:'Raleway',
                fontSize: '25px', marginTop:'5px', marginLeft:'10px', marginBottom:'-10px'}}>
          Reportes
        </ListSubheader>
}
{userData && autorize({ allowedRoles: ['Médico','Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
        <ListItemButton component={Link} to={`/registradas`}>
            <ListItemIcon>
              <SummarizeIcon/>
            </ListItemIcon>
            <ListItemText primary="Citas registradas" />
            </ListItemButton>
        </ListItem>
}
{userData && autorize({ allowedRoles: ['Administrador']}) && 

        <ListItem style={{marginBottom:'-15px'}}>
            <ListItemButton component={Link} to={`/cantidad`}>
            <ListItemIcon>
            <AssessmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Cantidad de citas" />
            </ListItemButton>
        </ListItem> 
} 
      </List>
    </div>
  );


  return (
    <Box>
      <Box>
        <Drawer
          variant="permanent"
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;