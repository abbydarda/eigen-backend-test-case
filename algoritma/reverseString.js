const reverseString = (str) => {
 return str.slice(0, -1).split('').reverse().join('').concat(str.slice(-1));
};

console.log(reverseString('NEGIE1'));
