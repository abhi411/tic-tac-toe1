const express = require('express');
var cors = require('cors');
const mysql = require('mysql');
const http = require('http');
const bodyParser = require('body-parser');



var socket = require('socket.io');
var app = express();
app.use(cors());



server = app.listen(9489, function(){
    console.log('server is running on port ' +server.address().port)
});

io = socket(server);

io.on('connection', (socket) => {
   
  console.log(socket.id);
  console.log('A user is connected');

     socket.on('event', function(data){
    
      //  io.on(RECEIVE_MESSAGE, data)
      const config = {
        client: 'mysql',
         connection:{
         
         host: 'localhost',
         user: 'root',
         password: 'abhishekj@123',
         database: 'tictactoe'
       }}
      
       const knex = require('knex')(config);
      
      
      knex.from('user').where({ user_id: data.user }).select('password').then(function(result) {
        if (!result || !result[0])  {  // not found!
          console.log("User not found")          
          knex('user').insert({user_id: data.user, password: data.password}).then(()=>console.log("data inserted"))
          .catch((err) => { console.log(err); throw err })
          .finally(()=>{
            knex.destroy("a1b");
          });
          return;
        }
        var pass = result[0].password;
        console.log("database password "+pass)
        console.log("send password " +data.password)
        if (data.password == pass) {
          console.log("login successfull")
        return;
        } else {
          console.log("Failed login")
          return;
        }
      })
        .catch(function(error) {
        console.log(error);
      })
      .finally(()=>{
        console.log("ab")
        knex.destroy();
      });
      
      
    
    
  
  })
  
   
});




 
app.use(function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
})


/* var headers = new Headers(); */

/* headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

 

return this.http.post('/', '', {

       headers: headers

}).map(res => {

       console.log(res);

}); 
 */

/* 
var server = http.createServer(app); */

/* const CHECK_USER = 'SELECT user_id from user where user_id = "abhi@gmail.com"'; */
const CHECK_USER = 'SELECT * from tictac';
const valid_user = "INSERT INTO user (username, password) VALUES('data.email', 'data.password')";
const valid_pass = 'SELECT password from user where password = data.password';



 

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

/*app.get('/game', (req,res)=>{
con.connect(err=>{
    if(err) throw err;
    console.log(con);
 con.query(CHECK_USER, (err,rows,fields)=>{
   if (err) throw err;
   res.send(JSON.stringify(rows));
    res.end();
 });
})}); 


 app.post('/', (req, res) => {
con.connect(err => {
  if(err) throw err;
  const ab = con.query(valid_user, (err, rows, fields) => {
    if(err) throw err;
    res.send(ab);
    console.log(data.password);
  })
}); 


});
  */
// var listener = app.listen(5014, ()=>console.log("Server is running on port " + listener.address().port)); 