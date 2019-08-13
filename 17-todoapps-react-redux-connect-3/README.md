## 17 Todos Aplikacja - Część 12 - Redux-React connect - przekazanie danych do komponentów prezentacji
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 12 aplikacji Todos - Zmiana komponentu kontenera FilterLink. Użycie funkcji connect z react-redux.
FilterLink jako pośrednik w dostarczeniu do komponentu Link właściwości active wyliczanej na bazie state redux, i własnej właściwości filter,
oraz jako pośrednik w dostarczeniu do komponentu Link funkcji onClick będącej delegatem akcji SET_VISIBILITY_FILTER  bazującej na własnej właściwości filter           

```javascript
//FilterLink.js
import {connect} from 'react-redux';
import Link from "../components/Link";

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.visibilityFilter === ownProps.filter
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter: ownProps.filter
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);

```
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/16-todoapps-react-redux-connect-2/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/18-.../README.md)
 </sub>