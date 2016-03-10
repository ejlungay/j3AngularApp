<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Category_controller extends CI_Controller {
	   
		function __construct() {
			parent::__construct();
			$this->load->model('category_model','',TRUE);
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
		 
		public function add_category() {
			if ($this->input->post('category_name') != null && $this->input->post('user_id') != null) {
				$category_name = $this->input->post('category_name');
				$userid = $this->input->post('user_id');

				$result = $this->category_model->add_category($category_name, $userid);
				if ($result) {
					$json_response = array('returnMessage' => 'Category successfully added',
										   'returnValue' => 'SUCCESS');    

				   $this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
				else {
					$json_response = array('returnMessage'=>'Unable to add categoty',
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

		 public function get_category_by_id() {
			$id = $this->input->get('category_id');
			if ($id != null) {
				$result = $this->category_model->get_category_by_id($id);
				if ($result) {
					 $this->output->set_content_type('application/json')->set_output(json_encode($result));
				}
				else {
					$json_response = array('returnMessage'=>'No available course id from the given category id',
										  'returnValue'=>'FAILURE');    

					$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				}
			}
			else {
				$json_response = array('returnMessage' => 'Invalid request',
										'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		 }
		
		public function update_category() {
			$name = $this->input->post('category_name');
			$id = $this->input->post('category_id');
			$result = $this->category_model->updateCategory($name, $id);
			if ($result) {
				$json_response = array( 'id' => $id,
										 'name' => $name,
										'returnMessage'=>'Category successfully updated.',
										'returnValue'=>'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
			else {
				$json_response = array('returnMessage'=>'Unable to update category.',
										'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
		
		public function category_list() {
			$result = $this->category_model->category_list();
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage'=>'No available categories.',
										'returnValue'=>'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			}
		}
	}
?>