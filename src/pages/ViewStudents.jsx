import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import SearchInput from '../components/SearchInput';

function ViewStudents() {
  const userId = localStorage.getItem('id');
  const urlUsers = 'https://667e0138297972455f66dc2e.mockapi.io/users';
  const adminName = localStorage.getItem('adminName');
  const urlProjects = 'https://667e0138297972455f66dc2e.mockapi.io/projects';
  const [allusers, setallusers] = useState([]);
  const [data, setdata] = useState([]);
  const [searchInputValue, setsearchInputValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dataProjects, setdataProjects] = useState([]);

  if (userId && adminName) {
    useEffect(() => {
      fetchData();
    }, [userId]);
  } else {
    throw Error;
  }

  function fetchData() {
    axios.get(urlUsers).then((response) => {
      setdata(response.data);
      const students = response.data.filter((user) => user.role === 'student');
      setallusers(students);
      setFilteredUsers(students);
    });
    axios.get(urlProjects).then((response) => setdataProjects(response.data));
  }
  function handleSearch() {
    let filtered = allusers;

    if (searchInputValue !== '') {
      filtered = allusers.filter((user) =>
        user.userName.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }

  return (
    <>
      <NavBar name={adminName} rightTitle={'تسجيل خروج'} />
      <div className="h-screen">
        <SideBar projectsNumber={dataProjects.length} />

        <div
          dir="rtl"
          className="text-right w-[80%] py-5 text-5xl text-secondary"
        >
          <span className="text-primary">بيانات جميع الطلاب</span>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>
        <SearchInput
          value={searchInputValue}
          placeholder={'ابحث عن طالب'}
          onChange={(e) => {
            setsearchInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === 'Enter' ? handleSearch() : null;
          }}
          onClick={() => {
            handleSearch();
          }}
        />
        <div
          dir="rtl"
          className=" w-[80%] flex items-center max-md:w-[100%] my-5"
        >
          <div dir="rtl" className="w-[80%] max-md:w-[100%] overflow-x-auto">
            <table className=" border-collapse table ">
              <thead className="table-header-group">
                <tr className="border border-gray-300 table-row">
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    الاسم
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    البريد الإلكتروني
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    الدور
                  </th>
                </tr>
              </thead>
              <tbody className="table-row-group max-h-[50vh] overflow-auto">
                {filteredUsers.length > 0 ? (
                  <>
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={index}
                        className={`border border-gray-300 table-row  ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#009dff86]'
                        }`}
                      >
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {user.userName}
                        </td>
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {user.email}
                        </td>
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {user.role}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td>لا يوجد شخص بهذا الاسم</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewStudents;
