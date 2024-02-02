<?php
class EspecialidadModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "call selectEspecialidad();";
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
			$vSql = "call selectIDEspecialidad($id);";
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
			$sql = "Insert into especialidad(nombre) values ('$objeto->nombre');";
			

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
			$sql = "UPDATE especialidad SET nombre ='$objeto->nombre' WHERE id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

            //Retornar 
            return $this->get($objeto->id);
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
}
?>