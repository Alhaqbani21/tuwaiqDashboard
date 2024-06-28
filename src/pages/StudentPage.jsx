import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

function StudentPage() {
  const [userdata, setuserdata] = useState([]);
  const userId = localStorage.getItem('id');
  const urlUser = `https://667e0138297972455f66dc2e.mockapi.io/users/${userId}`;
  const navigate = useNavigate();

  if (userId) {
    useEffect(() => {
      fetchData();
    }, [userId]);
  } else {
    throw Error;
  }
  function fetchData() {
    axios.get(urlUser).then((response) => {
      if (response.data.role === 'student') {
        setuserdata(response.data);
        localStorage.setItem('studentName', response.data.userName);
      } else {
        navigate('../');
      }
    });
  }

  return <div>StudentPage</div>;
}

export default StudentPage;
