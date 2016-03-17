<?php
	Class Delegate_model extends CI_Model {

		//tjhe output of this function will be use in inserting in delegates table
		public function getMaxRegistrationId() {
			$this->db->select('MAX(a.registration_id) as id');
			$this->db->from('registration as a');
			$this->db->limit(0);

			$query = $this -> db -> get();
          
			foreach ($query->result() as $row) {
		      return $row->id;
		  	}
		}

		public function getMaxDelegateId() {
			$this->db->select('MAX(a.delegate_id) as id');
			$this->db->from('delegates as a');
			$this->db->limit(0);

			$query = $this -> db -> get();
          
			foreach ($query->result() as $row) {
		      return $row->id;
		  	}
		}

		public function getMaxTrainingAttendedId() {
			$this->db->select('MAX(a.ta_id) as id');
			$this->db->from('training_attended as a');
			$this->db->limit(0);

			$query = $this -> db -> get();
          
			foreach ($query->result() as $row) {
		      return $row->id;
		  	}
		}

        //function for adding training course
		public function add_delegate($training_id, $fname, $mname, $lname, $email, $address, $company, $industry, $company_position, $phone,  $image_url, $gender, $added_by, $userid, $amount_paid, $or_no, $delegate_number) {
			/***************   MULTIPLE INSERT***************/
			//registration data
			$successful = true;

			$data1 = array( 'userid' => $userid );

			//insert into delegates table
			if ($this->db->insert('registration', $data1)) {

				$registration_id = $this->getMaxRegistrationId();

				$data2 = array( 'delegate_number' => $delegate_number,
								'registration_id' => $registration_id,
							   	'firstname' => $fname,
							   	'middlename' => $mname,
							   	'lastname' => $lname,
							   	'email' => $email,
							   	'company'=> $company,
							   	'company_position' => $company_position,
							   	'phone' => $phone,
							   	'image' => $image_url,
							   	'address' => $address,
							   	'industry' => $industry,
							   	'gender' => $gender);

				//insert into delegate account table
				if ($this->db->insert('delegates', $data2) && $amount_paid != null) {

					$delegate_id = $this->getMaxDelegateId();

					$data4 = array(
							'delegate_id' => $delegate_id,
							'training_id' => $training_id
					);

					if ($this->db->insert('training_attended', $data4)) {
						$training_attended_id = $this->getMaxTrainingAttendedId();

						$data3 = array(
							'delegate_id' => $delegate_id,
							'amount_paid' => $amount_paid,
							'or_no' => $or_no,
							'training_attended_id' => $training_attended_id
						);

						if (!$this->db->insert('delegate_accounts', $data3)) $successful = false;
					}
					
				}
			}
			else {
				$successful = false;
			}
			
			return $successful;
		}
      
		//function to get a specific speaker detail
		public function get_delegate_by_delegate_id($delegate_id) {
			$this -> db -> select('*');
			$this -> db -> from('delegates as a');
			$this -> db -> where('a.delegate_id', $delegate_id);
			$this -> db -> limit(0);

			$query = $this -> db -> get();
          
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		//function to update delegate detail 
		public function updateDelegateDetail($delegate_id, $fname, $mname, $lname, $email, $company, $company_position, $phone, $address, $delegate_number, $image) {
			$data = array('firstname' => $fname,
						  'middlename' => $mname,
						  'lastname' => $lname,
						  'email' => $email,
						  'company' => $company,
						  'company_position' => $company_position,
						  'phone' => $phone,
						  'address' => $address,
						  'delegate_number' => $delegate_number,
						  'image' => $image);

			$this->db->where('delegate_id', $delegate_id);
			$this->db->update('delegates', $data);
			return true;
		}
	   
	    public function change_delegate_picture($delegate_id, $img) {
			$data = array('image' => $img);
			$this->db->where("delegate_id = $delegate_id");
			return $this->db->update('delegates', $data);
		}
		
		public function search_delegate($key) {
			$this->db->select('a.delegate_id, a.training_id, a.firstname, a.middlename, a.lastname, a.email, a.phone, a.company, a.company_position');
			$this->db->from('delegates as a');
			$this->db->where("a.lastname LIKE '$key%' or a.firstname LIKE '$key%'");
			$this->db->limit(0);
			
			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}
		
		public function delegateList() {
			$this->db->select('*');
			$this->db->from('delegates as a');
			$this->db->limit(0);
			$this->db->order_by('a.lastname');
			
			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function get_delegate_all_detail($delegate_id) {
			$this->db->select('a.*, b.*, c.course_name, d.*');
			$this->db->from('delegates as a, trainings as b, course as c, delegate_accounts d, training_attended as e');
			$this->db->where("a.delegate_id = $delegate_id and
							  a.delegate_id = $delegate_id and
							  a.delegate_id = d.delegate_id 
							  a.delegate_id = e.delegate_id and
							  b.training_id = e.training_id and
							   b.course_id = c.course_id");
			$this->db->limit(0);
			
			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function get_delegate_payment_details($delegate_id) {
			$this->db->select(' b.*, c.course_name, d.*');
			$this->db->from('delegates as a, trainings as b, course as c, delegate_accounts d');
			$this->db->where("d.delegate_id = $delegate_id and  a.training_id = b.training_id and b.course_id = c.course_id");
			$this->db->limit(0);
			
			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}


		public function get_delegate_profile($delegate_id) {
			$this->db->select('*');
			$this->db->from('delegates as a');
			$this->db->where("a.delegate_id = $delegate_id");

			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function get_delegate_trainings($delegate_id) {
			$this->db->select('a.from_date, a.to_date, a.location, c.course_name');
			$this->db->from('trainings as a, training_attended as b, course as c, categories as d');
			$this->db->where("a.training_id = b.training_id and
							  a.course_id = c.course_id and
							  c.category_id = d.category_id and
							  b.delegate_id = $delegate_id");

			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function load_delegate_transaction($delegate_id, $training_id) {
			$this->db->select('a.*, c.course_name, b.*');
			$this->db->from('trainings as a, training_attended as b, course as c, categories as d');
			$this->db->where("a.training_id = b.training_id and
							  a.course_id = c.course_id and
							  c.category_id = d.category_id and
							  b.delegate_id = $delegate_id and
							  a.training_id = $training_id");

			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function check_delegate_number($number) {
			$this->db->select('*');
			$this->db->from('delegates as a');
			$this->db->where("a.delegate_number = $number");

			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

  }
?>