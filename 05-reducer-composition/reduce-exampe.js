let numbers = [175, 50, 25];

function myFunc(total, num) {
    return total - num;
}

console.log(numbers.reduce(myFunc));
console.log(numbers.reduce(myFunc, 250));