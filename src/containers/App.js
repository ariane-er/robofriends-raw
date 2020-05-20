import React, {Component} from "react";
import { connect } from 'react-redux';
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary"
import SearchBox from "../components/SearchBox"
import "./App.css";
import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    // Components that need a state must use class syntax.

    constructor() {
        //So that you can use a constructor, and create the state in the constructor.
        super();

        //The virtual DOM collects this state to render and pass it as props to the components below.
        this.state ={
            robots: []
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }


    render () {    

        const { searchField, onSearchChange } = this.props;

        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        });

        
        
        if (this.state.robots.length ===0) {
            return <h1>Loading</h1>;
        } else {

        return(
            <div className="tc">
                <h1 className="f1">Robofriend</h1>
                {/* For example, we passed onSearchChange as PROPS, but it's actually a method. */}
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                <ErrorBoundary>
                <CardList robots = {filteredRobots}/>
                </ErrorBoundary>
                </Scroll>
            </div>            
        )}}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);