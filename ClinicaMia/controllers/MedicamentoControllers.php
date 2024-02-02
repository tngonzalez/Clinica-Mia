<?php
class medicamento
{

    public function index(){
        
        $med=new MedicamentosModels();
        $response=$med->all();
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
 
        $med=new MedicamentosModels();
        $response=$med->get($id);
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

        $med=new MedicamentosModels();
        $response=$med->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Medicamento creado correctamente."
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

        $med=new MedicamentosModels();
        $response=$med->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Medicamento actualizado correctamente"
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


}

?>