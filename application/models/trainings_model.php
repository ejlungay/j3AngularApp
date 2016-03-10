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
          $this->db->select('a.training_id,  date(a.from_date) as from_date, date(a.to_date) as to_date, a.location, a.date_added, CONCAT(b.firstname, " ", b.lastname) as added_by, c.course_name');
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
          $this->db->select('b.*');
          $this->db->from('trainings as a,  delegates as b');
          $this->db-> where("a.training_id = $training_id  and a.training_id = b.training_id");
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
		
		public function updateTraining($training_id, $date_start, $date_end, $time_start, $time_end, $location, $r_fee, $d_fee) {
			$data = array(
				'from_date' => $date_start,
				'to_date' => $date_end,
				'time_start' => $time_start,
				'time_end' => $time_end,
				'location' => $location,
				'regular_fee' => $r_fee,
				'discounted_fee' => $d_fee
			);
			
			$this->db->where("training_id = $training_id");
			return $this->db->update('trainings', $data);
		}
		
		public function getTrainingsbyMonth($month) {
			$year = date('Y');
			
			$this->db->select("*");
			$this->db->from("trainings as a");
			$this->db->where("EXTRACT(YEAR FROM a.to_date) = $year and EXTRACT(MONTH FROM a.to_date) = $month");
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
  }
?>
















