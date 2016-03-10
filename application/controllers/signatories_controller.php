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
		 
		 public function add_signatories() {
			if ($this->input->post('training_id') != null && $this->input->post('firstname') != null && $this->input->post('middlename') != null && $this->input->post('lastname') != null) {
				$training_id = $this->input->post('training_id');
				$firstname = $this->input->post('firstname');
				$middlename = $this->input->post('middlename');
				$lastname = $this->input->post('lastname');
				$title = $this->input->post('title');
				$position = $this->input->post('position');
				$accredition_no = $this->input->post('accredition_no');

				$result = $this->signatories_model->add_signatories($title, $fname, $mname, $lname, $position, $accredition_no, $training_id);
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
	}
?>