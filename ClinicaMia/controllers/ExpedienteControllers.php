<?php
class expediente
{
    public function index(){
        
        $expe=new ExpedienteModels();
        $response=$expe->all();
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
 
        $expe=new ExpedienteModels();
        $response=$expe->get($id);
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
    
    public function getForm($id){
        //Obtener elemento
        $expe=new ExpedienteModels();
        //Obtener una pelicula
        $response=$expe->getForm($id);
        //Si hay respuesta
        if(isset($response) && !empty($response)){
            //Armar el json
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

    public function getXIdUser($id){
 
        $expe=new ExpedienteModels();
        $response=$expe->getXIdUser($id);
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

    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $expe=new ExpedienteModels();
        $response=$expe->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Expediente creado correctamente."
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor."
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    public function update( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $expe=new ExpedienteModels();
        $response=$expe->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Expediente actualizado correctamente."
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor."
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }
/*Expedientes compartidos*/

    public function enviarExpe( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $expe=new ExpedienteModels();
        $response=$expe->enviarExpe($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Expediente enviado correctamente."
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor."
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    public function getExpeCompartidos($id){
 
        $expe=new ExpedienteModels();
        $response=$expe->getExpeCompartidos($id);
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