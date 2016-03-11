<?php
	Class Course_model extends CI_Model {
			//function for adding training course
		public function add_course($course_name, $user_id, $course_code, $category_id) {
			$data = array(
				'course_name' => $course_name,
				'uid' => $user_id,
				'course_code' => $course_code,
				'category_id' => $category_id
			);

			return $this->db->insert('course', $data);
		}

		//function to get the course id using a course name
		public function get_course_id_by_course_name($course_name) {
			$this -> db -> select('course_id');
			$this -> db -> from('course');
			$this -> db -> where('course_name', $course_name);
			$this -> db -> limit(1);
         

			$query = $this -> db -> get();
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

       //function to get a specific course
		public function get_course_by_course_id($course_id) {
			$this -> db -> select('*');
			$this -> db -> from('course');
			$this -> db -> where('course_id', $course_id);
			$this -> db -> limit(1);
			$query = $this -> db -> get();
          
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}
	   
		public function courseList() {
			$this->db->select('a.course_id, a.course_name, a.course_code, date(a.date_added) as date_added, CONCAT(b.firstname, " ",b.lastname) as added_by');
			$this->db->from('course as a, users as b');
			$this->db->where('a.uid = b.uid');
			$this->db->limit(0);
			$query = $this -> db -> get();
		 
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}
	   
		function updateCourse($course_id, $course_name, $course_code) {
			$data = array(
				'course_name' => $course_name,
				'course_code' => $course_code);

			$this->db->where('course_id', $course_id);
			$this->db->update('course', $data); 

			return true;
		}
	   
		public function get_course_by_category_id($id) {
			$this -> db -> select('*');
			$this -> db -> from('course as a, categories b');
			$this -> db -> where("a.category_id = b.category_id and a.category_id = $id");
			$this -> db -> limit(0);
			$query = $this -> db -> get();
          
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function get_courses_that_has_trainings() {
			$this -> db -> select('a.*, b.*');
			$this -> db -> from('course as a, trainings as b');
			$this -> db -> where("a.course_id = b.course_id");
			$this -> db -> limit(0);
			$query = $this -> db -> get();
          
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}

		public function get_course_by_training_id($id) {
			$this -> db -> select('a.*, b.*');
			$this -> db -> from('course as a, trainings as b');
			$this -> db -> where("a.course_id = b.course_id and b.training_id = $id");
			$this -> db -> limit(0);
			$query = $this -> db -> get();
          
			if($query -> num_rows() >= 1) {
				return $query->result();
			}
			else {
				return false;
			}
		}
	}
?>