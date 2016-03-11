<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Speaker_controller extends CI_Controller {
		
		function __construct() {
			parent::__construct();
			$this->load->model('speaker_model','',TRUE);
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
		 
		public function add_training_speaker() {
			$training_id = $this->input->post('training_id');
			$fname =$this->input->post('firstname');
			$mname = $this->input->post('middlename');
			$lname = $this->input->post('lastname');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$company = $this->input->post('company');
			$company_position = $this->input->post('company_position');
			$image_url = 'http://localhost/j3safetysolutions/uploads/speakers/';

			if ($training_id != null && $fname != null && $lname != null) {

				$config['upload_path']  = './uploads/speakers/';
				$config['allowed_types'] = '*';
		 
				$this->load->library('upload', $config);
			
				if ($this->upload->do_upload('file')) {
					$temp = $this->upload->data();
					$image_url = $image_url.$temp['file_name'];
				}

				$result = $this->speaker_model->add_speaker($training_id, $fname, $mname, $lname, $email, $phone, $company, $company_position, $image_url);
				
				if ($result) {
					$json_response = array('training_id' => $training_id,
										  'firstname' => $fname,
										  'middlename' => $mname,
										  'lastname' => $lname,
										  'email' => $email,
										  'phone' => $phone,
										  'company' => $company,
										  'company_position' => $company_position,
										  'imageUrl' => $image_url,
										  'returnMessage'=>'Speaker successfully added',
										  'returnValue'=>'SUCCESS');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
				}
				else {
					$json_response = array('returnMessage '=>'Unable to add training speaker',
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

		public function get_speakers_by_speaker_id() {
			$speaker_id = $this->input->get('speaker_id');

			if ($speaker_id != null) {
				$result = $this->speaker_model->get_speakers_by_speaker_id($speaker_id);
				if ($result) {
					 $this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No available speakers from the given training id',
										  'returnValue'=>'SUCCESS');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
			   $json_response = array('returnMessage'=>'Invalid request parameters',
										  'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		 }


		 
		public function update_speaker() {
			$speaker_id = $this->input->post('speaker_id');
			$fname =$this->input->post('firstname');
			$mname = $this->input->post('middlename');
			$lname = $this->input->post('lastname');
			$email = $this->input->post('email');
			$phone = $this->input->post('phone');
			$company = $this->input->post('company');
			$company_position = $this->input->post('company_position');
			$image = $this->input->post('image');
		}

		public function get_speaker_by_training_id() {
			$training_id = $this->input->get('training_id');

			if ($training_id != null) {
				$result = $this->speaker_model->get_speakers_by_training_id($training_id);

				if ($result) {
					$this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No speakers available',
											  'returnValue'=>'FAILURE');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage'=>'Invalid request parameters.',
											  'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}

		public function speakerList() {
			$result = $this->speaker_model->speakerList();

			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				 $json_response = array('returnMessage'=>'No speakers available',
										  'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
 	}
?>