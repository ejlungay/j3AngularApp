<?php
  Class User extends CI_Model
  {

      private function get_password($username) {
        $this->db->select('password');
        $this->db->from('users');
        $this->db->where('username', $username);
        $this->db->limit(1);

        $query = $this -> db -> get();
       
        if($query -> num_rows() == 1) {
          foreach ($query->result() as $value) 
          return $value->password;
        }
        else {
          return false;
        }
      }

      function login($username, $password) { 
        $password_from_db = $this->get_password($username);
        if ($password_from_db != null) {
          if (hash_equals($password_from_db, crypt($password, $password_from_db)) ) {
            // Ok!
            $this -> db -> select('*');
            $this -> db -> from('users as a');
            $this -> db -> where("UPPER(a.username) = UPPER('$username') and
                                  a.status = 'ACTIVE'");
            $this -> db -> limit(1);
           
            $query = $this -> db -> get();
           
            if($query -> num_rows() == 1) {
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
        else {
          return false;
        }
      }

       function checkStatus($username) {
        $this->db->select('status');
        $this->db->from('users');
        $this->db->where('username', $username);
        $this -> db -> limit(1);
       
         $query = $this -> db -> get();
       
         if($query -> num_rows() == 1)
         {
           foreach ($query->result() as $row) {
             # code...
            return $row->status;
           }
         }
         else
         {
           return false;
         }
       }

       function updateUserPassword($username, $password) {
          $data = array(
               'password' => md5($password)
            );

          $this->db->where('username', $username);
          $this->db->update('users', $data); 

          return true;
       }

       function updateUserDetail($username, $fname, $mname, $lname, $image) {
          if ($image != null) {
            $data = array(
                 'firstname' => $fname,
                 'middlename' => $mname,
                 'lastname' => $lname,
                 'image' => $image
              );
          }
          else {
            $data = array(
                 'firstname' => $fname,
                 'middlename' => $mname,
                 'lastname' => $lname
              );
          }

          $this->db->where('username', $username);
          $this->db->update('users', $data);
          return true;
       }

       function checkDuplicates($username) {
         $this -> db -> select('*');
         $this -> db -> from('users');
         $this -> db -> where('username', $username);
       
         $query = $this -> db -> get();
       
         if($query -> num_rows() >= 1)
         {
           return true;
         }
         else
         {
           return false;
         }
       }
	   
	   function updateProfilePicture($username, $img) {
		   $imgData = $img['full_path'];
		   $data = array('image' => $imgData);
		   $this->db->where('username', $username);
		   return $this->db->update('users', $data);
	   }
	   
	   function getUserType($uid) {
			$this -> db -> select('a.user_type');
			$this -> db -> from('users as a');
			$this -> db -> where('a.uid', $uid);
			$this -> db -> limit(1);
       
			$query = $this -> db -> get();
       
			if($query -> num_rows() >= 1)
			{
				return $query->result();
			}
			else
			{
				return false;
			}
	   }
	   
	   function getUserDetailUsingUserId($userid) {
			$this -> db -> select('*');
			$this -> db -> from('users as a');
			$this -> db -> where('a.uid', $userid);
			$this -> db -> limit(1);
       
			$query = $this -> db -> get();
       
			if($query -> num_rows() >= 1)
			{
				return $query->result();
			}
			else
			{
				return false;
			}
	   }

     function getUserDetail($username) {
      $this -> db -> select('*');
      $this -> db -> from('users as a');
      $this -> db -> where('a.username', $username);
      $this -> db -> limit(1);
       
      $query = $this -> db -> get();
       
      if($query -> num_rows() >= 1)
      {
        return $query->result();
      }
      else
      {
        return false;
      }
     }

     public function signup($username, $password, $firstname, $lastname, $middlename, $user_type, $image) {
        //encrypting password
        $cost = 10;
        $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
        $salt = sprintf("$2a$%02d$", $cost) . $salt;
        $hash = crypt($password, $salt);

        $data = array (
          'username' => $username,
          'password' => $hash,
          'firstname' => $firstname,
          'middlename' => $middlename,
          'lastname' => $lastname,
          'user_type' => $user_type,
          'image' => $image
        );

        return $this->db->insert('users', $data);
     }

     public function get_users() {
        $this->db->select('*');
        $this->db->from('users');
        $this->db->limit(0);

        $query = $this -> db -> get();
       
        if($query -> num_rows() >= 1)
        {
          return $query->result();
        }
        else
        {
          return false;
        }
     }

     public function updateUserType($uid, $newType) {
        $data = array(
            'user_type' => $newType
        );

        $this->db->where('uid', $uid);
        return $this->db->update('users', $data);
     }

    public function updateUserStatus($uid, $newStatus) {
        $data = array(
            'status' => $newStatus
        );

        $this->db->where('uid', $uid);
        return $this->db->update('users', $data);
     }     

     public function filterUsers($key) {
      $where = "a.user_type = '$key'";

      if ($key === 'Active' || $key === 'Inactive') $where = "a.status = '$key'";

      if ($key === 'Super Admin' || $key === 'Admin' || $key === 'Standard User') $where = "a.user_type = '$key'";

      $this->db->select('*');
      $this->db->from('users as a');
      $this->db->where($where);

      $query = $this -> db -> get();
       
        if($query -> num_rows() >= 1)
        {
          return $query->result();
        }
        else
        {
          return false;
        }
     }
  }
?>