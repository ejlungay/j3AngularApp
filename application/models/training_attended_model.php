<?php
	Class training_attended_model extends CI_Model {

		private function getMaxTrainingAttendedId() {
			$this->db->select('MAX(a.ta_id) as max_id');
			$this->db->from('training_attended as a');

			$query = $this->db->get();
			
			if ($query->num_rows() >= 1) {
				$res = 0;
				foreach ($query->result() as $row) {
					# code...
					$res = $row->max_id;
				}
				return $res;
			}
			else {
				return false;
			}
		}

		public function add_training_attended($delegate_id, $training_id, $amount_paid, $or_no) {			
			$isSuccessful = true;

			$data = array(
						'delegate_id' => $delegate_id,
						'training_id' => $training_id
			);

			if ($this->db->insert('training_attended', $data)) {
				$max_id = $this->getMaxTrainingAttendedId();

				$data2 = array(
					'delegate_id' => $delegate_id,
					'training_attended_id' => $max_id,
					'amount_paid' => $amount_paid,
					'or_no' => $or_no
				);

				if (!$this->db->insert('delegate_accounts', $data2)) $isSuccessful = false;

			}
			else $isSuccessful = false;

			return $isSuccessful;
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