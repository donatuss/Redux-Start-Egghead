##Podstawowe  Zasady Redux <br/>
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

## Pierwsza zasada Redux
Bez znaczenia od złożoności aplikacji cały jej stan, 
jest reprezentowany przez pojedynczy obiekt 
JavaScript który nazywamy state lub state tree.

## Druga zasada Redux
Obiekt state jest tylko do odczytu. Nie można go bezpośrednio modyfikować. 
Jedyną drogą do zmiany stanu jest wysłanie akcji. Akcja to obiekt JavaScript opisujący zmianę.
O ile state to minimalna reprezetacja danych aplikacji, o tyle akcja to minimalna reprezentacja zmiany tych danych. 
Struktura obiektu akcji jest dowolna jedynym wymaganiem jest posiadanie zdefiniowanej właściwości type. 

## Trzecia zasada Redux
Aby opisać zmiany stanu aplikacji Redux wymaga napisania funkcji nazywanej Reducer. 
Funkcja ta pobiera poprzedni obiekt stanu aplikacji (state),  oraz akcje, zwraca natomiast następny stan aplikacji - zmieniony 
w wyniku działania akcji. Ważną rzeczą jest to że funkcja reducer nie modyfikuje obiektu state a zawsze zwraca nowy obiekt.    
<br/>

#### Pojedynczy niezmienny obiekt reprezentujacy stan aplikacji - state, state tree
>Oba poniższe przykłady obrazują zmiany stanu aplikacji logując go na konsoli. W przypadku prostej aplikacji Counter przez stan rozumiany 
>będzie obiekt JavaScript Number reprezentujacy stan licznika. W aplikacji Todos stan jest bardziej skomplikowany - reprezentuje go obiekt JavaScript
>zachowujący inforamacje o bieżących zadaniach (todo), ich właściwościach (aktywne, zrobione), o filtrze decydującym o prezentacji zadań na interfejsie użytkownika.    
>Przykład 1: [Aplikacja Counter](https://codepen.io/donatuss/pen/VJgdXw)<br/>
>Przykład 2: [Aplikacja Todos](https://codepen.io/donatuss/pen/rEqzNJ)


#### Stan aplikacji - state jest readonly. Zmiana stanu jest opisywana przez akcje 
>Oba poniższe przykłady logują na konsoli akcje które wpływają na zmianę stanu. Logowana jest sama akcja jak i zmieniony w jej wyniku stan.     
>Przykład 3: [Aplikacja Counter](https://codepen.io/donatuss/pen/ormPjo)<br/>
>Przykład 4: [Aplikacja Todos](https://codepen.io/donatuss/pen/ewxLdz)

#### Funkcja Reducer - bieżący stan i akcja - generuje nowy stan zwracany przez funkcje reducer
>W przykładach powyżej w aplikacji Counter funkcję reduktora pełni funkcja counter.
>W aplikacji Todos reduktorami są funkcję visibilityFilter, todos      
    
