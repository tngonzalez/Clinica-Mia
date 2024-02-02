import { useState } from 'react'
import { UserContext } from '../../context/UserContext'
import jwtDecode from 'jwt-decode'

export default function UserProvider (props) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('us')) || null
  )

  const saveUser = (user) => {
    setUser(user)
    localStorage.setItem('us', JSON.stringify(user))
  }

  const clearUser = () => {
    setUser(null)
    localStorage.removeItem('us')
  }
  const decodeToken = () => {
    if (user) {
      // const decodedToken = jwtDecode(user)
      const decodedToken =jwtDecode(user)
      return decodedToken
    } else {
      return null
    }
  }
  const autorize = ({ allowedRoles }) => {
    const userData = decodeToken()
    if (userData && allowedRoles) {
      console.log(userData && userData.rol && allowedRoles.includes(userData.rol.nombre))
      return userData && userData.rol && allowedRoles.includes(userData.rol.nombre)
    }
    return false
  }

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser, autorize, decodeToken }}>
      {props.children}
    </UserContext.Provider>
  )
}
