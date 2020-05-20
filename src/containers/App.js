import React, {Component} from "react";
import CardList from "../components/CardList";
import {robots} from "../robots"
import Scroll from "../components/Scroll";
import SearchBox from "../components/SearchBox"
import "./App.css";


class App extends Component {

    // Components that need a state must use class syntax.

    constructor() {
        //So that you can use a constructor, and create the state in the constructor.
        super();

        //The virtual DOM collects this state to render and pass it as props to the components below.
        this.state ={
            robots: [],
            searchfield: ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => this.setState({robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    render () {    

        const filteredRobots = this.state.robots.filter(robots => {
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        
        if (this.state.robots.length ===0) {
            return <h1>Loading</h1>;
        } else {

        return(
            <div className="tc">
                <h1 className="f1">Robofriend</h1>
                {/* For example, we passed onSearchChange as PROPS, but it's actually a method. */}
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                <CardList robots = {filteredRobots}/>
                </Scroll>
            </div>            
        )}}
}

export default App;