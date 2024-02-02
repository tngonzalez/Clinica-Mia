<?php
class cita
{
    
    public function index(){
        
        $cita=new CitaModels();
        $response=$cita->all();
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
    }

    public function get($id){
 
        $citas=new CitaModels();
        $response=$citas->get($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    public function getXIDConsult($objeto){
 
        $citas=new CitaModels();
        $response=$citas->getXIDConsult($objeto);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Creado correctamente"
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $citas=new CitaModels();
        $response=$citas->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Creado correctamente"
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Ya existe cita como esa fecha y hora"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    public function update( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $citas=new CitaModels();
        $response=$citas->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Actualizado correctamente"
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Ya existe cita como esa fecha y hora"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    /*Tabla intermedia CitaUsuario */ 

    public function createCU( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $citas=new CitaModels();
        $response=$citas->createCU($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Cita Reservada"
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));  
    }

    public function getUser($idUser){
 
        $citas=new CitaModels();
        $response=$citas->getUser($idUser);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    public function getCita($id){
 
        $citas=new CitaModels();
        $response=$citas->getCita($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    public function getC($id){
 
        $citas=new CitaModels();
        $response=$citas->getC($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }
    /*Cancelar cita*/
    public function cancelarC($id){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $citas=new CitaModels();
        $response=$citas->cancelarC($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Cancelado correctamente"
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    /* Estado de cita*/
    public function cancel($id){
        
        $cita=new CitaModels();
        $response=$cita->cancel($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
    }

    public function reserved($id){
        
        $cita=new CitaModels();
        $response=$cita->reserved($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No hay registros"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
    }

    public function getForm($id){
 
        $cita=new CitaModels();
        $response=$cita->getForm($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }




    /*Mas informacion cita*/
    public function getCitaInfo($id){

        $citas=new CitaModels();
        $response=$citas->getCitaInfo($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
	}

	/*Cantidad Citas por Medicos*/
    public function getCitasMedicos(){
    $citas=new CitaModels();
    $response=$citas->getCitasMedicos();
    if(isset($response) && !empty($response)){
        $json=array(
            'status'=>200,
            'results'=>$response
        );
    }else{
        $json=array(
            'status'=>400,
            'results'=>"No existe el recurso solicitado"
        );
    }
    echo json_encode($json,
            http_response_code($json["status"])
        );
    }

    /*Mostrar Citas Según el tipo de rol */
    public function getCitasXRol($id){

        $citas=new CitaModels();
        $response=$citas->getCitasXRol($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

   /*Obtener idUsuario */
	public function getCitasXUser($id){

        $citas=new CitaModels();
        $response=$citas->getCitasXUser($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    /*Get Citas por idUser*/
    public function getCitasXid($id){
 
        $citas=new CitaModels();
        $response=$citas->getCitasXid($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No existe el recurso solicitado"
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

}

?>