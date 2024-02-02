<?php
//Cargar datos
require_once "vendor/autoload.php";
use Firebase\JWT\JWT;

class usuario
{
    private $secret_key = 'e0d17975bc9bd57eee132eecb6da6f11048e8a88506cc3bffc7249078cf2a77a';

    public function index(){
        
        $user=new UsuarioModels();
        $response=$user->all();
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

    public function get($param){
 
        $user=new UsuarioModels();
        $response=$user->get($param);
        $json=array(
            'status'=>200,
            'results'=>$response
        );
        echo json_encode($json,
        http_response_code($json["status"]));
    }

    public function getForm($id){
 
        $user=new UsuarioModels();
        $response=$user->getForm($id);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>$response
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Error en el servidor."
            );
        }
        echo json_encode($json,
                http_response_code($json["status"])
            );
    }

    public function create( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $user=new UsuarioModels();
        $response=$user->create($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Usuario creado correctamente."
            );
        }else{
            $json=array(
                'status'=>400,
                'results'=>"No se crea el usuario. Error en el servidor."
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));
        
    }

    public function update( ){
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 

        $user=new UsuarioModels();
        $response=$user->update($object);
        if(isset($response) && !empty($response)){
            $json=array(
                'status'=>200,
                'results'=>"Usuario actualizado correctamente."
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

    public function getClientes(){
 
        $user=new UsuarioModels();
        $response=$user->getClientes();
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

    public function getMedicos(){
 
        $user=new UsuarioModels();
        $response=$user->getMedicos();
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

    /* Login + Autorize*/
    public function getLogin($id){
 
        $user=new UsuarioModels();
        $response=$user->getLogin($id);
        $json=array(
            'status'=>200,
            'results'=>$response
        );
        echo json_encode($json,
        http_response_code($json["status"])
        );
    }

    public function login(){
        
        $inputJSON=file_get_contents('php://input');
        $object = json_decode($inputJSON); 
        $user=new UsuarioModels();
        $response=$user->login($object);
        if(isset($response) && !empty($response) && $response!=false){
            // Datos que desea incluir en el token JWT
            $data=[
                'id'=>$response->id,
                'correo'=>$response->correo,
                'idCE'=>$response->idCE,
                'rol'=>$response->rol, 
            ];
            // Generar el token JWT
            $jwt_token= JWT::encode($data,$this->secret_key,'HS256');
            $json=array(
                'status'=>200,
                'results'=>$jwt_token
            );
            
        }else{
            $json=array(
                'status'=>400,
                'results'=>"Usuario no valido"
            );
        }
        echo json_encode($json,
        http_response_code($json["status"]));    
    }

    public function autorize(){
        
        try {
            
            $token = null;
            $headers = apache_request_headers();
            if(isset($headers['Authentication'])){
              $matches = array();
              preg_match('/Bearer\s(\S+)/', $headers['Authentication'], $matches);
              if(isset($matches[1])){
                $token = $matches[1];
                return true;
              }
            } 
            return false;
                   
        } catch (Exception $e) {
            return false;
        }
    }


}

?>