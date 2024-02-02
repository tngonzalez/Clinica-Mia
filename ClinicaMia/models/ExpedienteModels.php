<?php
class ExpedienteModels{
    public $enlace;

    public function __construct()
    {
        $this->enlace=new MySqlConnect();
    }

    public function all()
    {
        try {
            //Consulta sql
			$vSql = "call selectExpediente();";
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
			$alergiaM = new AlergiaModels(); 
			$medicamentoM = new MedicamentosModels(); 
			$enfermedadM = new EnfermedadModels();
			$cirugiaM = new CirugiaModels();  

            //Consulta sql
			$vSql = "select e.id, e.idUsuario, u.nombre, u.apellidos, u.cedula, u.correo, g.nombre as genero, t.nombre as tipoSangre, e.fechaNac, e.domicilio from expediente e, usuario u, tiposangre t, genero g where (t.id = e.idTipoSangre AND g.id = u.idGenero) AND (u.id = e.idUsuario AND e.id = $id);";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			$vResultado = $vResultado[0];

			//Alergias
			$alergia=$alergiaM->getXIDExp($id);
			if (empty($alergia)) {
				$alergia=[];
			}
			$vResultado->alergias=$alergia;

			//Medicamentos
			$medicamento=$medicamentoM->getXIDExp($id);
			if(empty($medicamento)){
				$medicamento=[];
			}
			$vResultado->medicamentos=$medicamento;

			//Enfermedades
			$enfermedad=$enfermedadM->getXIDExp($id);
			if(empty($enfermedad)){
				$enfermedad=[];
			}
			$vResultado->enfermedades=$enfermedad;

			//Cirugias
			$cirugia=$cirugiaM->getXIDExp($id);
			if(empty($cirugia)){
				$cirugia=[];
			}
			$vResultado->cirugia=$cirugia;


			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	public function getForm($id){
        try {
			$alergiaM = new AlergiaModels(); 
			$medicamentoM = new MedicamentosModels(); 
			$enfermedadM = new EnfermedadModels();
			$cirugiaM = new CirugiaModels();  

            //Consulta sql
			$vSql = "SELECT * FROM expediente  WHERE id = $id;";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			$vResultado = $vResultado[0];

			//Alergias
			$alergia=$alergiaM->getXIDExp($id);

			if (!empty($alergia)) {
				$alergia = array_column($alergia, 'id');	
			} else {
				$alergia = [];
			}
			$vResultado->alergias=$alergia;

			//Medicamentos
			$medicamento=$medicamentoM->getXIDExp($id);

			if (!empty($medicamento)) {
				$medicamento = array_column($medicamento, 'id');
			} else {
				$medicamento = [];
			}
			$vResultado->medicamentos=$medicamento;

			//Enfermedades
			$enfermedad=$enfermedadM->getXIDExp($id);

			if (!empty($enfermedad)) {
				$enfermedad = array_column($enfermedad, 'id');
			} else {
				$enfermedad = [];
			}
			$vResultado->enfermedades=$enfermedad;

			//Cirugias
			$cirugia=$cirugiaM->getXIDExp($id);

			if (empty($cirugia)) {
				$cirugia = [];
			}

			$vResultado->cirugia=$cirugia;

			// Retornar el objeto
			return $vResultado;
		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function getXIdUser($id){
        try {
			$alergiaM = new AlergiaModels(); 
			$medicamentoM = new MedicamentosModels(); 
			$enfermedadM = new EnfermedadModels();
			$cirugiaM = new CirugiaModels();  

            //Consulta sql
			$vSql = "select e.id, u.nombre, u.apellidos, u.cedula, u.correo, g.nombre as genero, t.nombre as tipoSangre, e.fechaNac, e.domicilio from expediente e, usuario u, tiposangre t, genero g where (t.id = e.idTipoSangre AND g.id = u.idGenero) AND (u.id = e.idUsuario AND e.idUsuario = $id);";
			$this->enlace->connect();
            //Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL ( $vSql);

			$vResultado = $vResultado[0];

			// Retornar el objeto
			return $vResultado;

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

    public function create($objeto) {
        try {

            $this->enlace->connect();
			$sql = "INSERT INTO expediente(idUsuario,idTipoSangre,telefono,fechaNac,domicilio)".
			"VALUES ('$objeto->idUsuario','$objeto->idTipoSangre','$objeto->telefono','$objeto->fechaNac','$objeto->domicilio');";
			
			$id = $this->enlace->executeSQL_DML_last( $sql);

			//Alergias
			
			if ($objeto->alergias <> null) {

			foreach ($objeto->alergias as $alergia) {
                $dataAlergias[] = array($id, $alergia); 
            }
				foreach ($dataAlergias as $row) {
					$this->enlace->connect();
	
					//Insertar 
					$values = implode(',', $row); 
					$sql = "Insert into expealergia(idExpediente,idAlergia) VALUES($values);";
					$resultado = $this->enlace->executeSQL_DML($sql);
				}
			}

			//Medicamento
			if ($objeto->medicamentos <> null) {

			foreach ($objeto->medicamentos as $medicamento) {
                $dataMedicamento[] = array($id, $medicamento); 
            }
	
				foreach ($dataMedicamento as $row) {
					$this->enlace->connect();

					//Insertar 
					$values = implode(',', $row); 
					$sql = "Insert into expemedicamento(idExpediente,idMedicamento) VALUES($values);";
					$resultado = $this->enlace->executeSQL_DML($sql);
				}
			}


			//Enfermedad
			if ($objeto->enfermedades <> null) {

			foreach ($objeto->enfermedades as $enfermedad) {
                $dataEnfermedad[] = array($id, $enfermedad); 
            }				
				foreach ($dataEnfermedad as $row) {
					$this->enlace->connect();
	
					//Insertar 
					$values = implode(',', $row); 
					$sql = "Insert into expeenfermedad(idExpediente,idEnfermedad) VALUES($values);";
					$resultado = $this->enlace->executeSQL_DML($sql);
				}
			}

			
			//Cirugia
			if ($objeto->cirugia <> null) {

				foreach ($objeto->cirugia as $row) {
					$dataCirugia[] = array($row->nombre, $row->lugar, $row->fecha, $row->hora, $id); 
				}				
					foreach ($dataCirugia as $row) {
						$this->enlace->connect();
		
						//Insertar 
						$sql = "INSERT INTO cirugia(nombre, lugar,fecha,hora,idExpediente) VALUES('$row[0]','$row[1]','$row[2]','$row[3]','$row[4]');";
						$resultado = $this->enlace->executeSQL_DML($sql);
					}
				}

            return $this->get($id);

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	public function update($objeto) {
        try {
            //Consulta sql
            $this->enlace->connect();
			$sql = "UPDATE expediente SET idUsuario ='$objeto->idUsuario',".
            "idTipoSangre ='$objeto->idTipoSangre',telefono ='$objeto->telefono',fechaNac ='$objeto->fechaNac',domicilio ='$objeto->domicilio'". 
            "WHERE id=$objeto->id";
			
            //Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML( $sql);

			//Alergias
		
			if ($objeto->alergias <> null) {

				$this->enlace->connect(); 
				$sql= "DELETE FROM  expealergia Where idExpediente=$objeto->id";
				$cResults = $this->enlace->executeSQL_DML($sql);

				foreach ($objeto->alergias as $alergia) {
					$dataAlergias[] = array($objeto->id, $alergia); 
				}

				foreach ($dataAlergias as $row) {
					$this->enlace->connect();
	
					//Insertar 
					$values = implode(',', $row); 
					$sql = "INSERT INTO expealergia(idExpediente,idAlergia) VALUES(". $values .");";
					$cResults = $this->enlace->executeSQL_DML($sql);
				}
				}
	
			//Medicamento
		
			if ($objeto->medicamentos <> null) {

			$this->enlace->connect(); 
			$sql= "DELETE FROM  expemedicamento WHERE idExpediente=$objeto->id";
			$cResults = $this->enlace->executeSQL_DML($sql);

			foreach ($objeto->medicamentos as $medicamento) {
				$dataMedicamento[] = array($objeto->id, $medicamento); 
			}
	
				foreach ($dataMedicamento as $row) {
					$this->enlace->connect();

					//Insertar 
					$values = implode(',', $row); 
					$sql = "INSERT INTO expemedicamento(idExpediente,idMedicamento) VALUES(". $values . ");";
					$cResults = $this->enlace->executeSQL_DML($sql);
				}
			}
	
			//Enfermedad

			if ($objeto->enfermedades <> null) {
		
			$this->enlace->connect(); 
			$sql= "DELETE FROM  expeenfermedad WHERE idExpediente=$objeto->id";
			$cResults = $this->enlace->executeSQL_DML($sql);

			foreach ($objeto->enfermedades as $enfermedad) {
				$dataEnfermedad[] = array($objeto->id, $enfermedad); 
			}				
				foreach ($dataEnfermedad as $row) {
					$this->enlace->connect(); 
	
					//Insertar 
					$values = implode(',', $row); 
					$sql = "INSERT INTO expeenfermedad(idExpediente,idEnfermedad) VALUES(". $values .");";
					$cResults = $this->enlace->executeSQL_DML($sql);
				}
			}

			//Cirugía
			if($objeto->cirugia <> null) {
			$this->enlace->connect(); 

			$sql= "DELETE FROM  cirugia WHERE idExpediente=$objeto->id";
			$cResults = $this->enlace->executeSQL_DML($sql);

			foreach ($objeto->cirugia as $row) {
				$dataCirugia[] = array($row->nombre, $row->lugar, $row->fecha, $row->hora, $objeto->id);
			}
				foreach ($dataCirugia as $row) {
					$this->enlace->connect(); 
					
					$sql = "INSERT INTO cirugia(nombre,lugar,fecha,hora,idExpediente) VALUES('$row[0]','$row[1]','$row[2]','$row[3]','$row[4]');";
					$cResults = $this->enlace->executeSQL_DML($sql);
				}

			}

			return $this->get($objeto->id);

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }
   
	/* Enviar expediente*/
	public function enviarExpe($objeto) {
        try {

            $this->enlace->connect();
			$fechaEnvio = date("Y-m-d"); 
			$sql = "Insert into compartirexpe(idExpediente, idUsuario, fecha) values ('$objeto->id','$objeto->idUsuario', '$fechaEnvio');";
			
			$id = $this->enlace->executeSQL_DML_last( $sql);

            return $this->get($objeto->id);

		} catch ( Exception $e ) {
			die ( $e->getMessage () );
		}
    }

	/*Mostrar expedientes compartidos*/
	
    public function getExpeCompartidos($id){
        try {
            //Consulta sql
			$vSql = "CALL mostrarExpeCompar('$id');";
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