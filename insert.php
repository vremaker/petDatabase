<?php
  ## Name: Valerie Remaker
  ## Section: CSE154 AD
  ## Date: 11/29/18
  ## CP 5
  ##
  ## php to add information to the databse using post
  include('common.php');
  $db = get_PDO();

  ## checks to make sure that all of the post variables are set
  try {
    if(isset($_POST["name"]) && isset($_POST["middle"]) &&
       isset($_POST["last"]) && isset($_POST["birth"]) &&
       isset($_POST["gender"]) &&isset($_POST["species"])) {
          add_to($db);
     }
  }  catch (PDOException $ex) {
    error($ex);
  }

  /**
   * Inserts the post parameters into the database, checks for extra security
   * so that no sql commands are passed as parameters
   * @param $db - the database link that we are going to
   */
  function add_to($db){
    $qry = "INSERT INTO Pets (name, middle_name, last_name, birthday, gender, species)
    VALUES (:name, :middle, :last, :birthday, :gender, :species);";
    $stmt = $db->prepare($qry);
    $params = array("name" => $_POST["name"],
                    "middle" => $_POST["middle"],
                    "last" => $_POST["last"],
                    "birthday" => $_POST["birth"],
                    "gender" => $_POST["gender"],
                    "species" => $_POST["species"]);
    $stmt->execute($params);
  }
?>
