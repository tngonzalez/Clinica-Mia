<?php
class especialidad
{
    public function index(){
        
        $espe=new EspecialidadModels();
        $response=$espe->all();
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
 
        $espe=new EspecialidadModels();
        $response=$espe->get($id);
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

        $espe=new EspecialidadModels();
        $response=$espe->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Especialidad creada correctamente."
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

        $espe=new EspecialidadModels();
        $response=$espe->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Especialidad actualizada correctamente."
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