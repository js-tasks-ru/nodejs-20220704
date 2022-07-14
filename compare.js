const str1 = 'as1d9f87as9d78fa9s87df89as';
const str2 = 'asd9f87as9d78fa9s87df89aq';

const longest = Math.max(str1.length, str2.length);

let equals = true;

for (let i = 0; i < longest; i++) {
  if (str1[i] !== str2[i]) equals = false;
}

if (equals) {
  console.log('equals');
} else {
  console.log('not equal');
}
