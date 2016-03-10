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

        //function for adding training course
		public function add_delegate($training_id, $fname, $mname, $lname, $email, $address, $company, $industry, $company_position, $phone,  $image_url, $gender, $added_by, $userid, $amount_paid, $or_no) {
			/***************   MULTIPLE INSERT***************/
			//registration data
			$successful = true;

			$data1 = array( 'userid' => $userid );

			//insert into delegates table
			if ($this->db->insert('registration', $data1)) {

				$registration_id = $this->getMaxRegistrationId();

				$data2 = array( 'training_id' => $training_id,
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
				if ($this->db->insert('delegates', $data2)) {

					$delegate_id = $this->getMaxDelegateId();

					$data3 = array(
							'delegate_id' => $delegate_id,
							'amount_paid' => $amount_paid,
							'or_no' => $or_no
						);
					if (!$this->db->insert('delegate_accounts', $data3)) $successful = false;
				}
			}
			else {
				$successful = false;
			}
			
			return $successful;
		}
      
		//function to get a specific speaker detail
		public function get_delegate_by_delegate_id($delegate_id) {
			$this -> db -> select('a.delegate_id, a.training_id, a.firstname, a.middlename, a.lastname, a.email, a.phone, a.company, a.company_position');
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
		public function updateDelegateDetail($delegate_id, $fname, $mname, $lname, $email, $company, $company_position, $phone) {
			$data = array('firstname' => $fname,
						  'middlename' => $mname,
						  'lastname' => $lname,
						  'email' => $email,
						  'company' => $company,
						  'company_position' => $company_position,
						  'phone' => $phone);

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
  }
?>