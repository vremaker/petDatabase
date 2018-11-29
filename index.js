// Name: Valerie Remaker
// Date: 11/28/18
// Section: CSE 154 AD
// CP5
//
// Handles button clicks and appending information to the webpage
// with information from the php and server documents.
(function() {
  "use strict";
  window.addEventListener("load", initialize);

  /**
  * adds functionality to the buttons on the page, where you sort or add
  * content to the webpage
  */
  function initialize() {
    $("sortBday").addEventListener("click", function(){
      newSort("birthday");
    });
    $("sortName").addEventListener("click", function(){
      newSort("name");
    });
    $("enter").addEventListener("click", add);
  }

  /**
  * checks to see if the input boxes on the page are all filled with text
  * if they are, it allows for posting otherwise an error is thrown
  */
  function add(){
    let values = [$("name").value, $("middle").value, $("last").value,
                  $("birth").value, $("gender").value, $("species").value];
    if(check(values)){
      addToTable(values);
    } else {
      let error = document.createElement("p");
      error.innerText = "You are missing fields. Remember to all sections out";
      $("errorMessage").appendChild(error);
      setTimeout(returnState, 2000);
    }
  }

  /**
   * clears the error message so the page looks the same again
   */
  function returnState () {
    $("errorMessage").innerHTML ='';
  }

  /**
  * Takes the information from the input boxes from the data entry field, and
  * uses them to add to the sql database.
  * @param {array} values  - the information from the input boxes in html
  */
  function addToTable(values){
    let url = "insert.php";
    let params = new FormData();
    params.append("name", values[0]);
    params.append("middle", values[1]);
    params.append("last", values[2]);
    params.append("birth", values[3]);
    params.append("gender", values[4]);
    params.append("species", values[5]);
    fetch(url, {method : "POST", body : params})
      .then(checkStatus)
      .then(final)
      .catch(handleFailure);
  }

  /**
  * Clears the input boxes on the webpage and calls for an update of the
  * database information in the table
  * @param {array} data - the information passed from the ajax request
  */
  function final() {
    $("name").value ='';
    $("middle").value ='';
    $("last").value ='';
    $("birth").value ='';
    $("gender").value ='';
    $("species").value ='';
    newSort("name");
  }

  /**
  * checks to see if all of the text input areas have content in them
  * @param {array} values - the information from the text inputs
  * @return {boolean} - are all of the boxes filled?
  */
  function check(values) {
    for(let i = 0; i < values.length; i++){
      if(values[i].length < 1){
        return false;
      }
    }
    return true;
  }

  /**
  * filters the database selection based upon whether you want it ordered by
  * alphabetical name, or if you want it sorted by age.
  * @param {string} key - whether you are searching for birthday or name sorting
  */
  function newSort(key) {
    let url = "filter.php" + "?filter=" + key;
    fetch(url)
      .then(checkStatus)
      .then(JSON.parse)
      .then(response)
      .catch(handleFailure);
  }

  /**
  * handles and error and displays an error message on the page that then
  * goes away so the user can use the page again
  * @param {object} data - the error from the api calls
  */
  function handleFailure() {
    response.innerHTML ='';
    let error = document.createElement("h1");
    error.innerText = "Whoopse! Something went wrong, Please Try again later";
    $("errorMessage").appendChild(error);
    setTimeout(returnState, 2000);
  }

  /**
  * fills out the table with the information from the sql database. with a
  * header at the top of the columns
  * @param {object} data - the information from the database
  */
  function response(data) {
    $("response").innerHTML = ' ';
    console.log(data);
    let columnNames = ["Name", "Middle Name", "Last Name",
    "Birthday", "Gender", "Species"];
    let table = document.createElement("table");
    let row = document.createElement("tr");
    for (let i = 0; i < columnNames.length; i++) {
      let header = document.createElement("th");
      header.innerText = columnNames[i];
      row.appendChild(header);
    }
    table.appendChild(row);
    for(let item =0; item < data.length; item++) {
      row = document.createElement("tr");
      row.appendChild(createNext("name", data[item]));
      row.appendChild(createNext("middle_name", data[item]));
      row.appendChild(createNext("last_name", data[item]));
      row.appendChild(createNext("birthday", data[item]));
      row.appendChild(createNext("gender", data[item]));
      row.appendChild(createNext("species", data[item]));
      table.appendChild(row);
    }
    $("response").appendChild(table);
  }

  /**
  * Makes and returns a DOM element for the passed element to be appended to
  * the table.
  * @param {string} type - the name of the key for the json information
  * @param {object} data - the bit of json regarding the specific element
  * @return {object} - the dom object with the information from the json in it
  */
  function createNext(type, data) {
    let returnable = document.createElement("td");
    returnable.innerText = data[type];
    return returnable;
  }
  /* ------------------------------ Helper Functions  ------------------------------ */
  // Note: You may use these in your code, but do remember that your code should not have
  // any functions defined that are unused.

  /**
  * Returns the element that has the ID attribute with the specified value.
  * @param {string} id - element ID
  * @returns {object} DOM object associated with id.
  */
  function $(id) {
    return document.getElementById(id);
  }

  /**
  * Helper function to return the response's result text if successful, otherwise
  * returns the rejected Promise result with an error status and corresponding text
  * @param {object} response - response to check for success/error
  * @returns {object} - valid result text if response was successful, otherwise rejected
  *                     Promise result
  */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
