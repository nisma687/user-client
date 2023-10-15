import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))

  }, [])
 
const handleAddUser = (e) =>{
  e.preventDefault();
  const form= event.target;
  const name=form.name.value;
  const email=form.email.value;
 
  const newUser={name,email};
  
  setUsers(newUser);
  fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify(newUser)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    const newUser=[...users,data];
    setUsers(newUser);
    form.reset();
  })

}



  return (
    <>

      <h1>User Management System</h1>
      <h3>Numbers of user :{users.length}</h3>
      {/* sending user data to bakend */}

      <form onSubmit={handleAddUser}>
        <input type="text"  name="name" id=""/>
        <br/>
        <input type="email" name="email" id=""/>
        <br />
        <input type="submit" value="Submit"/>
      </form>
      
      
      
      <div>
        {
          users.map(user=><p key={user.id}>
            {user.name} : {user.email} :
            {user.id} 
          </p>)
        }
      </div>
     
    </>
  )
}

export default App
