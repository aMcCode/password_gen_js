/* setup the initial vars */
var alphabet_lc = Array.from("abcdefghijklmnopqrstuvwxyz");
var alphabet_uc = alphabet_lc.map(element => {
  return element.toUpperCase();
});
var numbers = [...Array(10).keys()];
var specialChars = Array.from("!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~");
var length, includeLower, includeUpper, includeNums, includeSpcChars, lengthStr;

/* helper functions */
function askUser_Store_And_Validate_Responses() {

    lengthStr = prompt("What length (from 8 to 128) do you want to use for the password?");
    var includeLowerStr = prompt("Include lowercase letters? Enter 'y' or 'n'.");
    var includeUpperStr = prompt("Include uppercase letters? Enter 'y' or 'n'.");
    var includeNumsStr = prompt("Include numbers? Enter 'y' or 'n'.");
    var includeSpcCharsStr = prompt("Include special characters? Enter 'y' or 'n'.");
  
    length = parseInt(lengthStr);
    includeLower = includeLowerStr.toLowerCase() == "y";
    includeUpper = includeUpperStr.toLowerCase() == "y";
    includeNums = includeNumsStr.toLowerCase() == "y";
    includeSpcChars = includeSpcCharsStr.toLowerCase() == "y";  

}

function haveValidResponses() {

  /* validate input */
  var lengthIsInt = Number.isInteger(length);
  var gotValidNum = lengthIsInt && length >= 8 && length <=128;
  var atLeastOneType = includeLower || includeUpper || includeNums || includeSpcChars;

  if(!lengthIsInt)  {
      alert(`${lengthStr} is not a valid number. Please start over by clicking the "Generate Password" button again.`);
      return false;
  }
  if (!gotValidNum) {
    alert(`You entered ${length}. Passwords are required to be 8 to 128 charcters long. Please start over by clicking the "Generate Password" button again.`);
    return false;
  }
  if (!atLeastOneType) {
    alert('Passwords must be composed of at least one of the following character types. Lowercase, Uppercase, Numeric or Special. You indicated "n" for all character type selections. Please start over by clicking the "Generate Password" button again.')
    return false;
  }  

  return true;
}

function generatePassword() {

  var password = '';

  askUser_StoreResponses();

  if(!haveValidResponses())
    return null;

  while(password.length != length) {
      if (includeLower) {
        password += alphabet_lc[Math.floor(Math.random() * alphabet_lc.length)];
      }
      if (includeUpper) {
        password += alphabet_uc[Math.floor(Math.random() * alphabet_uc.length)];
      }
      if (includeNums) {
        password += numbers[Math.floor(Math.random() * numbers.length)];
      }
      if (includeSpcChars) {
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
      } 
  }

  // scramble all the letters in password.
  var arr = password.split(''); 
  arr.sort(function() {
    return 0.5 - Math.random();
  });  

  return shuffled_pw = arr.join(''); 

}

// Write password to the #password input using taskhandler
var createTaskHandler = function() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", createTaskHandler);

/* 

*/