<?php
class alergia
{
    public function index(){
        
        $alergia=new AlergiaModels();
        $response=$alergia->all();
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
 
        $alergia=new AlergiaModels();
        $response=$alergia->get($id);
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

    public function getAlergia($id){
 
        $alergia=new AlergiaModels();
        $response=$alergia->getAlergia($id);
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

        $alergia=new AlergiaModels();
        $response=$alergia->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Alergía creada correctamente."
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

    public function update( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $alergia=new AlergiaModels();
        $response=$alergia->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Alergía actualizada correctamente."
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