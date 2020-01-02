## 13 Todos Aplikacja - Część 8 - Przekazywanie Redux Store w dół przez kontekst
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 8 aplikacji Todos - Obecnie przekazujemy Redux Store w dół przez właściwości props

```javascript
//TodoApp
return (
<div>
    <Container fluid>
        <Divider/>
        <Divider/>
        <Grid centered columns={2}>
            <Grid.Column>
                <FilterHeader {...this.props}/>
            </Grid.Column>
        </Grid>
    </Container>
</div>
);

//FilterLink
render() {
    const {store, filter, children} = this.props;

    return <Link
        active={filter === visibilityFilter}
        onClick={this.onFilterClick.bind(this, filter)}>

        {children}
    </Link>
};
```

Możemy go przenosić za pomocą kontekstu w tym celu tworzymy komponent Provider i w komponentach kontenerach (które używają store) zapewniamy
dostępność kontekstu za pomocą instrukcji contextTypes

```javascript
import {Component} from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
    getChildContext() {
        return {
            store: this.props.store
        }
    }
    render() {
        return this.props.children;
    };
}

Provider.childContextTypes = {
    store: PropTypes.object
};

export default Provider  
```

```javascript
//index.js
import Provider from './store/Provider';
import configureStore from './store/configureStore';

ReactDOM.render(
    <Provider store={configureStore()}>
        <TodoApp/>
    </Provider>,
    document.getElementById('root')
);
```


```javascript
//TodoApp

componentDidMount() {
        const {store} = this.context;
        //callback after action
        this.unsubscribe = store.subscribe(() => {
            //force render
            this.forceUpdate();
        });
    }

...

return (
    <div>
        <Container fluid>
            <Divider/>
            <Divider/>
            <Grid centered columns={2}>
                <Grid.Column>
                    <FilterHeader/>
                </Grid.Column>
                ...
            </Grid>
        </Container>
    </div>

TodoApp.contextTypes = {
    store: PropTypes.object
}

//FilterLink
render() {
    const {store} = this.context;
    const {visibilityFilter} = store.getState();
    };

FilterLink.contextTypes = {
    store: PropTypes.object
};
```


 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/12-todoapp-extracting-container-2/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/14-todoapps-use-react-redux-provider/README.md)
 </sub>