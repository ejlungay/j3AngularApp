<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Signatories_controller extends CI_Controller {
	   
		 function __construct() {
			parent::__construct();
			$this->load->model('signatories_model','',TRUE);
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
		 
		 function index() {
		 
		 }
		 
		public function add_signatory() {
			if ($this->input->post('training_id') != null && $this->input->post('firstname') != null && $this->input->post('user_id') != null && $this->input->post('lastname') != null) {
				$training_id = $this->input->post('training_id');
				$firstname = $this->input->post('firstname');
				$middlename = $this->input->post('middlename');
				$lastname = $this->input->post('lastname');
				$position = $this->input->post('position');
				$accredition_no = $this->input->post('accredition_no');
				$uid = $this->input->post('user_id');

				$result = $this->signatories_model->add_signatories($firstname, $middlename, $lastname, $position, $accredition_no, $training_id, $uid);
				if ($result) {
					$json_response = array('returnMessage'=>'Successfully added',
										   'returnValue'=>'SUCCESS');    

				   $this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array('returnMessage'=>'Unable to add signature',
										  'returnValue'=>'FAILURE');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage'=>'Invalid request parameters',
									   'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}

		public function get_signatories_by_training_id() {
			$id = $this->input->get('training_id');
			if ($id != null) {
				$result = $this->signatories_model->get_signatries_using_training_id($id);
				if ($result) {
					 $this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage' => 'No available records found.',
										'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage' => 'Invalid request parameters',
										'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}

		public function signatories() {
			$result = $this->signatories_model->signatories();
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage' => 'No available records found.',
									'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		 }
	}
?>