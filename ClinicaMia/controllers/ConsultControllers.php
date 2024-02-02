<?php
class consultorio
{
    public function index(){
        
        $consult=new ConsultorioModels();
        $response=$consult->all();
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
 
        $consult=new ConsultorioModels();
        $response=$consult->get($id);
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
 
        $consult=new ConsultorioModels();
        $response=$consult->getForm($id);
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

        $consult=new ConsultorioModels();
        $response=$consult->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Consultorio creado correctamente."
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

        $consult=new ConsultorioModels();
        $response=$consult->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Consultorio actualizado correctamente."
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



}

?>