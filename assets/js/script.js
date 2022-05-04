/*
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
*/

/* setup the initial arrays */
var alphabet_lc = Array.from("abcdefghijklmnopqrstuvwxyz");
var alphabet_uc = alphabet_lc.map(element => {
  return element.toUpperCase();
});
var numbers = [...Array(10).keys()]
var specialChars = Array.from("!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~");


function generatePassword() {
  /* ask user */
  var lengthStr = prompt("What length (from 8 to 128) do you want to use for the password?");
  var includeLowerStr = prompt("Include lowercase letters?");
  var includeUpperStr = prompt("Include uppercase letters?");
  var includeNumsStr = prompt("Include numbers?")
  var includeSpcCharsStr = prompt("Include special characters?")

  /* store values */
  var length = parseInt(lengthStr);
  var includeLower = includeLowerStr.toLowerCase() == "y";
  var includeUpper = includeUpperStr.toLowerCase() == "y";
  var includeNums = includeNumsStr.toLowerCase() == "y";
  var includeSpcChars = includeSpcCharsStr.toLowerCase() == "y";

  /* validate input */
  var gotValidNum = Number.isInteger(length) && length >= 8 && length <=128;
  var atLeastOneType = includeLower || includeUpper || includeNums || includeSpcChars;

    if (!gotValidNum) {
      return "Invalid number. Please try again.";
    }
    
    if (!atLeastOneType) {
      return 'Please try again. At least one character type must be specified.'
    }

    var testStr = `got validNum: ${gotValidNum}, atLeastOneType: ${atLeastOneType}, length: ${length}, lower: ${includeLower}, upper: ${includeUpper}, nums: ${includeNums}, special: ${includeSpcChars}`;

    var password = '';

    while(password.length != length) {
      if (includeLower) {
        // loop through alphabet_lc
        // randomly get at least one character
        var lcVal = alphabet_lc[Math.floor(Math.random() * alphabet_lc.length)];

      }

      if (includeUpper) {
        // loop through alphabet_up
        // randomly get at least one character
        // update password (look into stringbuilder)
      }

      if (includeNums) {
        // loop through numbers
        // randomly get at least one character
        // update password (look into stringbuilder)

      }

      if (includeSpcChars) {
        // loop through specialChars
        // randomly get at least one character
        // update password (look into stringbuilder)
      }

      //scramble all the letters in password. return password.
      // const shuffled_pw = str => [...str].sort(()=>Math.random()-.5).join('');
      //   document.write(shuffle(password));
        
      return testStr;

      }
}


// Write password to the #password input
var createTaskHandler = function() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", createTaskHandler);
