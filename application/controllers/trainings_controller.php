<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 
  class Trainings_controller extends CI_Controller {
   
     function __construct() {
		parent::__construct();
		$this->load->model('trainings_model','',TRUE);
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

     /* A function for adding training
      * @Params: course id, training fee
      *  returns true/false
     */
    public function add_training() { 
		$course_id = $this->input->post('course_id');
		$location = $this->input->post('location');
		$start_date = $this->input->post('start_date');
		$end_date = $this->input->post('end_date');
		$time_start = $this->input->post('time_start');
		$time_end = $this->input->post('time_end');
		$uid = $this->input->post('user_id');
		$r_fee = $this->input->post('regular_fee');
		$d_fee = $this->input->post('discounted_fee');
		

		if ($course_id != null && $uid != null && $uid != null) {
			$result = $this->trainings_model->add_training($course_id,  $location, $start_date, $end_date, $time_start, $time_end, $uid, $r_fee, $d_fee);
			if ($result) {
				$json_response = array('returnMessage' => 'Training successfully added',
                                      'returnValue' => 'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			} // end if
			else {
				$json_response = array('returnMessage' => 'Unable to add training',
                                      'returnValue' => 'FAILURE');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
			} //end else
		}
		else {
			$json_response = array( 
									'course id' => $course_id,
									'location' => $location,
									'start date' => $start_date,
									'end date' => $end_date,
									'time start' => $time_start,
									'time end' => $time_end,
									'uie' => $uid,
									'r fee' =>  $r_fee,
									'd fee' => $d_fee,
									'returnMessage'=>'Invalid request parameters',
                                    'returnValue'=>'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
        }
     } // end function

     /* Function for getting training id using course id
      * request method: GET
      * @Params: course id
      * returns: a json object: course_id
     */
    public function get_training_id_by_course_id() {
		$course_id = $this->input->get('course_id');

		if ($course_id != null) {
			$result = $this->trainings_model->get_training_id_by_course_id($course_id);
			if ($result) {
				$json_response = array('course_id' => $course_id,
                                      'result'=>$result,
                                      ' returnValue'=>'SUCCESS');    

				header('Content-Type: application/json');
				echo json_encode( $json_response);

				return true;
			} // end if
			else {
				$json_response = array('returnMessage'=>'No available training id from the given course id',
                                      'returnValue'=>'SUCCESS');    

				header('Content-Type: application/json');
				echo json_encode( $json_response);

				return false;
			} // end else
		} 
		else {
			$json_response = array('returnMessage'=>'Invalid request',
                                  'returnValue'=>'FAILURE');    

			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));

			return false;
		}
    } ///end function

     /* Function for getting a specific training detail using a training id
      * @Params: training id
      * returns: json object: training detail
     */
    public function get_training_by_training_id() {
        $training_id = $this->input->get('training_id');

	    if ($training_id != null) {
		   $result = $this->trainings_model->get_training_by_training_id($training_id);
		   if ($result) {
			   $this->output->set_content_type('application/json')->set_output(json_encode($result));
		   }
		   else {
			   $json_response = array('returnMessage'=>'No available trainings from the given training id',
									  'returnValue'=>'SUCCESS');    

				$this->output->set_content_type('application/json')->set_output(json_encode($json_response));

				return false;
		   } // end else
	    }
		else {
			$json_response = array('returnMessage' => 'Invalid request parameters',
								   'returnValue' => 'FAILURE');
			
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
		}
    } // end function

     /* Function for loading trainings depending on the number of counts
      * @Params: count
      * returns json object: training lists
     */
    public function get_trainings_list() {
		$year = date('Y');
        $result = $this->trainings_model->get_trainings_list($year);
        if ($result) {
            $this->output->set_content_type('application/json')->set_output(json_encode($result)); 
        }
        else {
            $json_response = array('returnMessage'=>'No available trainings',
                                  'returnValue'=>'SUCCESS');    

            $this->output->set_content_type('application/json')->set_output(json_encode($json_response));

            return false;
        } // end else
    }

     /* Function for getting the delegates of a specific training
      * @Params: training id
      * returns json object: list of delegates
     */
    public function get_training_delegates() {
        $training_id = $this->input->get('training_id');

        if ($training_id != null) {
           $result = $this->trainings_model->get_training_delegates($training_id);
            if ($result) {
               $this->output->set_content_type('application/json')->set_output(json_encode($result)); 
            }
            else {
                $json_response = array('returnMessage'=>'No available delegate from '.$training_id.' training id',
                                      'returnValue'=>'SUCCESS');    

                $this->output->set_content_type('application/json')->set_output(json_encode($json_response));

                return false;
            }
        }
        else {
            $json_response = array('returnMessage'=>'Invalid request parameters',
                                  'returnValue'=>'FAILURE');    

            $this->output->set_content_type('application/json')->set_output(json_encode($json_response));

            return false;
        }
    }

	public function get_trainings_by_course() {
		$course_id = $this->input->get('course_id');
		
		if ($course_id != null) {
			$result = $this->trainings_model->get_trainings_by_course($course_id);
			if ($result) {
				$this->output->set_content_type('application/json')->set_output(json_encode($result));
			}
			else {
				$json_response = array('returnMessage'=>'No available delegate from '.$course_id.' training id',
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
	
	
	public function todaysTrainings() {
		$result = $this->trainings_model->countTodays_trainings();
		if ($result) {
			$this->output->set_content_type('application/json')->set_output(json_encode($result));
		}
		else {
			$json_response = array('returnMessage'=>'No available trainings',
                                    'returnValue'=>'FAILURE');   
									   
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				
			return false;
		}
	}
	
	public function updateTraining() {
		$training_id = $this->input->post('training_id');
		$date_start = $this->input->post('date_start');
		$date_end = $this->input->post('date_end');
		$time_start= $this->input->post('time_start');
		$time_end= $this->input->post('time_end');
		$location = $this->input->post('location');
		$r_fee = $this->input->post('regular_fee');
		$d_fee = $this->input->post('discounted_fee');
		
		$result = $this->trainings_model->updateTraining($training_id, $date_start, $date_end, $time_start, $time_end, $location, $r_fee, $d_fee);
		if ($result) {
			$json_response = array('date start: ' => $date_start,
									'date_end: ' => $date_end,
									'returnMessage'=>'Successfully updated.',
                                   'returnValue'=>'SUCCESS');   
									   
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				
			return false;
		}
		else {
			$json_response = array('returnMessage'=>'Unable to update training.',
                                   'returnValue'=>'FAILURE');   
									   
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				
			return false;
		}
	}
	
	public function getTrainingsByMonth() {
		$month = $this->input->get('month');
		$result = $this->trainings_model->getTrainingsbyMonth($month);
		if ($result) {
			$this->output->set_content_type('application/json')->set_output(json_encode($result));
		}
		else {
			$json_response = array('returnMessage'=>'No available trainings',
                                    'returnValue'=>'FAILURE');   
									   
			$this->output->set_content_type('application/json')->set_output(json_encode($json_response));
				
			return false;
		}
	}
  } // end class
?>