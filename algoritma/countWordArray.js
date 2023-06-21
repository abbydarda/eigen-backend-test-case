const countWordArray = (input, query) => {
 const count = query.map(
  (word) => input.filter((item) => item === word).length
 );
 return count;
};

console.log(countWordArray(['xc', 'dz', 'bbb', 'dz'], ['bbb', 'ac', 'dz']));
