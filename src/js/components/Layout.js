import { connect } from "react-redux"
import { fetchUser } from "../actions/userActions"
import { fetchTweets } from "../actions/tweetsActions"
import React from 'react'


@connect((store) => {
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets,
  };
})


export class TodoItems extends React.Component{
  render() {
          function createList(item) {
              let list = () => {
                  return <li key = {
                      item.key
                  } > {
                      item.text
                  } < /li>
              };
              return list();
          }

          let todoEntries = this.props.entries;
          let listItems = todoEntries.map(createList);
          return ( 
            <ol className = "theList" > {listItems}</ol>
          );
      }
}

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [],
        value: '',
    }
    this.store = this.store.bind(this);
    this.addItem = this.addItem.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
    // this.fetchTweets = this.fetchTweets.bind(this);
  }
  store(e) {
    this.setState({
        value: e.target.value
    });
  }
  addItem(e) {
      let arr = this.state.items;

      arr.push({
              text: this.state.value,
              key: Date.now()
          }

      );
      console.log(arr);
      this.setState({
          items: arr
      });
      
      this.state.value = "";
      e.preventDefault();
  }

  componentWillMount() {
    this.props.dispatch(fetchUser(this.state.items))
  }

  render() {
    return (
      <div className = "todoListMain" >
        <div className = "header" >
          <form >
            <input placeholder = "enter task" onChange = {this.store}></input> 
              <button onClick = {this.addItem} > add < /button>
          </form>
        </div> 
        <TodoItems entries = {this.state.items}/> 
      </div>
    );
  }
}
