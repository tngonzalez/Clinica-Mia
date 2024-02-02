<?php
class AlergiaModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "call selectAlergias();";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
	public function getAlergia($id){
        try {
            //Consulta sql
			$vSql = "select * from alergia where id = $id;"; 
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			$response = $vResultado[0]; 
			return $response;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function get($id){
        try {
            //Consulta sql
			$vSql = "call selectIDAlergia($id);"; 
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
			$sql = "INSERT INTO alergia(nombre,reaccion,observacion,idTipo) VALUES('$objeto->nombre','$objeto->reaccion','$objeto->observacion','$objeto->idTipo');";
			
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
			$sql = "UPDATE alergia SET nombre='$objeto->nombre',reaccion='$objeto->reaccion',observacion= '$objeto->observacion',idTipo='$objeto->idTipo' WHERE id='$objeto->id';";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
    
	/*Get por idExpe*/
	public function getXIDExp($id){
        try {
            //Consulta sql
			$vSql = "   SELECT a.id, a.nombre, a.reaccion, a.observacion, ta.nombre as tipoAlergia FROM alergia a, tipoalergia ta, expealergia ea, expediente e WHERE (ta.id = a.idTipo AND a.id = ea.idAlergia ) AND (ea.idExpediente = e.id  AND e.id = $id);"; 
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	/*Get por IdUser*/
	public function getXUser($id){
		try {
			//Consulta sql
			$vSql = "SELECT a.id, a.nombre, a.reaccion, a.observacion, ta.nombre as tipoAlergia FROM alergia a, tipoalergia ta, expealergia ea, expediente e WHERE (ta.id = a.idTipo AND a.id = ea.idAlergia ) AND (ea.idExpediente = e.id  AND e.idUsuario = $id);"; 
			
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