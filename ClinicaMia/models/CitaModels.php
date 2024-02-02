<?php
class CitaModels
{
	public $enlace;

	public function __construct()
	{
		$this->enlace = new MySqlConnect();
	}

	public function all()
	{
		try {
			//Consulta sql
			$vSql = "call selectCitasRegistradas();";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function get($id){
		try {
			//Consulta sql
			$vSql = "call selectCitasXIDCita($id);";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			$response = $vResultado[0];
			// Retornar el objeto
			return $response;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function getXIDConsult($objeto)
	{
		try {
			//Consulta sql
			$vSql = "CALL selectCitasXidConsult('$objeto->fecha','$objeto->hora','$objeto->idConsultorio','$objeto->nombre');";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function getCitasXid($id){
		try {
			//Consulta sql
			$vSql = "CALL selectCitas('$id');";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function create($objeto)
	{
		try {
			$this->enlace->connect();
			$objeto->estado = "D";

			$sql = "CALL insertarCita('$objeto->nombre','$objeto->fecha','$objeto->hora','$objeto->estado','$objeto->idConsultorio');";

			$id = $this->enlace->executeSQL_DML_last($sql);

			//Ejecutar la consulta
			return $this->getXIDConsult($objeto);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function update($objeto)
	{
		try {
			//Consulta sql
			$this->enlace->connect();
			$sql = "CALL updateCita('$objeto->id','$objeto->nombre','$objeto->fecha ','$objeto->hora','$objeto->idConsultorio');";

			//Ejecutar la consulta
			$cResults = $this->enlace->executeSQL_DML($sql);

			//Retornar 
			return $this->get($objeto->id);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	
	public function getForm($id)
	{
		try {
			//Consulta sql
			$vSql = "SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre AS consultorio, co.precio, co.ubicacion FROM citas c, consultorio co WHERE  co.id= c.idConsultorio AND c.id = $id;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			$response = $vResultado[0];
			// Retornar el objeto
			return $response;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}


	/* Tablas CitaUsuario */
	/*Mostrar al usuario las citas reservadas*/
	/*Cita */
	public function getCita($idUser)
	{
		try {
			//Consulta sql
			$vSql = "SELECT c.id, c.nombre, c.fecha, c.hora, cu.observacion, c.estado FROM citas c, usuario u, citausuario cu WHERE  (c.id = cu.idCita AND u.id = cu.idUsuario) AND (c.estado = 'R' AND cu.idUsuario =$idUser);";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}
	/*Usuario */

	public function getUser($idUser)
	{
		try {
			$citasM = new CitaModels();
			//Consulta sql
			$vSql = "SELECT u.cedula, u.nombre, u.apellidos FROM  usuario u, citausuario cu WHERE  cu.idUsuario= u.id AND u.id = $idUser;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			$vResultado = $vResultado[0];

			$cita = $citasM->getCita($idUser);
			$vResultado->citas = $cita;

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}


	public function getCitaUser($id)
	{
		try {
			//Consulta sql
			$vSql = "SELECT * FROM citausuario WHERE idUsuario = $id";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function createCU($objeto)
	{
		try {
			$this->enlace->connect();

			$vSQL = "CALL modificarCU('$objeto->idUsuario','$objeto->id','$objeto->observacion');";

			$id = $this->enlace->executeSQL_DML_last($vSQL);

			return $this->getC($objeto->id);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	/*Cancelar cita*/
	public function getC($id)
	{
		try {
			//Consulta sql
			$vSql = "SELECT * from citas where id = $id;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function cancelarC($id)
	{
		try {
			$this->enlace->connect();

			$sql = "CALL cancelarCita('$id');";

			$dato = $this->enlace->executeSQL_DML_last($sql);

			//Ejecutar la consulta
			return $this->getC($id);
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	/*Estado de cita*/
	public function cancel($id){
		try {
			//Consulta sql
			$vSql = "call selectCitasCanceladas($id);";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	public function reserved($id){
		try {
			//Consulta sql
			$vSql = "call selectCitasReservadas($id);";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}


	/*Mas informacion cita*/
	public function getCitaInfo($id){
		try {
			$UserM = new UsuarioModels();
			//Consulta sql
			$vSql = "SELECT c.id,c.nombre, c.fecha, c.hora, c.estado, c.idConsultorio, co.nombre as consultorio, co.ubicacion, co.precio FROM citas c, consultorio co WHERE co.id = c.idConsultorio AND c.id = $id;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			$vResultado = $vResultado[0];

			$user = $UserM->getUserInfo($id);
			$vResultado->usuario = $user;

			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	/*Cantidad Citas por Medicos*/
	public function getCitasMedicos(){
		try {
			//Consulta sql
			$vSql = "call selectCitasMedicos();";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	/*Mostrar Citas Según el tipo de rol */
	public function getCitasXRol($id)
	{
		try {
			//Consulta sql
			$vSql = "call selectCitasXID('$id');";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);
			// Retornar el objeto
			return $vResultado;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

	/*Obtener idUsuario */
	public function getCitasXUser($id)
	{
		try {
			//Consulta sql
			$vSql = "SELECT u.id FROM usuario u INNER JOIN consultorio co ON co.idUsuario = u.id INNER JOIN citas c ON c.idConsultorio = co.id WHERE c.id = $id;";
			$this->enlace->connect();
			//Ejecutar la consulta
			$vResultado = $this->enlace->ExecuteSQL($vSql);

			$response=$vResultado[0];
			return $response;
		} catch (Exception $e) {
			die($e->getMessage());
		}
	}

}
