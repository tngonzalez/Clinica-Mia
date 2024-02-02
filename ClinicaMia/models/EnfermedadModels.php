<?php
class EnfermedadModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "SELECT id, nombre, observacion FROM enfermedad";
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
			$vSql = "SELECT * FROM enfermedad WHERE id= $id;"; 
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

	/*Get por IDUsuario*/
	public function get($id){
		try {
			//Consulta sql
			$vSql = "SELECT * FROM enfermedad WHERE id= $id;"; 
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
	}

    /*Get por IDUsuario*/
	public function getXIDExp($id){
        try {
            //Consulta sql
			$vSql = "SELECT en.id, en.nombre, en.observacion FROM enfermedad en, expeenfermedad ex, expediente e WHERE (en.id= ex.idEnfermedad AND ex.idExpediente = e.id) AND e.id = $id GROUP BY nombre;"; 
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
       /*Get por User*/
	public function getXUser($id){
        try {
            //Consulta sql
			$vSql = "SELECT en.nombre FROM enfermedad en, expeenfermedad ex, expediente e, usuario u WHERE (en.id= ex.idEnfermedad AND ex.idExpediente = e.id) AND (e.idUsuario = u.id AND u.id = $id) GROUP BY nombre;"; 
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

            $this->enlace->connect();
			$sql = "INSERT INTO enfermedad(nombre,observacion) VALUES('$objeto->nombre','$objeto->observacion');";
			
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
			$sql = "UPDATE enfermedad SET nombre='$objeto->nombre',observacion= '$objeto->observacion' WHERE id='$objeto->id';";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
?>