import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Dashboard from './components/header/Header'
// Import from react-router-dom
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Home } from './components/Home'
import CustomizedTables  from './routes/Clientes'
import { FormUser } from './components/Forms/FormUser'
import { DetalleExpe } from './components/listData/DetailExpe'
import TableMedico from './routes/Medicos'
import { CardConsult } from './components/Cards/CardConsult'
import { DetalleConsult } from './components/listData/DetailConsult'
import {FormConsultorio } from './components/Forms/FormConsult'
import TableAlergia from './routes/Alergias'
import { FormAlergia } from './components/Forms/FormAlergia'
import TableMedicamento from './routes/Medicamentos'
import { FormMedicamento } from './components/Forms/FormMedicamento'
import TableEspecialidad from './routes/Especialidad'
import { FormEspecialidad } from './components/Forms/FormEspecialidad'
import TableConsultorio from './routes/Consultorio'
import TableExpediente from './routes/Expediente'
import { FormExpediente } from './components/Forms/FormExpe'
import TableEnfermedad from './routes/Enfermedades'
import { FormEnfermedad } from './components/Forms/FormEnfermedad'
import TableCitas from './routes/Citas'
import { FormCitas } from './components/Forms/FormCitas'
import Calendario from './routes/Calendario'
import { FormConfirmCita } from './components/Forms/FormConfirmCita'
import { FrmPerfil } from './components/Forms/FrmPerfil'
import {SignInSide} from './components/user/LogIn';
import { FormExpeCliente } from './components/Forms/FrmExpeCliente'
import { FormMedico } from './components/Forms/FormMedico'
import { CardCancelarCita } from './components/Cards/CardCancelarCita'
import { FromCancelarCitas } from './components/Forms/FrmCancelarCita'
import { Registro } from './components/user/Signup'
import { Unauthorized } from './components/user/Unauthorized'
import UserProvider from './components/user/UserProvider'
import { Logout } from './components/user/LogOut'
import TableCancel from './components/Citas/CitasCanceladas'
import TableReserved from './components/Citas/CitasReservadas'
import { DetalleCitaRe } from './components/listData/DetailCitaReserved'
import CardExpeCompar from './components/Cards/CardExpeCompartidos'
import { DetalleExpeCompartido } from './components/listData/DetailExpeCompartido'
import CitasRegistradas from './components/Reportes/CitasRegistradas'
import CitasMedicos from './components/Reportes/CitasMedicos'
import { FrmConsultMed } from './components/Forms/FrmConsultMed'
import {Auth} from '../src/components/user/Auth';
import { DetalleCita } from './components/listData/DetailCita'
import { DetalleUser } from './components/listData/DetailUser'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home />
  },
  //Administrador
  {
    path:'/',
    element: <Auth allowedRoles={['Administrador']}/>,
    children:[
      
      {
        path:'/medico',
        element: <TableMedico />
      },
      {
        path:'/especialidad',
        element: <TableEspecialidad />
      },
      {
        path:'/consultorio',
        element: <TableConsultorio />
      },
      {
        path:'/consult',
        element: <CardConsult />
      },
     
      {
        path:'medico/create/',
        element: <FormMedico />
      },
     
      {
        path:'especialidad/create/',
        element: <FormEspecialidad />
      },
      {
        path:'consultorio/create/',
        element: <FormConsultorio />
      },
    
      {
        path:'/medico/update/:id',
        element: <FormMedico />
      },
      
      {
        path:'/consultorio/update/:id',
        element: <FormConsultorio />
      },
     
      {
        path:'/especialidad/update/:id',
        element: <FormEspecialidad />
      },
      {
        path:'/consultorio/:id',
        element: < DetalleConsult/>
      },
//Reporte
      //Citas registradas por día
      {
        path:'/cantidad',
        element: <CitasMedicos />
      }

    ]
  },
  //Médico y Administrador
  {
    path:'/',
    element: <Auth allowedRoles={['Médico','Administrador']}/>,
    children:[
      {
        path:'/usuario',
        element: <CustomizedTables />
      },
      {
        path:'/alergia',
        element: <TableAlergia />
      },
      {
        path:'/medicamento',
        element: <TableMedicamento />
      },
      {
        path:'/enfermedades',
        element: <TableEnfermedad />
      },
      {
        path:'/expediente',
        element: <TableExpediente />
      },
        //Citas canceladas
      {
        path:'/cancelada/:id',
        element: <TableCancel />
      },
      //Citas reservadas
      {
        path:'/reservada/:id',
        element: <TableReserved />
      }, 
      {
        path:'/informacion/:id',
        element: <DetalleCitaRe />
      },

      {
        path:'usuario/create/',
        element: <FormUser />
      },
      {
        path:'alergia/create/',
        element: <FormAlergia />
      },
      {
        path:'medicamento/create/',
        element: <FormMedicamento />
      },
      {
        path:'especialidad/create/',
        element: <FormEspecialidad />
      },
      {
        path:'expediente/create/',
        element: <FormExpediente />
      },
      {
        path:'enfermedades/create/',
        element: <FormEnfermedad />
      },
      {
        path:'citas/create/',
        element: <FormCitas />
      },
      {
        path:'citas/createCU/',
        element: <FormConfirmCita />
      },

      {
        path:'/cita/:id',
        element: <TableCitas />
      },
      {
        path:'/usuario/update/:id',
        element: <FormUser />
      },

      {
        path:'/alergia/update/:id',
        element: <FormAlergia />
      },
      {
        path:'/medicamento/update/:id',
        element: <FormMedicamento />
      },
      {
        path:'/consultorio/update/:id',
        element: <FormConsultorio />
      },
      {
        path:'/expediente/update/:id',
        element: <FormExpediente />
      },
      {
        path:'/enfermedades/update/:id',
        element: <FormEnfermedad />
      },
      {
        path:'/citas/update/:id',
        element: <FormCitas />
      },
      {
        path:'/especialidad/update/:id',
        element: <FormEspecialidad />
      },
 //Reportes 
      //Citas registradas por día
      {
        path:'/registradas',
        element: <CitasRegistradas />
      },
      //Cita Detalle
      {
        path:'/detalle/:id',
        element: <DetalleCita />
      },
      //Detalle Expediente Cliente
      {
        path:'/expecli/:id',
        element: <DetalleUser />
      }
    ]
  },
  //Cliente, Médico y Administrador
  {
    path:'/',
    element: <Auth allowedRoles={['Cliente','Médico','Administrador' ]}/>,
    children:[
      {
        path:'/calendario/:id',
        element: <Calendario />
      },

      //Actualizar y mostrar perfil
      {
        path:'/perfil/:id',
        element: <FrmPerfil />
      },
       
      //Cliente Expedientes Compartidos
      {
        path:'/compartidos/:id',
        element: <CardExpeCompar />
      },
      //Cliente Expediente Compartido Detalles
      {
        path:'/compartido/:id',
        element: <DetalleExpeCompartido />
      },
      //Cancelar cita   
      {
        path:'/cancelar/:id',
        element: <FromCancelarCitas />
      },
      {
        path:'/citas/:id',
        element: <FormConfirmCita />
      }, 
      {
        path:'/expediente/:id',
        element: <DetalleExpe />
      }
    ]
  },
  //Médico
  {
    path:'/',
    element: <Auth allowedRoles={['Médico']}/>,
    children:[
       //Consultorio del medico
      //Crear
      {
        path:'/con',
        element: <FrmConsultMed />
      },
      //Actualizar
      {
        path:'/con/:id',
        element: <FrmConsultMed />
      }

    ]
  },
  //Cliente
  {
    path:'/',
    element: <Auth allowedRoles={['Cliente']}/>,
    children:[
      {
        path:'/calendario',
        element: <Calendario />
      },

      //Actualizar y mostrar perfil
      {
        path:'/perfil/:id',
        element: <FrmPerfil />
      },
      
      //Cliente Expediente -Actualizar
      {
        path:'/expe/:id',
        element: <FormExpeCliente />
      },
      //Cliente Expediente - Crear
      {
        path:'/expe',
        element: <FormExpeCliente />
      },
      //Cliente Expedientes Compartidos
      {
        path:'/compartidos/:id',
        element: <CardExpeCompar />
      },
      //Cliente Expediente Compartido Detalles
      {
        path:'/compartido/:id',
        element: <DetalleExpeCompartido />
      },
      //Cancelar cita 
      {
        path:'/historial/:id',
        element: <CardCancelarCita />
      }
    ]
  },

   //Login 
   {
    path:'/login',
    element: <SignInSide />
  },
  //Cerrar Sesión
  {
    path:'/logout',
    element: <Logout />
  },
  //Sin acceso
  {
    path:'/unauthorized',
    element: <Unauthorized />
  },
  //Registro
  {
    path:'/registro',
    element: <Registro />
  }

])

export function App(){
  return (
    <UserProvider>
      <Dashboard>
        <RouterProvider router={router}/>
      </Dashboard>
    </UserProvider>
  )
}
