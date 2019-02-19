import { Button, FormGroup, FormControl } from "react-bootstrap";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from 'react-router-dom';
import './login.css';
import io from 'socket.io-client'
 
import './index.css';


 


class Login extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      email: "",
      password: "",
      authenticated: false,
      msg: ""
    };
   
  }
 

  
 validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit1 = event => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
      authenticated: false
      
    });
    console.log('logged out');
  }

  
  handleSubmit = event => {
    event.preventDefault();
    this.setState({authenticated : true});
    var socket = io.connect('localhost:9489');
    
    
    socket.emit('event', {
      user: this.state.email,
  password: this.state.password
  })
  }
    /* var data = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(data)
    fetch("localhost:5014/", {
      method : 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    }).then(function(response){
      if (response.status >= 400){
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function(data){
      console.log(data)
      if(data==="success"){
        this.setState({msg: "Thanks for registering with us"})
      }
    }).catch(function(err){
      console.log(data.email)
      console.log(err)
    }); */
  
    /* this.setState({
      authenticated:true
      }); */
     
      
      
  
  
  
  
  
         render() {
     
          return (
   
<div>{!this.state.authenticated?
      <div className="Login">
         
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bssize="large">
            <label>Email</label><br /><br />
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bssize="large"><br /><br />
            <label>Password</label><br /><br />
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password" /><br /><br />
          </FormGroup>
          <Button
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit" >Login</Button>

        </form>
  
      </div>: <div><Button
            block
            bssize="large"
            type="submit"
            onClick = {this.handleSubmit1}>Logout</Button>  <Fetch /> <Game /> </div>}
      </div>
    
    
    );
    
  }
}


class Fetch extends Component{
 constructor(props){
  super(props);
  this.state = {
   data: [],
history1: [
  {
    squares1: Array(9).fill(null)
  }
],
 };}
/* componentDidMount(){
  fetch('localhost:5014/game')
  .then(response => response.json())
  .then(data => this.setState({data}));
   console.log('data received successfully' +this.state.data)
} */

  handlefetch = event => {
    event.preventDefault();
    
  
    
  }
  
  render(){
return(
<button onClick = {this.handlefetch} >Fetch</button>
);
  }
}






class Board extends Component {
  renderSquare(i) {                            //for rendering buttons
    return (
      
     
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
       

    );
    //for single button
    function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    }



  }

  render() {
    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

//changing placeholder values
class Game extends Component {
  constructor(props) {
    super(props);


    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
     
      stepNumber: 0,
      xIsNext: true,
      count: 0,
      game_id: 0,
      game_status: ''
    };
  } 
 /*  componentDidMount(){
      fetch('http://localhost:5014/')
      .then(res=> res.json()
      .then(game_status_ => this.setState({game_status: game_status_}, () => console.log("Successfully fetched ", game_status_)))
      )

  } */
/*   Router.get('/users', function(req,res,next){
    res.locals.con.query('SELECT * from user', function(errors, results, fields){
      if(error) throw error;
      res.send(JSON.stringify(results));
    });
  });
 */
  //calculating winner
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
   
    if (!this.state.stepNumber) {
      this.setState({ game_id: this.state.game_id + 1 });
    }


    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares

        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }


  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const ab = current.squares.slice();
    const moves = history.map((step, move) => {
     

      const desc = move ?
        'Go to move #' + move :
        'Go to game start' + this.state.game_id;

        
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
         
        </li>

      );
    });

    let status;
    

    if (winner) {
      status = "Congratulations Winner: " + winner;
    }



    else {
      if (this.state.stepNumber === 9) {
        status = "Game draw";
      }
      else {
  
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
    }

    return (

      <div className="login">
      
      
     
       
     
      
     
      <div className="game"></div>
            <div className="game-board">
         
        <Board

            squares={current.squares}
            onClick={i => this.handleClick(i)}         //handle clicks on board

          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <ol>{ab}</ol>
         
        </div>
      </div>
      
    );
  }
}

 
 


/* ReactDOM.render(<Game/>, document.getElementById('root')); */

ReactDOM.render((
  <BrowserRouter>
     <div>     <Route path = "/" component = {Login} />
        
        <Route path = "/game" component = {Login} />
       
        </div>

     </BrowserRouter>

), document.getElementById('root'))