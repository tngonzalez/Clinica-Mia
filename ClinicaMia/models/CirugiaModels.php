<?php
class CirugiaModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "call selectCirugia();";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);
				
			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function get($id){
        try {
            //Consulta sql
			$vSql = "call selectCirugiaXIDExpe($id);"; 
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
			$sql = "INSERT INTO cirugia(nombre,lugar,fecha,hora,idExpediente) VALUES('$objeto->nombre','$objeto->lugar','$objeto->fecha','$objeto->hora','$objeto->idExpediente');";
			
			$id = $this->enlace->executeSQL_DML_last( $sql);

            return $this->get($objeto->idExpediente);

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	/*Get por IDUsuario*/
	public function getXIDExp($id){
		try {
			//Consulta sql
			$vSql = "SELECT c.id, c.nombre, c.lugar, c.fecha, c.hora FROM cirugia c, expediente e WHERE c.idExpediente = e.id AND  e.id = $id;"; 
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
			$vSql = "SELECT c.nombre, c.lugar, c.fecha, c.hora, c.idExpediente FROM cirugia c, expediente e, usuario u WHERE (c.idExpediente = e.id AND  e.idUsuario = u.id) AND u.id = $id;"; 
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