const dictionary = {};

function fib(n) {
  console.log('n:', n, dictionary);
  if (n < 2) return 1;
  if (dictionary.hasOwnProperty(n)) return dictionary[n];
  return dictionary[n] = fib(n-1) + fib(n-2);
}

console.log(fib(15));
