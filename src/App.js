import logo from './logo.svg';
import './App.css';
import { TextField,Paper } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { getDatabase, ref, set,onValue } from "firebase/database";
import firebaseConfig from './fireconfig';
import { initializeApp } from "firebase/app";

 initializeApp(firebaseConfig);

function App() {
  const [city,setcity]=useState('')
  const [dat,setdat]=useState([])
  const [cityn,setcityn]=useState('')
  const [temp,settemp]=useState('')
  const [oldtemp,setoldtemp]=useState('')
  const [check,setcheck]=useState('')
  
  function cha(e){
    console.log(e.target.value)
    setcity(e.target.value)
  }
  async function sub(e){
    e.preventDefault();
    console.log(city)
    const db = getDatabase();
    const data=await axios.get(`http://api.weatherstack.com/current?access_key=b72fdcea18dd859c468f4396bc7a5cfa&query=${city}`)
    
    //if()
    console.log(data,'ff')
    setdat(data)
    setcityn(data.data.location.name)
   settemp(data.data.current.temperature)
    
   
    set(ref(db, cityn ), {
      // username: name,
      // email: email,
      // profile_picture : imageUrl
      cityname:cityn,
      weather:data.data.current,
      date:new Date().getDate() 
      
    });
    const starCountRef = ref(db, cityn );
    onValue(starCountRef, (snapshot) => {
      const da = snapshot.val();
      setoldtemp(da.weather.temperature)
    });
    if(oldtemp>temp){
      setcheck('low')
    }else if(oldtemp<temp){
      setcheck('high')
    }else if(oldtemp==temp){
      setcheck('')
    }
  }
  const dates=new Date().getDate() 
 
  return (
    <div className="App">
      <h1>weather app</h1>
    <form onSubmit={sub}>
     <TextField id="city" label="city" variant="outlined"
     onChange={cha} 
     
     />
     </form>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <Paper elevation={3}  variant="outlined" square>
       <h4>{cityn}</h4>
       <h4>{temp}</h4>
       <h4>{dates}</h4>
       <h4>{check}</h4>
     </Paper>
    </div>
  );
}

export default App;
