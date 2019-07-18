## Immutable - zapewnienie niezmienności _state_, _pure function_, unikanie mutacji tablic i obiektów  
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Redux state - stan aplikacji musi być niezmienny - immutable. Oznacza to, iż realizowana w funkcji reducer, każdorazowa jego zmiana,
nie jest dokonywana poprzez modyfikacją istniejącego stanu, a poprzez wygenerowanie nowego na bazie istniejącego.
Z tego powodu funkcje reducer muszą być tzw. funkcjami czystymi - _pure function_. Funkcje czyste
+ zwracają wartości bazując jedynie na swoich argumentach
+ nie powodują wywołania instrukcji generujących uboczne efekty np. aktualizacja w bazie danych, wywołanie usługi sieciowej. 
To ma być przewidywalna funkcją która zawsze przy takich samych warunkach wejściowych wygeneruje te same zwroty.
+ nie modyfikuje swoich argumentów wejścowych.  

#### Przykład  - Funkcje pure i impure

```javascript
/* pure */
function sum(x) {
    return x + x;
}

function sumAll(items) {
    return items.map(sum);
}
```
```javascript
/* impure */
function sum(x) {
    updateDB(x);
    return x + x;
}

function sumAll(items) {
    for (let i=0; i< items.length; i++){
        items[i] = sum(items[i]);
    }
}
``` 

#### Przykład - Test immutable
Poniżej w przykładach używana jest funkcja deep-freeze z bibloteki o tej samej nazwie. Zamrożenie (deep-freeze) obiektu (tablicy) za jej pomocą skutkuje tym, 
że jeżeli w trakcie działania zostanie podjęta próba naruszenia niezmienności obiektu zostanie wyrzucony wyjątek. 
Dodatkowo bibliotek expect realizuje asercję - w tym przypadku test równości.
```javascript
const testEquality = (f, before, after) => {
    deepFreeze(before);
    
    expect(
        f(before)
    ).toEqual(after)
};

```
#### Przykład - Unikanie modyfikowania tablic
Przy dodawaniu elementów do tablicy okazuje się iż używając _concat_ czy operatora rozbicia _spread_ zachowujemy niezmienność tablicy źródłowej (tworzymy jej kopię).
W przypadku push - modyfikujemy tablicę - stąd test przy użyciu tej metody zakończył się niepowodzeniem.    
```javascript
/* dodawanie do tablicy */
const addByPush = (array) => {
    array.push(0);
    return array;
};
const addByConcat = (array) => {
    return array.concat([0]);
};
const addBySpreadOperator = (array) => {
    return [...array, 0];
};

testEquality(addByPush, [], [0]);  // -- Test FAIL 
testEquality(addByConcat, [], [0]); // -- Test PASSED
testEquality(addBySpreadOperator, [], [0]); // -- Test PASSED

```
Natomiast usunięcie elementów z tablicy za pomocą _splice_ ją modyfikuję, za pomocą _slice_ i operatora _spread_ nie - jest immutable.  
```javascript
/* usuwanie z tablicy */
const removeBySplice = (array) => {
    array.splice(1, 1);
    return array;
};

const removeBySlice = (array) => {
    let index = 1;
    return array.slice(0, index).concat(array.slice(index + 1));
};

const removeBySpreadOperator = (array) => {
    let index = 1;
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
};

testEquality(removeBySplice, [0, 10, 20], [0, 20]);  // -- Test FAIL 
testEquality(removeBySlice, [0, 10, 20], [0, 20]); // -- Test PASSED
testEquality(removeBySpreadOperator, [0, 10, 20], [0, 20]); // -- Test PASSED

```
#### Przykład - Unikanie modyfikowania obiektów
W przypadku obiektów bezpośrednie ich modyfikowanie (toggleTodoDirect) powoduje ich zmianę. Niezmienność natomiast gwarantowana jest w przypadku tworzenia 
nowego obiektu "ręcznie" (toggleTodoByGenNew), oraz przez wygenerowanie nowego obiektu kopiując go za pomocą _Object.assign()_ albo za pomocą 
operatora spread (toggleTodoByGenNewSpread, toggleTodoByGenNewSpread)  
```javascript
/* testowane funkcje */
const toggleTodoDirect = (todo) => {
    todo.completed = !todo.completed;
    return todo;
};
const toggleTodoByGenNew = (todo) => {
    return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
    };
};
const toggleTodoByGenNewAssign = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
};
const toggleTodoByGenNewSpread = (todo) => {
    return {
        ...todo,
        completed: !todo.completed
    }
};
```
```javascript
/* todo - przed i po (oczekiwany) */
const todoBefore = {
    id: 0,
    text: "Earn 10USD",
    completed: false
};
const todoAfter = {
    id: 0,
    text: "Earn 10USD",
    completed: true
};

/* test */
testEquality(toggleTodoDirect, todoBefore, todoAfter);  // -- Test FAIL 
testEquality(toggleTodoByGenNew, todoBefore, todoAfter);  // -- Test PASSED 
testEquality(toggleTodoByGenNewAssign, todoBefore, todoAfter);  // -- Test PASSED 
testEquality(toggleTodoByGenNewSpread, todoBefore, todoAfter);  // -- Test PASSED 
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/03-react-counter-example/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/03-react-counter-example/README.md)
 </sub>