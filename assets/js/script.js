/* setup the initial vars */
var alphabet_lc = Array.from("abcdefghijklmnopqrstuvwxyz");
var alphabet_uc = alphabet_lc.map(element => {
  return element.toUpperCase();
});
var numbers = [...Array(10).keys()];
var specialChars = Array.from("!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~");
var pw_length, includeLower, includeUpper, includeNums, includeSpcChars, lengthStr;

/* helper functions */
function gotValidLength(length_Str) {

  if(length_Str === null) {
    alert("Program cancelled. Thank you.");
    return false;
  }

  /* seems like this is the best option since parseInt
      returned first char as number */
  pw_length = Number(length_Str);
  var lengthIsInt = Number.isInteger(pw_length);
  var gotValidNum = lengthIsInt && pw_length >= 8 && pw_length <=128;

  if(!lengthIsInt)  {
    if (length_Str.trim() === '')
      length_Str = '<empty>'
    alert(`${length_Str} is not a valid number. Please start over by clicking the "Generate Password" button again.`);
    return false;
  }
  if (!gotValidNum) {
    alert(`You entered ${pw_length}. Passwords are required to be 8 to 128 charcters long. Please start over by clicking the "Generate Password" button again.`);
    return false;
  }

  return true;
}

function gotValidCharTypeResponse(response) {
  if(response === null) {
    alert("Program cancelled. Thank you.");
    return false;
  }

  var got_y_or_n = response.toLowerCase() === 'y' || response.toLowerCase() === 'n';
  if(!got_y_or_n) {
    if (response.trim() === '')
      response = '<empty'
    alert(`${response} is not one of the expected values ('y' or 'n'). Please start over by clicking the "Generate Password" button again.`);
      return false;
  }

  return true;
}

var gotValidResponse = function askUser_ConfirmGotValidResponses() {

  lengthStr = prompt("What length (from 8 to 128) do you want to use for the password?");
  if(!gotValidLength(lengthStr))
    return false;

  var includeLowerStr = prompt("Include lowercase letters? Enter 'y' or 'n'.");
  if(!gotValidCharTypeResponse(includeLowerStr))
    return false; 
  var includeUpperStr = prompt("Include uppercase letters? Enter 'y' or 'n'.");
  if(!gotValidCharTypeResponse(includeUpperStr))
    return false;
  var includeNumsStr = prompt("Include numbers? Enter 'y' or 'n'.");
  if(!gotValidCharTypeResponse(includeNumsStr))
    return false;
  var includeSpcCharsStr = prompt("Include special characters? Enter 'y' or 'n'.");
  if(!gotValidCharTypeResponse(includeSpcCharsStr))
    return false;

  includeLower = includeLowerStr.toLowerCase() === "y";
  includeUpper = includeUpperStr.toLowerCase() === "y";
  includeNums = includeNumsStr.toLowerCase() === "y";
  includeSpcChars = includeSpcCharsStr.toLowerCase() === "y";  

  var atLeastOneType = includeLower || includeUpper || includeNums || includeSpcChars;

  if (!atLeastOneType) {
    alert('Passwords must be composed of at least one of the following character types. Lowercase, Uppercase, Numeric or Special. You indicated "n" for all character type selections. Please start over by clicking the "Generate Password" button again.')
    return false;
  }  

  return true;
}

/* main function */
function generatePassword() {

  var password = '';

  if(!gotValidResponse())
    return 'no password generated';

  while (password.length < pw_length) {
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

  //scramble the password
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
