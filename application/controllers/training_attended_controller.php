<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class training_attended_controller extends CI_Controller {
   
    function __construct() {
		parent::__construct();
		$this->load->model('training_attended_model','',TRUE);
		$this->load->helper('url');
		$this->load->library('session');
		//enabling CORS
		header('Access-Control-Allow-Origin: *');
		header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
		$method = $_SERVER['REQUEST_METHOD'];
		if($method == "OPTIONS") {
			die();
		}
    }
     
    public function add_delegate_to_training() {
		$delegate_id = $this->input->post('delegate_id');
		$training_id = $this->input->post('training_id');
		
        if ($training_id != null && $delegate_id != null) {   
            $result = $this->training_attended_model->add_training_attended($delegate_id, $training_id);
            if ($result) {
                $json_response = array(
                                      'returnMessage'=>'Successfully added',
                                      'returnValue'=>'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
            }
            else {
                $json_response = array('returnMessage'=>'Unable to add training speaker',
                                      'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

                return false;
            }
        }
        else {
            $json_response = array('returnMessage' => 'Invalid request parameters',
                                   'returnValue' => 'FAILURE');    

            $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
            return false;
        }
     }

     public function check_delegate() {
		$delegate_id = $this->input->get('delegate_id');
		$training_id = $this->input->get('training_id');
		
        if ($training_id != null && $delegate_id != null) {   
            $result = $this->training_attended_model->checkDelegate($delegate_id, $training_id);
            if ($result) {
            	$json_encode;
            	foreach ($result as $row) {
            		$json_encode = array(
            			'total' => $row->total
            		);
            	}

				$this->output->set_content_type('application/json')->set_output(json_encode($json_encode)); 
            }
            else {
                $json_response = array('returnMessage'=>'Participant already exist in this training.',
                                      'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

                return false;
            }
        }
        else {
            $json_response = array('returnMessage' => 'Invalid request parameters',
                                   'returnValue' => 'FAILURE');    

            $this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
            return false;
        }
     }
  }
?>