const express = require('express');
const app = express();

app.use(express.json());
const USER_ID = "endela_bhargav_reddy_15112004";
const EMAIL = "bhargavreddy8985@gmail.com";
const ROLL_NUMBER = "22BCE9741";
function isNumberString(str) {
  return /^-?\d+$/.test(str);
}
function isAlphabetString(str) {
  return /^[a-zA-Z]+$/.test(str);
}
function alternateCaps(str) {
  let result = '';
  let upper = true;
  for (let ch of str) {
    result += upper ? ch.toUpperCase() : ch.toLowerCase();
    upper = !upper;
  }
  return result;
}
app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        message: "Invalid input: 'data' must be an array"
      });
    }

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let allAlphaConcat = '';

    for (let item of data) {
      if (typeof item !== 'string') {
        item = String(item);
      }

      if (isNumberString(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (isAlphabetString(item)) {
        alphabets.push(item.toUpperCase());
        allAlphaConcat += item;
      } else {
        for (let ch of item) {
          if (!isAlphabetString(ch) && !isNumberString(ch)) {
            special_characters.push(ch);
          }
        }
      }
    }
    
    let reversedAlpha = allAlphaConcat.split('').reverse().join('');
    let concat_string = alternateCaps(reversedAlpha);

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (error) {
    res.status(200).json({
      is_success: false,
      message: "An error occurred",
      error: error.message
    });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 
