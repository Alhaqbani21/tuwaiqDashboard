import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';
import SearchInput from '../components/SearchInput';
import AlertToast from '../components/AlertToast';
import RadioButton from '../components/RadioButton';

function ManageProjects() {
  const userId = localStorage.getItem('id');
  const urlUsers = 'https://667e0138297972455f66dc2e.mockapi.io/users';
  const urlProjects = 'https://667e0138297972455f66dc2e.mockapi.io/projects';
  const adminName = localStorage.getItem('adminName');
  const [allusers, setallusers] = useState([]);
  const [data, setdata] = useState([]);
  const [searchInputValue, setsearchInputValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showAlertModal, setshowAlertModal] = useState(false);
  const [projectToEdit, setprojectToEdit] = useState({});
  const [deleteAlert, setdeleteAlert] = useState(false);
  const [editAlert, seteditalert] = useState(false);
  const [dataProjects, setdataProjects] = useState([]);
  const [statusRadio, setStatusRadio] = useState('');

  useEffect(() => {
    if (userId && adminName) {
      fetchData();
      fetchProjects();
    } else {
      throw new Error('User ID or Admin Name is missing');
    }
  }, [userId, adminName, dataProjects]);

  function fetchData() {
    axios.get(urlUsers).then((response) => {
      setdata(response.data);
      const students = response.data.filter((user) => user.role === 'student');
      setallusers(students);
      setFilteredUsers(students);
    });
  }

  function fetchProjects() {
    axios.get(urlProjects).then((response) => {
      setdataProjects(response.data);
      setFilteredProjects(response.data);
    });
  }

  function handleSearch() {
    let filtered = dataProjects;

    if (searchInputValue !== '') {
      filtered = dataProjects.filter((project) =>
        project.author.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }

  function handleDeleteAccount(id) {
    const projectToDelete = filteredProjects.find(
      (project) => project.id === id
    );

    axios.delete(`${urlProjects}/${id}`).then((response) => {
      console.log(response.data);
      setshowAlertModal(false);
      setdeleteAlert(true);
      setFilteredProjects(
        filteredProjects.filter((project) => project.id !== id)
      );
      setTimeout(() => {
        setdeleteAlert(false);
      }, 2000);
    });
  }

  function handleEditProject() {
    axios
      .put(`${urlProjects}/${projectToEdit.id}`, {
        idea: projectToEdit.idea,
        comment: projectToEdit.comment,
        status: projectToEdit.status,
      })
      .then((response) => {
        console.log(response.data);
        setshowAlertModal(false);
        seteditalert(true);
        setFilteredProjects(
          filteredProjects.map((project) =>
            project.id === projectToEdit.id ? response.data : project
          )
        );
        setTimeout(() => {
          seteditalert(false);
        }, 2000);
      });
  }
  function getStatusClass(status) {
    switch (status) {
      case 'قيد المراجعة':
        return 'text-yellow-900';
      case 'مرفوضة':
        return 'text-red-500';
      case 'معتمد':
        return 'text-green-500';
      default:
        return '';
    }
  }

  return (
    <>
      <NavBar name={adminName} rightTitle={'تسجيل خروج'} />
      {deleteAlert && <AlertToast text={'تم حذف المشروع بنجاح'} />}
      {editAlert && <AlertToast text={'تم تعديل المشروع بنجاح'} />}
      <dialog
        dir="rtl"
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        open={showAlertModal}
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-secondary">إدارة المشروع </h3>
          <div className="avatar  flex-col justify-center items-center  max-md:max-w-screen w-full my-3">
            <label className="form-control w-full gap-5">
              <div className="label">
                <span dir="rtl" className="label-text text-2xl">
                  هل تريد تعديل الفكرة
                </span>
              </div>
              <label dir="rtl" className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-base">الفكرة</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={projectToEdit.idea || ''}
                  onChange={(e) =>
                    setprojectToEdit({ ...projectToEdit, idea: e.target.value })
                  }
                />
                <div className="label">
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </div>
              </label>
              <label dir="rtl" className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-base">تعليق</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={projectToEdit.comment || ''}
                  onChange={(e) =>
                    setprojectToEdit({
                      ...projectToEdit,
                      comment: e.target.value,
                    })
                  }
                />
                <div className="label">
                  {/* <span className="label-text-alt">Bottom Right label</span> */}
                </div>
              </label>
              <div className="text-primary">
                {' '}
                صاحب الفكرة : {projectToEdit.author}{' '}
              </div>
              <RadioButton
                value1="قيد المراجعة"
                value2="معتمد"
                value3="مرفوضة"
                name="تعديل الحالة "
                onChange={(e) => {
                  setprojectToEdit({ ...projectToEdit, status: e });
                  setStatusRadio(e);
                }}
                value={projectToEdit.status}
                error={setStatusRadio}
              />
            </label>
          </div>
          <div className="modal-action">
            <div className="flex gap-5">
              <button className="btn" onClick={() => setshowAlertModal(false)}>
                الغاء
              </button>
              <button
                onClick={() => {
                  handleDeleteAccount(projectToEdit.id);
                }}
                className="btn btn-outline bg-orange-500 px-2 py-1 hover:bg-orange-400 hover:text-black"
              >
                حذف
              </button>
              <button
                onClick={() => {
                  handleEditProject(projectToEdit.id);
                }}
                className="btn btn-outline bg-orange-200 px-2 py-1 hover:bg-orange-100 hover:text-black"
              >
                تعديل
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="h-screen">
        <SideBar projectsNumber={dataProjects.length} />
        <div
          dir="rtl"
          className="text-right w-[80%] py-5 text-5xl text-secondary"
        >
          <span className="text-primary">افكار المشاريع</span>
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
                    الطالب
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    فكرة المشروع
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    التعليق
                  </th>

                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    الحالة
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    اجراء
                  </th>
                </tr>
              </thead>
              <tbody className="table-row-group max-h-[50vh] overflow-auto">
                {filteredProjects.length > 0 ? (
                  <>
                    {filteredProjects.map((project, index) => (
                      <tr
                        key={index}
                        className={`border border-gray-300 table-row  ${
                          index % 2 === 0 ? 'bg-white' : 'bg-[#009dff86]'
                        }`}
                      >
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[20%] max-md:text-xs">
                          {project.author}
                        </td>
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {project.idea}
                        </td>
                        <td
                          className={`p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs ${getStatusClass(
                            project.comment
                          )}`}
                        >
                          {project.comment}
                        </td>
                        <td
                          className={`p-2 border text-primary-content border-gray-300 table-cell  w-[20%] max-md:text-xs ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </td>
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-max max-md:text-xs">
                          <button
                            onClick={() => {
                              setshowAlertModal(true);
                              setprojectToEdit(project);
                            }}
                            className="btn btn-outline bg-orange-200 px-2 py-1 hover:bg-orange-100 hover:text-black"
                          >
                            تعديل
                          </button>
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

export default ManageProjects;
