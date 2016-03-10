<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
class Delegate_controller extends CI_Controller {
   
    function __construct() {
		parent::__construct();
		$this->load->model('delegate_model','',TRUE);
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
     
    public function add_delegate() {
		$pictureMode = $this->input->post('picture_mode');
		$training_id = $this->input->post('training_id');
        $fname = $this->input->post('firstname');
        $mname = $this->input->post('middlename');
        $lname = $this->input->post('lastname');
        $email = $this->input->post('email');
        $company = $this->input->post('company');
        $address = $this->input->post('address');
        $company_position = $this->input->post('company_position');
        $phone = $this->input->post('phone');
        $industry = $this->input->post('industry');
        $gender = $this->input->post('gender');
		$added_by = $this->input->post('added_by');
		$image_url = 'http://localhost/j3safetysolutions/uploads/delegates/';
		$userid = $this->input->post('user_id');
		$amount_paid = $this->input->post('amount_paid');
		$or_no = $this->input->post('or_no');
		
		if ($pictureMode == 'upload') {
			$config['upload_path']  = './uploads/delegates/';
			$config['allowed_types'] = 'gif|jpg|png';
	 
			$this->load->library('upload', $config);
		
			if ($this->upload->do_upload('file')) {
				$temp = $this->upload->data();
				$image_url = $image_url.$temp['file_name'];
			}
		}
		else { // picture is base64
			if ($this->input->post('image_data') != null) {
				$this->load->helper('file');
				//create a file name as the username
				$file = './uploads/delegates/'.str_replace(' ', '', $email).'-'.str_replace(' ', '', $fname).'-'.str_replace(' ', '', $lname).'.jpg';
				$ifp = fopen($file, "wb"); 

				$data = explode(',', $this->input->post('image_data'));

				fwrite($ifp, base64_decode($data[1])); 
				fclose($ifp); 
				
				$image_url = $image_url.str_replace(' ', '', $email).'-'.str_replace(' ', '', $fname).'-'.str_replace(' ', '', $lname).'.jpg';;
			}
		}
		
        if ($training_id != null && $userid != null) {   
            $result = $this->delegate_model->add_delegate($training_id, $fname, $mname, $lname, $email, $address, $company, $industry, $company_position, $phone,  $image_url, $gender, $added_by, $userid, $amount_paid, $or_no);
            if ($result) {
                $json_response = array('training id' => $training_id,
                                      'firstname' => $fname,
                                      'middlename' => $mname,
                                      'lastname' => $lname,
                                      'email' => $email,
                                      'pictureMode' => $pictureMode,
                                      'company' => $company,
                                      'company_position' => $company_position,
                                      'phone' => $phone, 
                                      'returnMessage'=>'Delegate successfully added',
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

    public function get_delegate_by_delegate_id() {
		$delegate_id = $this->input->get('delegate_id');
		
		if ($delegate_id != null) {
			$result = $this->delegate_model->get_delegate_by_delegate_id($delegate_id);
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage'=>'No available delegates from '.$delegate_id.' delegate id',
									  'returnValue'=>'SUCCESS');    

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

    public function update_delegate() {
		$delegate_id = $this->input->post('delegate_id');
        $fname = $this->input->post('firstname');
        $mname = $this->input->post('middlename');
        $lname = $this->input->post('lastname');
        $email = $this->input->post('email');
        $company = $this->input->post('company');
        $company_position = $this->input->post('company_position');
        $phone = $this->input->post('phone');

        if ($delegate_id != null) {
            $result = $this->delegate_model->updateDelegateDetail($delegate_id, $fname, $mname, $lname, $email, $company, $company_position, $phone);
            if ($result) {
                $json_response = array('delegate id' => $delegate_id,
                                      'firstname' => $fname,
                                      'middlename' => $mname,
                                      'lastname' => $lname,
                                      'email' => $email,
                                      'company' => $company,
                                      'company_position' => $company_position,
                                      'phone' => $phone,
                                      'returnMessage'=>'Delegate successfully updated',
                                      'returnValue'=>'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 

                return true;
            }
            else {
                $json_response = array('returnMessage' => 'Unable to update delegate detail',
                                      'returnValue' => 'FAILURE');    

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
	
	public function change_delegate_profile_picture() {
		$delegate_id = $this->input->post('delegate_id');
		$img = $this->input->post('image');
		
		if ($delegate_id != null) {
			$result = $this->delegate_model->change_delegate_picture($delegate_id, $img);
			
			if ($result) {
				$json_response = array('returnMessage' => 'Image successfully changed',
									   'returnValue' => 'SUCCESS');
				
				$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			}
			else {
				$json_response = array('returnMessage' => 'Unable to change profile picture',
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
	
	public function search_delegate() {
		$key = $this->input->get('key');
		
		if ($key != null) {
			$result = $this->delegate_model->search_delegate($key);
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result)); 
			}
			else {
				$json_response = array('returnMessage' => 'Unable to find a delegate with the given keyword',
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
	
	public function delegateList() {

		$result = $this->delegate_model->delegateList();
		if ($result) {
			$this->output->set_content_type('application/json')->set_output(json_encode($result));
		}
		else {
			$json_response = array('returnMessage'=>'No available delegates from '.$delegate_id.' delegate id',
								  'returnValue'=>'SUCCESS');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response)); 
			return false;
		}
    }
	
  }
?>