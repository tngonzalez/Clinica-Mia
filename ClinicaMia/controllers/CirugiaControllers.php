<?php
class cirugia
{
    public function index(){
        
        $cirugia=new CirugiaModels();
        $response=$cirugia->all();
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
 
        $cirugia=new CirugiaModels();
        $response=$cirugia->get($id);
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

        $cirugia=new CirugiaModels();
        $response=$cirugia->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No se creo el recurso"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }


}

?>