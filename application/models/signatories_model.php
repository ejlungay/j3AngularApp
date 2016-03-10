<?php
  Class Signatories_model extends CI_Model
  {
       //function for adding training course
       public function add_signatories($title, $fname, $mname, $lname, $position, $accredition_no, $training_id) {
          $data = array(
              'title' => $title,
              'firstname' => $fname,
			  'middlename' => $mname,
			  'lastname' => $lname,
			  'position' => $position,
			  'accredition_no' => $accredition_no,
			  'training_id' => $training_id
          );

          return $this->db->insert('training_signatories', $data);
       }
  }
?>