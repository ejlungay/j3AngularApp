<?php
	Class Category_model extends CI_Model {
        //function for adding training course
		public function add_category($name, $userid, $description) {
			$data = array('category_name' => $name,
						  'user_id' => $userid,
						  'description' => $description
			);

			return $this->db->insert('categories', $data);
		}
      
		//function to get a specific speaker detail
		public function get_category_by_id($id) {
			$this -> db -> select('*');
			$this -> db -> from('categories as a');
			$this -> db -> where('a.category_id', $id);
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
		public function updateCategory($name, $id, $description) {
			$data = array(
					'category_name' => $name,
					'description' => $description
			);

			$this->db->where('category_id', $id);
			$this->db->update('categories', $data);
			return true;
		}
		
		public function category_list() {
			$this->db->select('a.*, CONCAT(b.firstname, " ", b.lastname) as added_by');
			$this->db->from('categories as a, users as b');
			$this->db->where('a.user_id = b.uid');
			$this->db->limit(0);
			$this->db->order_by('a.category_name');
			
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