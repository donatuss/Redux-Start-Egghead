/*
Przykład 1:
h funkcja która przyjmuje argument x a zwraca jakąś (nieokreśloną funkcję)
próba wypisania h(10) wywołuje błąd ReferenceError
*/
const h = (x) => g;
//console.log("h(10):", h(10)); ReferenceError: g is not defined

/*
Przykład 2:
f funkcja która przyjmuje argument x a zwraca funkcję przyjmującą argument y
w wyniku dając sumę argumentów x i y
*/
const f = (x) => g = y => x + y;
console.log("f(10):", f(10));         //f(10): y => x + y
console.log("f(10)(10):", f(10)(10)); //f(10)(10): 20

/*
Przykład 3:
s funkcja która przyjmuje argument x a zwraca jakąś funkcję (g) przyjmującą jako argument
funkcją w która to jako argument przyjmuje y a w wyniku daje sumę argumentu
x z y oraz wynikiem działania funkcji g na argumencie x i y.
*/
const s = (x) => g => w = y => (x + y + g(x, y));
/*
Funkcje g nie jest jeszcze zdefiniowana więc chcą wywołać tą składnie musimy ją zdefiniować
w taki sposób by przyjmowała 2 argumenty
*/
console.log(s(10)((a1, a2) => (a1 + a2))); //[Function: w]
/*
Powyższa składnia dała mi funkcje która jak odpytam z parametrem 10 otrzymam skumulowany wynik
10 + 10 + (10+10)
*/
console.log(s(10)((a1, a2) => (a1 + a2))(10)); //40


/*
Przykład 4:
f1 przyjmuje argument x zwraca nieokreśloną funkcje f2
f2 przyjmuje jako argument nieokreśloną funkcją f3 a
f3 przyjmuje jako argument określoną funkcją f4 która działą na argumencie y w wyniku
dają sumę x i wynik działania funkcji f2 f3 na argumentach x, y
*/
const f1 = (x) => f2 => f3 => f4 = y => x + f2(x) + f3(y);
console.log(f1(1)(x => x + 1)(x => x + 2)(5)); // 1+(1+1)(5+2) = 10
