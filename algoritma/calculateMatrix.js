const calculateDiagonal = (arr) => {
 let firstDiagonal = 0;
 let secondDiagonal = 0;

 for (let i = 0; i < arr.length; i++) {
  const element = arr[i];
  firstDiagonal += element[i];
  secondDiagonal += element[element.length - i - 1];
 }

 return `${firstDiagonal} - ${secondDiagonal} = ${
  firstDiagonal - secondDiagonal
 }`;
};

console.log(
 calculateDiagonal([
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
 ])
);
