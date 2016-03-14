<?php
	Class training_attended_model extends CI_Model {

		public function add_training_attended($delegate_id, $training_id) {			
			$data = array(
						'delegate_id' => $delegate_id,
						'training_id' => $training_id
				);

			return $this->db->insert('training_attended', $data);
		}

		public function checkDelegate($delegate_id, $training_id) {
			$this->db->select('COUNT(a.delegate_id) as total');
			$this->db->from('training_attended as a');
			$this->db->where("a.delegate_id = $delegate_id and a.training_id = $training_id");

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