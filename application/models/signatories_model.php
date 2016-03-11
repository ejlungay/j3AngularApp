<?php
  Class Signatories_model extends CI_Model
  {
      public function getMaxSignatoriesId() {
        $this->db->select('MAX(a.signatory_id) as id');
        $this->db->from('signatories as a');
        $this->db->limit(0);

        $query = $this -> db -> get();
          
        foreach ($query->result() as $row) {
          return $row->id; 
        }
      }
       //function for adding training course
      public function add_signatories($fname, $mname, $lname, $position, $accredition_no, $training_id, $uid) {
          $isSuccessful = true;

          $data1 = array('uid' => $uid);

          if ($this->db->insert('signatories', $data1)) {
            $signatory_id = $this->getMaxSignatoriesId();

            $data2 = array(
                  'firstname' => $fname,
                  'middlename' => $mname,
                  'lastname' => $lname,
                  'position' => $position,
                  'accredition_no' => $accredition_no,
                  'training_id' => $training_id,
                  'signatory_id' => $signatory_id
            );
            if (!$this->db->insert('training_signatories', $data2)) $isSuccessful = false;
          }
          else $isSuccessful = false;
          
          return $isSuccessful;
      }

      public function get_signatries_using_training_id($training_id) {
        $this->db->select('*');
        $this->db->from('training_signatories as a');
        $this->db->where("a.training_id = $training_id");
        $this->db->limit(0);

        $query = $this -> db -> get();
        if($query -> num_rows() >= 1) {
          
          return $query->result();
        }
        else {
          return false;
        }
      }

      public function signatories() {
        $this->db->select('*');
        $this->db->from('training_signatories as a');
        $this->db->limit(0);

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