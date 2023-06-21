const longest = (sentence) => {
 const longest = sentence.split(' ').sort((a, b) => b.length - a.length)[0];
 return `${longest} : ${longest.length} character`;
};

console.log(longest('Saya sangat senang mengerjakan soal algoritma'));
