<?php
  ## Valerie Remaker
  ## CSE154 AD
  ## Date 11/29/18
  ## CP5
  ##
  ## common php that sets up the database connection, error handling and
  ## json export
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  /**
   * Returns a PDO object connected to the bmstore database. Throws
   * a PDOException if an error occurs when connecting to database.
   * @return {PDO}
   */
  function get_PDO() {
    $host =  "localhost";
    $port = "8889"; # Make sure this matches your server (e.g. MAMP) port
    $user = "root";
    $password = "root";
    $dbname = "the_remakers";

    $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

    try {
      $db = new PDO($ds, $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    } catch (PDOException $ex) {
      error("Can not connect to the database. Please try again later.", $ex);
    }
  }

  /**
   * Prints out a plain text 400 error message given $msg. If given a second
   * (optional) argument as
   * an PDOException, prints details about the cause of the exception.
   * @param $ex {PDOException} - (optional) Exception object with additional
   * exception details to print
   */
   function error($ex){
     header("HTTP/1.1 400 Invalid Request");
     header("Content-Type: text/plain");
     print ("Can not connect to the database. Please try again later.\n");
     print ("Error details: $ex \n");
     die();
   }

   /**
    * Returns a json encoded object and sets the Json header.
    * @param $final {array} - the information being converted to json for
    * return and use on a web page
    */
   function encode($final) {
     $return = json_encode($final);
     header("Content-Type application/json");
     echo $return;
   }
?>
