module.exports = function check(str, bracketsConfig) {
  const masStr = str.split(''), masTmp = [];
  let masOpenBracket = [], masCloseBracket = [], masSameBracket = [], masSameBracketCounter = [];

  bracketsConfig.forEach((item, i) => {
    if (item[0] === item[1]) {
      masSameBracket.push(item[0]);
      masSameBracketCounter.push(0);
    }
    else {
      masOpenBracket.push(item[0]);
      masCloseBracket.push(item[1]);
    }
  });

  for (let i = 0; i < masStr.length; i++) {
    const item = masStr[i];

    if (masSameBracket.includes(item)) {
      let indexBracketInConfig = masSameBracket.indexOf(item);

      if (masSameBracketCounter[indexBracketInConfig] === 0) {
        masTmp.push(item);
        masSameBracketCounter[indexBracketInConfig] = 1;
      }
      else {
        if (masTmp[masTmp.length - 1] === item) {
          masTmp.pop();
          masSameBracketCounter[indexBracketInConfig] = 0;
        }
        else {
          return false;
        }
      }
    }
    else {
      if (masCloseBracket.includes(item)) {
        let indexBracketInConfig = masCloseBracket.indexOf(item);

        if (masTmp.length === 0 || masTmp[masTmp.length - 1] !== masOpenBracket[indexBracketInConfig]) return false;

        masTmp.pop();
      }

      if (masOpenBracket.includes(item)) masTmp.push(item);
    }
  };

  return masTmp.length === 0 ? true : false;
}
