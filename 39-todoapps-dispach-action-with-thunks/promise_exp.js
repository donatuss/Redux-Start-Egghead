myPromise = (filter) => {
    return new Promise((resolve, reject) => {
        Math.random() > filter ? resolve({status: 1}): reject({status: 0});
    })
};

const dispatch = x => {
    let myActionResult =  {...x, status: x.status + 100};
    console.log("myActionResult", myActionResult);
    return myActionResult;
};

myPromise(0.1)
.then(data => data).then(dispatch)
.catch(err => console.log("error :", err));

//myActionResult { status: 101 }


//Przykład 2:
//f funkcja która przyjmuje argument x a zwraca funkcję przyjmującą argument y
//w wyniku dając sumę argumentów x i y

const f = (x) => g => { return g(x) };
f({status: 200})(dispatch);         //f(10): y => x + y
