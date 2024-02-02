<?php
class MedicamentosModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "call selectMedicamentos();";
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
			$vSql = "call selectXIDMed($id);";
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

    public function create($objeto) {
        try {

            $this->enlace->connect();
			$sql = "INSERT INTO medicamento(nombre,prescripcion) VALUES('$objeto->nombre','$objeto->prescripcion');";
			
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
			$sql = "UPDATE medicamento SET nombre ='$objeto->nombre',".
            "prescripcion ='$objeto->prescripcion'". 
            "WHERE id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar pelicula
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    /*Get por IdUsuario*/
	public function getXIDExp($id){
        try {
            //Consulta sql
			$vSql = "SELECT m.id, m.nombre, m.prescripcion FROM medicamento m, expemedicamento em, expediente e WHERE (m.id= em.idMedicamento AND em.idExpediente = e.id) AND e.id = $id GROUP BY nombre, prescripcion;"; 
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
		$vSql = "SELECT m.nombre, m.prescripcion FROM medicamento m, expemedicamento em, expediente e, usuario u WHERE (m.id= em.idMedicamento AND em.idExpediente = e.id) AND (e.idUsuario = u.id AND u.id = $id) GROUP BY nombre, prescripcion;"; 
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