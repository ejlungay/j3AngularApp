<?php
  Class Trainings_model extends CI_Model
  {
        //function for adding training course
       public function add_training($course_id, $location, $start_date, $end_date, $time_start, $time_end, $uid, $r_fee, $d_fee) {
          $data = array(
              'course_id' => $course_id,
              'location' => $location,
              'from_date' => $start_date,
              'to_date' => $end_date,
			  'time_start' => $time_start,
			  'time_end' => $time_end,
			  'uid' => $uid,
			  'regular_fee' => $r_fee,
			  'discounted_fee' => $d_fee
          );

          return $this->db->insert('trainings', $data);
       }

       //function to get the training id by course id
       public function get_training_id_by_course_id($course_id) {
         $this ->db->select('training_id');
         $this ->db->from('trainings');
         $this ->db->where('course_id', $course_id);
         $this ->db->limit(1);

         $query = $this->db->get();
          
         if($query->num_rows() >= 1) {
           return $query->result();
         }
         else {
           return false;
         }
       }

       //function to get a specific course
       public function get_training_by_training_id($training_id) {
         $this->db->select('*');
         $this->db->from('trainings');
         $this->db->where('training_id', $training_id);
         $this->db->limit(1);

         $query = $this -> db -> get();
          
         if($query->num_rows() >= 1) {
           return $query->result();
         }
         else {
           return false;
         }
       }
       // a model for querying all trainings
       public function get_trainings_list($year) {
          $this->db->select('a.training_id,  date(a.from_date) as from_date, date(a.to_date) as to_date, a.location, a.date_added, CONCAT(b.firstname, " ", b.lastname) as added_by, c.course_name, a.time_start, a.time_end');
          $this->db->from('trainings as a, users as b, course as c');
		  $this->db->where("EXTRACT(YEAR FROM a.to_date) = $year and a.uid = b.uid and a.course_id = c.course_id");
          $this->db->limit(0);
          //$query = $this->db->select('SELECT  FROM COURSE as a, TRAININGS as b');

          $query = $this ->db -> get();

          if ($query->num_rows() >= 1){
            return $query->result();
          }
          else {
            return false;
          }
       }

       // a model for querying training delegates
       public function get_training_delegates($training_id) {
          $this->db->select('b.*, c.date_paid, c.amount_paid, c.or_no');
          $this->db->from('trainings as a,  delegates as b, delegate_accounts as c, training_attended as d');
          $this->db-> where("a.training_id = $training_id  and
          					 a.training_id = d.training_id and
          					 b.delegate_id = c.delegate_id and 
          					 b.delegate_id = d.delegate_id");
          $this->db->limit(0);
          $query = $this->db->get();

          if ($query->num_rows() >= 1){
            return $query->result();
          }
          else {
            return false;
          }
       }
	   
	   //a model for geting all training from a specific course
	    public function get_trainings_by_course($course_id) {
			$this->db->select('a.*, b.course_name');
		    $this->db->from('trainings as a, course as b');
		    $this->db->where("b.course_id = $course_id and a.course_id = b.course_id");
		    $this->db->limit(0);
		   
		    $query = $this->db->get();
		   
		    if ($query->num_rows() >= 1) {
			    return $query->result();
		    }
		    else {
			    return false;
		    }
	    } 
		
		public function countTodays_trainings() {
			$day = date('d');
			$month = date('m');
			$year = date('Y');
			$this->db->select("count(*) as trainings_count");
			$this->db->from("trainings as a");
			$this->db->where("EXTRACT(YEAR FROM a.to_date) = $year and EXTRACT(MONTH FROM a.to_date) = $month and EXTRACT(DAY FROM a.to_date) = $day");
			$this->db->limit(0);
			$query = $this->db->get();
		   
		    if ($query->num_rows() >= 1) {
			    return $query->result();
		    }
		    else {
			    return false;
		    }
		}
		
		public function updateTraining($training_id, $date_start, $date_end, $time_start, $time_end, $location, $r_fee, $d_fee, $remarks) {
			$data = array(
				'from_date' => $date_start,
				'to_date' => $date_end,
				'time_start' => $time_start,
				'time_end' => $time_end,
				'location' => $location,
				'regular_fee' => $r_fee,
				'discounted_fee' => $d_fee,
				'remarks' => $remarks
			);
			
			$this->db->where("training_id = $training_id");
			return $this->db->update('trainings', $data);
		}
		
		public function getTrainingsbyMonth($month) {
			$year = date('Y');
			
			$this->db->select("a.*, b.course_name as course_name");
			$this->db->from("trainings as a, course as b");
			$this->db->where("EXTRACT(YEAR FROM a.to_date) = $year and EXTRACT(MONTH FROM a.to_date) = $month and a.course_id = b.course_id");
			$this->db->limit(0);
			$this->db->order_by("EXTRACT(DAY FROM a.to_date)", "asc");
			$query = $this->db->get();
		   
		    if ($query->num_rows() >= 1) {
			    return $query->result();
		    }
		    else {
			    return false;
		    }
		}

		public function count_training_participants($training_id) {
			$this->db->select('COUNT(a.delegate_id) as total');
			$this->db->from('training_attended as a');
			$this->db->where("a.training_id = $training_id");

			$query = $this->db->get();
		   
		    if ($query->num_rows() >= 1) {
		    	$total = 0;
		    	foreach ($query->result() as $row) {
		    		$total = $row->total;
		    	}
			    return $total;
		    }
		    else {
			    return false;
		    }
		}

		public function get_training_detail($training_id) {
			$this->db->select('a.location, a.remarks, a.from_date, a.to_date, a.date_added, a.time_end, a.time_start, a.regular_fee,
							   a.discounted_fee, b.category_name, c.course_name, CONCAT(d.firstname, " ", d.lastname) as added_by');
			$this->db->from('trainings as a, categories as b, course as c, users as d');
			$this->db->where("a.training_id = $training_id and 
							  a.course_id = c.course_id and
							  a.uid = d.uid and
							  b.category_id = c.category_id");

			$query = $this->db->get();
		   
		    if ($query->num_rows() >= 1) {
		    	if ($query->num_rows() >= 1) {
			    	return $query->result();
			    }
			    else {
				    return false;
			    }
		    }
		    else {
			    return false;
		    }
		}

		public function add_training_expense($training_id, $expense_name, $amount_paid, $or_no) {
			$data = array(
				'training_id' => $training_id,
				'expense_name' => $expense_name,
				'amount_paid' => $amount_paid,
				'or_no' => $or_no
			);

			return $this->db->insert('training_expenses', $data);
		}
  }
?>
















