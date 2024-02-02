<?php
class UsuarioModels{
    public $enlace;
    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all(){
        try {
            //Consulta sql
			$vSql = "call selectUsuarios();";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getForm($id){
        try {
            //Consulta sql
			$vSql = "select * from usuario where id = $id;";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            $response = $vResultado[0]; 

			// Retornar el objeto
			return $response;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
    public function get($id){
        try {
            //Consulta sql
			$vSql = "call selectUsuarioXIDUser($id);";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
            // Retornar el objeto
            return $vResultado;
            
        } catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {
            //Registrando
            if(isset($objeto->clave)&& $objeto->clave!=null){
				$crypt=password_hash($objeto->clave, PASSWORD_BCRYPT);
				$objeto->clave=$crypt;
			}

            $this->enlace->connect();
			$sql = "INSERT INTO usuario(nombre,apellidos,cedula,correo,clave,idGenero,idRol) VALUES('$objeto->nombre','$objeto->apellidos','$objeto->cedula','$objeto->correo','$objeto->clave','$objeto->idGenero','$objeto->idRol');";
			
			$id = $this->enlace->executeSQL_DML_last( $sql);

            return $this->get($id);

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
	public function update($objeto) {
        try {
            //Consulta sql
            $this->enlace->connect();
			$sql = "UPDATE usuario SET nombre ='$objeto->nombre',".
            "apellidos ='$objeto->apellidos',cedula ='$objeto->cedula',correo ='$objeto->correo',clave ='$objeto->clave',idGenero ='$objeto->idGenero',idRol ='$objeto->idRol'". 
            "WHERE id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar 
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getClientes(){
        try {

            //Consulta sql
            $vSql = "call selectClientesXRol();";
            $this->enlace->connect();
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql);
            // Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    public function getMedicos(){
        try {
            //Consulta sql
            $vSql = "call selectMedicosXRol();";
            $this->enlace->connect();
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql);
            // Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

    /*Login*/ 
    public function getLogin($id){
        try {
            $rolM = new RolesModels();
            $this->enlace->connect();
            //Consulta sql
			$vSql = "CALL selectLogin($id)";

            $vResultado = $this->enlace->ExecuteSQL ( $vSql);
            if ($vResultado) {
                $vResultado = $vResultado[0];
                $rol=$rolM->getRolUser($id);
                $vResultado->rol=$rol;

                return $vResultado; 
            }else {
                return null;
            }

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function login($objeto) {
        try {
            
			$existencia = "SELECT EXISTS(SELECT * FROM usuario WHERE correo='$objeto->correo') AS 'Exis';";
			$this->enlace->connect();
            //Ejecutar la consulta
			$tof = $this->enlace->ExecuteSQL ( $existencia);

            //Validacion
            if($tof[0]->Exis == 1) {
                $vSql = "SELECT * FROM usuario WHERE correo = '$objeto->correo';"; 
                $this->enlace->connect();
                $vResultado = $this->enlace->ExecuteSQL ( $vSql);

                if(is_object($vResultado[0])){
                    $user=$vResultado[0];

                    if(password_verify($objeto->clave, $user->clave)){

						return $this->getLogin($user->id);

					}else{
                        return false;
                    }
                }
                else{
                    return false; 
                }

                }
                else{
                    return false;
                }
             
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
  
    /*Cita Reserved Info. */
    public function getUserInfo($id){
        try {
            //Consulta sql
            $vSql = "SELECT u.id, u.nombre, u.apellidos, u.cedula, u.correo FROM usuario u, citausuario cu, citas c WHERE (u.id = cu.idUsuario AND cu.idCita = c.id) AND c.id = $id;";
            $this->enlace->connect();
            //Ejecutar la consulta
            $vResultado = $this->enlace->ExecuteSQL ( $vSql);
            // Retornar el objeto
            return $vResultado;
        } catch ( Exception $e ) {
            die ( $e->getMessage () );
        }
    }

}
?>