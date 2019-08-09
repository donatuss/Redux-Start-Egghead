## 11 Todos Aplikacja - Część 6 -  Wyodrębnienie komponentów kontenerów 
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Część 6 aplikacji Todos - wyodrębnienie komponentu kontenera (FilterLink). 
W obecnej sytuacji komponent prezentacyjny FilterLink potrzebuje właściwości currentFilter, onClick - które dostarczane są z komponentu TodoApp, 
pośredniczy w tym komponent FilterHeader któremu te informacje nie są potrzebne. Wyeliminujemy to zachowanie. 
Komponent FilterLink stanie się komponentem kontenerem zawierającym nowy komponent prezentacyjny Link. A FilterHeader nie będzie juz pośrednikiem 
w dostarczaniu właściwości których sam nie wykorzystuje.  

Przez zmianami
```javascript
// TodoApp:
<Grid centered columns={2}>
    <Grid.Column>
        <FilterHeader visibilityFilter={visibilityFilter} onFilterClick={this.onFilterClick}/>
    </Grid.Column>
</Grid>


//FilterHeader:
const {visibilityFilter, onFilterClick} = this.props;

return (
    <div>
        <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>
        <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
        <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Competed</FilterLink>
    </div>
);


//FilterLink
const {filter, currentFilter, onClick} = this.props;

if (filter === currentFilter) {
    return <Button active size="small"><Icon name='checkmark'/>{this.props.children}<Icon/></Button>
}

return (
    <a href='#?' onClick={e => {
        e.preventDefault();
        onClick(filter)
    }}>
        <Button size="small"><Icon/>{this.props.children}<Icon/></Button>
    </a>
)
````

Po zmianach:
```javascript
// TodoApp:
<Grid centered columns={2}>
    <Grid.Column>
        <FilterHeader {...this.props}/>
    </Grid.Column>
</Grid>


//FilterHeader:
return (
    <div>
        <FilterLink {...this.props} filter='SHOW_ALL'>All</FilterLink>
        <span style={{width: '5px', display: 'inline-block'}}/>
        <FilterLink {...this.props} filter='SHOW_ACTIVE'>Active</FilterLink>
        <span style={{width: '5px', display: 'inline-block'}}/>
        <FilterLink {...this.props} filter='SHOW_COMPLETED'>Competed</FilterLink>
    </div>
);


//Link
class Link extends Component {

    render() {
        const {children, active, onClick} = this.props;

        if (active) {
            return <Button active size="small"><Icon name='checkmark'/>{children}<Icon/></Button>
        }

        return (
            <a href='#?' onClick={e => {
                e.preventDefault();
                onClick()
            }}>
                <Button size="small"><Icon/>{children}<Icon/></Button>
            </a>
        )
    };
}

//containers/FilterLink
class FilterLink extends Component {
    onFilterClick = (filter) => {
        const {store} = this.props;

        console.log("BEFORE", store.getState());
        store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
        });
        console.log("AFTER", store.getState());
    };

    render() {
        const {store, filter, children} = this.props;
        const {visibilityFilter} = store.getState();

        return <Link
            active={filter === visibilityFilter}
            onClick={this.onFilterClick.bind(this, filter)}>

            {children}
        </Link>
    };
}

export default FilterLink;
````
 <br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/10-todoapp-extracting-presentional-2/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/12-.../README.md)
 </sub>