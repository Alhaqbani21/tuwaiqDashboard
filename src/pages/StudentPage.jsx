import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import NavBarUsers from '../components/NavBarUsers';
import SideBarUsers from '../components/SideBarUsers';
import AlertToast from '../components/AlertToast';

function StudentPage() {
  const [userdata, setuserdata] = useState([]);
  const [projects, setProjects] = useState([]);
  const [myProjects, setmyProjects] = useState([]);
  const [myprojectsApproved, setmyprojectsApproved] = useState([]);
  const [projectsApproved, setprojectsApproved] = useState([]);
  const userId = localStorage.getItem('id');
  const studentName = localStorage.getItem('studentName');

  const urlUser = `https://667e0138297972455f66dc2e.mockapi.io/users/${userId}`;
  const urlProjects = `https://667e0138297972455f66dc2e.mockapi.io/projects`;
  const [showNewProjectModal, setshowNewProjectModal] = useState(false);
  const [projectIdeaInput, setprojectIdeaInput] = useState('');
  const [projectErrorField, setprojectErrorField] = useState('');
  const [projectIdeaAlert, setprojectIdeaAlert] = useState(false);

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
    axios.get(urlProjects).then((response) => {
      setProjects(response.data);

      setmyProjects(
        response.data.filter((item) => {
          return item.authorId === userId;
        })
      );
      setmyprojectsApproved(
        response.data.filter((item) => {
          return item.authorId === userId && item.status === 'معتمد';
        })
      );
      setprojectsApproved(
        response.data.filter((item) => {
          return item.status === 'معتمد';
        })
      );
    });
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
          setprojectIdeaInput('');
          fetchData();
          setTimeout(() => {
            setprojectIdeaAlert(false);
          }, 2000);
        });
    }
  }

  return (
    <>
      <NavBarUsers name={userdata.userName} rightTitle={'تسجيل خروج'} />
      {projectIdeaAlert && <AlertToast text={'تم إرسال الفكرة إلى المشرف'} />}
      <div className="h-full">
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
          projectsNumber={myProjects.length}
          onClickNewProject={() => {
            setshowNewProjectModal(true);
          }}
        />
        <div
          dir="rtl"
          className="text-right w-[80%] py-5 text-5xl text-secondary"
        >
          اهلا <span className="text-primary">{userdata.userName}</span>
        </div>
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>
        <div
          dir="rtl"
          className=" text-right w-[80%] py-5 text-3xl text-primary"
        >
          ملخص لأهم البيانات
        </div>
        <div className="pb-4 border-b-2 w-[85%] max-md:full  flex justify-evenly max-md:w-[100%] items-start gap-10 flex-wrap max-md:justify-center max-md:items-center">
          {/* <Card numberUsers={data.length} /> */}
          <Card
            text={'عدد المشاريع المعتمدة'}
            number={projectsApproved.length}
            bgColor={'bg-primary'}
            svg={
              <svg
                className="w-14"
                fill="white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 231.306 231.306"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                enableBackground="new 0 0 231.306 231.306"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    {' '}
                    <path d="M229.548,67.743L163.563,1.757C162.438,0.632,160.912,0,159.32,0H40.747C18.279,0,0,18.279,0,40.747v149.813 c0,22.468,18.279,40.747,40.747,40.747h149.813c22.468,0,40.747-18.279,40.747-40.747V71.985 C231.306,70.394,230.673,68.868,229.548,67.743z M164.32,19.485l47.5,47.5h-47.5V19.485z M190.559,219.306H40.747 C24.896,219.306,12,206.41,12,190.559V40.747C12,24.896,24.896,12,40.747,12H152.32v60.985c0,3.313,2.687,6,6,6h60.985v111.574 C219.306,206.41,206.41,219.306,190.559,219.306z"></path>{' '}
                    <path d="m103.826,52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097,3.231-21.964,9.098c-5.867,5.867-9.098,13.667-9.098,21.964 0,8.297 3.231,16.097 9.098,21.964l61.536,61.536c7.957,7.956 20.9,7.954 28.855,0 7.955-7.956 7.955-20.899 0-28.855l-60.928-60.926c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l60.927,60.927c3.276,3.276 3.276,8.608 0,11.884s-8.607,3.276-11.884,0l-61.536-61.535c-3.601-3.601-5.583-8.388-5.583-13.479 0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958,0l64.476,64.476c11.567,11.567 11.567,30.388 0,41.955-5.603,5.603-13.053,8.689-20.977,8.689s-15.374-3.086-20.977-8.689l-49.573-49.574c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l49.573,49.573c7.87,7.87 18.333,12.204 29.462,12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z"></path>{' '}
                  </g>{' '}
                </g>
              </svg>
            }
          />
          <Card
            text={'مشاريعي المعتمدة'}
            number={myprojectsApproved.length}
            bgColor={'bg-primary'}
            svg={
              <svg
                className="w-14"
                fill="white"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 231.306 231.306"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                enableBackground="new 0 0 231.306 231.306"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {' '}
                  <g>
                    {' '}
                    <path d="M229.548,67.743L163.563,1.757C162.438,0.632,160.912,0,159.32,0H40.747C18.279,0,0,18.279,0,40.747v149.813 c0,22.468,18.279,40.747,40.747,40.747h149.813c22.468,0,40.747-18.279,40.747-40.747V71.985 C231.306,70.394,230.673,68.868,229.548,67.743z M164.32,19.485l47.5,47.5h-47.5V19.485z M190.559,219.306H40.747 C24.896,219.306,12,206.41,12,190.559V40.747C12,24.896,24.896,12,40.747,12H152.32v60.985c0,3.313,2.687,6,6,6h60.985v111.574 C219.306,206.41,206.41,219.306,190.559,219.306z"></path>{' '}
                    <path d="m103.826,52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097,3.231-21.964,9.098c-5.867,5.867-9.098,13.667-9.098,21.964 0,8.297 3.231,16.097 9.098,21.964l61.536,61.536c7.957,7.956 20.9,7.954 28.855,0 7.955-7.956 7.955-20.899 0-28.855l-60.928-60.926c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l60.927,60.927c3.276,3.276 3.276,8.608 0,11.884s-8.607,3.276-11.884,0l-61.536-61.535c-3.601-3.601-5.583-8.388-5.583-13.479 0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958,0l64.476,64.476c11.567,11.567 11.567,30.388 0,41.955-5.603,5.603-13.053,8.689-20.977,8.689s-15.374-3.086-20.977-8.689l-49.573-49.574c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l49.573,49.573c7.87,7.87 18.333,12.204 29.462,12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z"></path>{' '}
                  </g>{' '}
                </g>
              </svg>
            }
          />
        </div>

        <div
          dir="rtl"
          className="text-right w-[80%] py-5 text-3xl  text-primary"
        >
          بعض الأفكار المعتمدة{' '}
        </div>

        <div className="pb-4 w-[85%] max-md:full  flex justify-evenly max-md:w-[100%] items-start gap-10 flex-wrap max-md:justify-center max-md:items-center">
          {projectsApproved.map((item, index) => {
            return index < 2 ? (
              <Card
                key={item.id}
                text={item.idea}
                bgColor={'bg-primary'}
                svg={
                  <svg
                    className="w-14 py-3"
                    fill="white"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 231.306 231.306"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    enableBackground="new 0 0 231.306 231.306"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <g>
                        {' '}
                        <path d="M229.548,67.743L163.563,1.757C162.438,0.632,160.912,0,159.32,0H40.747C18.279,0,0,18.279,0,40.747v149.813 c0,22.468,18.279,40.747,40.747,40.747h149.813c22.468,0,40.747-18.279,40.747-40.747V71.985 C231.306,70.394,230.673,68.868,229.548,67.743z M164.32,19.485l47.5,47.5h-47.5V19.485z M190.559,219.306H40.747 C24.896,219.306,12,206.41,12,190.559V40.747C12,24.896,24.896,12,40.747,12H152.32v60.985c0,3.313,2.687,6,6,6h60.985v111.574 C219.306,206.41,206.41,219.306,190.559,219.306z"></path>{' '}
                        <path d="m103.826,52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097,3.231-21.964,9.098c-5.867,5.867-9.098,13.667-9.098,21.964 0,8.297 3.231,16.097 9.098,21.964l61.536,61.536c7.957,7.956 20.9,7.954 28.855,0 7.955-7.956 7.955-20.899 0-28.855l-60.928-60.926c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l60.927,60.927c3.276,3.276 3.276,8.608 0,11.884s-8.607,3.276-11.884,0l-61.536-61.535c-3.601-3.601-5.583-8.388-5.583-13.479 0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958,0l64.476,64.476c11.567,11.567 11.567,30.388 0,41.955-5.603,5.603-13.053,8.689-20.977,8.689s-15.374-3.086-20.977-8.689l-49.573-49.574c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l49.573,49.573c7.87,7.87 18.333,12.204 29.462,12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z"></path>{' '}
                      </g>{' '}
                    </g>
                  </svg>
                }
              />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default StudentPage;
