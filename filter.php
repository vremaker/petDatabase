<?php
  ## Valerie Remaker
  ## CS 154 AD
  ## 11/29/18
  ## CP 5
  ##
  ## Takes requests to filter the content in the table, either by the birthday
  ## of the pet, or by the birthday

  include('common.php');
  $db = get_PDO();

  # checks to see if the gets are filled if not throws an error
  try {
    if(isset($_GET["filter"])) {
      if($_GET["filter"] === "birthday"){
        print_all($db, "birthday");
      } else if ($_GET["filter"] === "name"){
        print_all($db, "name");
      }
    }
  } catch (PDOException $ex)  {
    error($ex);
  }

  /**
   * Returns a json object of all the information from the database
   * @param $db - the database we are connecting to
   * @param $catagory - the catagory sorting by, whether books or date
   */
  function print_all($db, $catagory) {
    $all = "name, middle_name, last_name, birthday, species, gender";
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rows = $db->query("SELECT * FROM Pets ORDER BY {$catagory};");
    $results = array();
    while ($row = $rows->fetch(PDO::FETCH_ASSOC)) {
      array_push($results, $row);
    }
    encode($results);
  }
?>
