<?php
class ConsultorioModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all(){
        try {
            //Consulta sql
			$vSql = "call selectConsultorios();";
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
			$vSql = "select * from consultorio where id = $id;";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			$response= $vResultado[0];

            return $response;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
		/*Consultorios */

		 /*Get por idUser*/

    /*Medicos */
	public function getMedXID($id){
        try {

            //Consulta sql
			$vSql = "SELECT DISTINCT u. id, u.nombre, u.apellidos FROM usuario u,consultorio c WHERE u.id = c.idUsuario  AND c.id = $id;";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	public function get($id){
		try {
			$MedM = new ConsultorioModels(); 
			//Consulta sql
			$vSql = "SELECT c.id, c.nombre as consultorio, c.ubicacion, c.precio, e.nombre as especialidad FROM consultorio c, especialidad e, usuario u WHERE (e.id = c.idEspecialidad AND u.id = c.idUsuario) AND c.id = $id;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			$vResultado = $vResultado[0];

			$med=$MedM->getMedXID($id);
			$vResultado->medico=$med;	

			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
	}

    public function create($objeto) {
        try {

            $this->enlace->connect();
			$sql = "INSERT INTO consultorio(nombre,ubicacion,precio,idEspecialidad,idUsuario) VALUES('$objeto->nombre','$objeto->ubicacion','$objeto->precio','$objeto->idEspecialidad','$objeto->idUsuario');";
			
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
			$sql = "UPDATE consultorio SET nombre ='$objeto->nombre',".
            "ubicacion ='$objeto->ubicacion',precio ='$objeto->precio',idEspecialidad ='$objeto->idEspecialidad',idUsuario ='$objeto->idUsuario'". 
            "WHERE id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
   


}
?>