import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import DetailsView from './pages/DetailsView/DetailsView';
import './App.css';
import {Product} from './shared/shareddtypes';


function App(): JSX.Element {
  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  let fakeProduct: Product;
  fakeProduct = {id:"14", name:"Fake Product", image:"https://i.pcmag.com/imagery/roundups/01l4AvaewFPRvEV3gAY8iO2-2..v1630352113.jpg" , description:"Description of fake product", price:100, amount: 0};

  const handleAddToCart = (clickedItem: Product) => {
    console.log('test');
};

  return (
    <>
      <Container maxWidth="sm">
        <Welcome message="ASW students"/>
        <Box component="div" sx={{ py: 2}}>This is a basic example of a React application using Typescript. You can add your email to the list filling the form below.</Box>
        <EmailForm OnUserListChange={refreshUserList}/>        
        <UserList users={users}/>
        <Link href="https://github.com/pglez82/asw2122_0">Source code</Link>
        <DetailsView item={fakeProduct} handleAddToCart={handleAddToCart}/>
      </Container>
    </>
  );
}

export default App;
