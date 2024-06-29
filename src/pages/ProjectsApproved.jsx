import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBarUsers from '../components/SideBarUsers';
import NavBarUsers from '../components/NavBarUsers';
import SearchInput from '../components/SearchInput';
import AlertToast from '../components/AlertToast';

function ProjectsApproved() {
  const userId = localStorage.getItem('id');
  const urlProjects = 'https://667e0138297972455f66dc2e.mockapi.io/projects';
  const studentName = localStorage.getItem('studentName');
  const [myProjects, setmyProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [searchInputValue, setsearchInputValue] = useState('');
  const [filteredProjects, setfilteredProjects] = useState([]);
  const [projectIdeaAlert, setprojectIdeaAlert] = useState(false);
  const [projectErrorField, setprojectErrorField] = useState('');
  const [projectIdeaInput, setprojectIdeaInput] = useState('');
  const [showNewProjectModal, setshowNewProjectModal] = useState(false);

  useEffect(() => {
    if (userId && studentName) {
      fetchData();
    } else {
      throw new Error('User ID not found');
    }
  }, [userId, approvedProjects]);

  function fetchData() {
    axios.get(urlProjects).then((response) => {
      setApprovedProjects(
        response.data.filter((item) => {
          return item.status === 'معتمد';
        })
      );
      const userProjects = response.data.filter(
        (item) => item.authorId === userId
      );
      setmyProjects(userProjects);

      setfilteredProjects(approvedProjects);
    });
  }

  function handleSearch() {
    let filtered = approvedProjects;
    if (searchInputValue !== '') {
      filtered = approvedProjects.filter((project) =>
        project.idea.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }
    setfilteredProjects(filtered);
  }

  function getStatusClass(status) {
    switch (status) {
      case 'قيد المراجعة':
        return 'text-yellow-500';
      case 'مرفوضة':
        return 'text-red-500';
      case 'معتمد':
        return 'text-green-500';
      default:
        return '';
    }
  }
  function handleNewProject() {
    let valid = true;
    if (projectIdeaInput.length < 5) {
      valid = false;
      setprojectErrorField('يجب ملأ الحقل ب 5 احرف على الأقل');
    } else {
      setprojectErrorField('');
      valid = true;
    }

    if (valid) {
      axios
        .post(urlProjects, {
          status: 'قيد المراجعة',
          author: localStorage.getItem('studentName'),
          comment: '',
          idea: projectIdeaInput,
          authorId: userId,
        })
        .then((response) => {
          console.log(response);
          setshowNewProjectModal(false);
          setprojectIdeaAlert(true);
          setTimeout(() => {
            setprojectIdeaAlert(false);
          }, 2000);
          setprojectIdeaInput('');
          fetchData();
        });
    }
  }
  return (
    <>
      <NavBarUsers
        onClickNewProject={() => {
          setshowNewProjectModal(true);
        }}
        name={studentName}
        rightTitle={'تسجيل خروج'}
      />
      {projectIdeaAlert && <AlertToast text={'تم إرسال الفكرة إلى المشرف'} />}
      <div className="h-screen">
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle"
          open={showNewProjectModal}
        >
          <div dir="rtl" className="modal-box">
            <h3 className="font-bold text-2xl text-primary">
              اضف فكرة جديدة للمشروع
            </h3>
            <div className="avatar flex-col justify-center items-center gap-5 max-md:max-w-screen w-full my-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">أكتب فكرة المشروع هنا</span>
                </div>
                <input
                  type="text"
                  placeholder="متجر إلكتروني لبيع الألعاب المستخدمة"
                  className="input input-bordered w-full max-w-xs"
                  value={projectIdeaInput}
                  onChange={(e) => {
                    setprojectIdeaInput(e.target.value);
                  }}
                />
                {<label className="text-red-500">{projectErrorField}</label>}
              </label>
            </div>
            <div className="modal-action">
              <div className="flex gap-5">
                <button
                  className="btn"
                  onClick={() => setshowNewProjectModal(false)}
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    handleNewProject();
                  }}
                  className="btn btn-primary"
                >
                  إرسال
                </button>
              </div>
            </div>
          </div>
        </dialog>
        <SideBarUsers
          onClickNewProject={() => {
            setshowNewProjectModal(true);
          }}
          projectsNumber={myProjects.length}
        />
        <div
          dir="rtl"
          className="text-right w-[80%] py-5 text-5xl text-secondary"
        >
          <span className="text-primary">المشاريع المعتمدة</span>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>
        <SearchInput
          placeholder={'ابحث عن مشروع ....'}
          value={searchInputValue}
          onChange={(e) => {
            setsearchInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          onClick={() => {
            handleSearch();
          }}
        />
        <div
          dir="rtl"
          className=" w-[80%] flex items-center max-md:w-[100%] my-5"
        >
          <div
            dir="rtl"
            className="w-[80%] max-md:w-[100%] overflow-x-auto max-h-screen max-md:max-h-[70vh] overflow-y-auto"
          >
            <table className=" border-collapse table ">
              <thead className="table-header-group">
                <tr className="border border-gray-300 table-row">
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    فكرة المشروع
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    التعليق{' '}
                  </th>
                  <th className="bg-primary p-2 text-white font-bold border border-gray-300 table-cell max-md:text-xs ">
                    الحالة
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
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {project.idea}
                        </td>
                        <td className="p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs">
                          {project.comment}
                        </td>
                        <td
                          className={`p-2 border text-primary-content border-gray-300 table-cell w-[33%] max-md:text-xs ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-2">
                      لا يوجد شخص بهذا الاسم
                    </td>
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

export default ProjectsApproved;
