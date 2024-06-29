import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBarUsers(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      dir="rtl"
      className="navbar bg-base-200 text-base-content h-24 max-md:h-auto max-md:flex-col max-md:items-start"
    >
      <div className="flex-1 max-md:w-full max-md:flex max-md:justify-between">
        <ul className="menu flex justify-center items-center">
          <li>
            <Link className=" flex justify-center items-center">
              <img className="w-10" src={logo} alt="Logo" />
              <p className="text-2xl ">إدارة المشاريع</p>
            </Link>
          </li>
        </ul>
        <button
          className="max-md:block md:hidden px-2 py-1 text-xl"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>

      <div
        className={`flex-none max-md:w-full max-md:mt-2 ${
          menuOpen ? 'max-md:block' : 'max-md:hidden'
        }`}
      >
        <ul className="menu menu-horizontal px-1 text-xl max-md:flex max-md:flex-col max-md:items-start gap-5">
          {localStorage.getItem('id') ? (
            <>
              <div className="flex items-center max-md:flex-row-reverse gap-2">
                <p className="font-semibold text-sm text-primary">
                  {props.name}
                </p>
                <img
                  src="https://cdn.vectorstock.com/i/500p/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg"
                  className="object-cover h-9 w-9 rounded-full mr-2 bg-gray-300"
                  alt=""
                />
              </div>
              <li className="max-md:w-full max-md:mb-2 md:hidden">
                <Link to={'../student'}>
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
                              1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                  <span className=" text-base">الصفحة الرئيسة</span>
                </Link>
              </li>
              <li className="max-md:w-full max-md:mb-2 md:hidden">
                <Link to={'../student/projects'}>
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    fill="black"
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
                  <span className=" text-base">مشاريعي</span>
                </Link>
              </li>
              <li className="max-md:w-full max-md:mb-2 md:hidden">
                <Link to={'../student/ProjectsApproved'}>
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
                        stroke="#000000"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{' '}
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#000000"
                        strokeWidth="2"
                      ></circle>{' '}
                    </g>
                  </svg>
                  <span className=" text-base">المشاريع المعتمدة</span>
                </Link>
              </li>
              <li className="max-md:w-full max-md:mb-2 md:hidden">
                <Link onClick={props.onClickNewProject}>
                  <svg
                    className="flex-shrink-0 w-5 h-5 mr-4"
                    fill="#000000"
                    viewBox="0 0 1920 1920"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="m773.596 1069.654 711.086 711.085c39.632 39.632 104.336 39.632 144.078 0l138.276-138.385c19.268-19.269 29.888-44.778 29.888-71.93 0-27.26-10.62-52.77-29.888-72.039l-698.714-698.714 11.495-32.625c63.5-178.675 18.284-380.45-115.284-514.018-123.715-123.605-305.126-171.01-471.648-128.313l272.281 272.282c32.516 32.406 50.362 75.652 50.362 121.744 0 45.982-17.846 89.227-50.362 121.744L654.48 751.17c-67.222 67.003-176.375 67.003-243.488 0L138.711 478.889c-42.589 166.522 4.707 347.934 128.313 471.648 123.714 123.715 306.22 172.325 476.027 127.218l30.545-8.101ZM1556.611 1920c-54.084 0-108.168-20.692-149.333-61.857L740.095 1190.96c-198.162 41.712-406.725-19.269-550.475-163.019C14.449 852.771-35.256 582.788 65.796 356.27l32.406-72.696 390.194 390.193c24.414 24.305 64.266 24.305 88.68 0l110.687-110.686c11.824-11.934 18.283-27.59 18.283-44.34 0-16.751-6.46-32.516-18.283-44.34L297.569 84.207 370.265 51.8C596.893-49.252 866.875.453 1041.937 175.515c155.026 155.136 212.833 385.157 151.851 594.815l650.651 650.651c39.961 39.852 61.967 92.95 61.967 149.443 0 56.383-22.006 109.482-61.967 149.334l-138.275 138.385c-41.275 41.165-95.36 61.857-149.553 61.857Z"
                        fillRule="evenodd"
                      ></path>{' '}
                    </g>
                  </svg>
                  <span className=" text-base">طلب مشروع</span>
                </Link>
              </li>
              <li className="max-md:w-full max-md:mb-2 md:hidden">
                <Link
                  onClick={() => {
                    localStorage.clear();
                  }}
                  to={'../'}
                >
                  <>
                    <svg
                      className="flex-shrink-0 w-5 h-5 mr-4"
                      viewBox="0 0 24 24"
                      fill="#000000"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <path
                          d="M5.46967 12.5303C5.17678 12.2374 5.17678 11.7626 5.46967 11.4697L7.46967 9.46967C7.76257 9.17678 8.23744 9.17678 8.53033 9.46967C8.82323 9.76256 8.82323 10.2374 8.53033 10.5303L7.81066 11.25L15 11.25C15.4142 11.25 15.75 11.5858 15.75 12C15.75 12.4142 15.4142 12.75 15 12.75L7.81066 12.75L8.53033 13.4697C8.82323 13.7626 8.82323 14.2374 8.53033 14.5303C8.23744 14.8232 7.76257 14.8232 7.46967 14.5303L5.46967 12.5303Z"
                          fill="#1C274C"
                        ></path>{' '}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.9453 1.25H15.0551C16.4227 1.24998 17.525 1.24996 18.392 1.36652C19.2921 1.48754 20.05 1.74643 20.6519 2.34835C21.2538 2.95027 21.5127 3.70814 21.6337 4.60825C21.7503 5.47522 21.7502 6.57754 21.7502 7.94513V16.0549C21.7502 17.4225 21.7503 18.5248 21.6337 19.3918C21.5127 20.2919 21.2538 21.0497 20.6519 21.6517C20.05 22.2536 19.2921 22.5125 18.392 22.6335C17.525 22.75 16.4227 22.75 15.0551 22.75H13.9453C12.5778 22.75 11.4754 22.75 10.6085 22.6335C9.70836 22.5125 8.95048 22.2536 8.34857 21.6517C7.94963 21.2527 7.70068 20.7844 7.54305 20.2498C6.59168 20.2486 5.79906 20.2381 5.15689 20.1518C4.39294 20.0491 3.7306 19.8268 3.20191 19.2981C2.67321 18.7694 2.45093 18.1071 2.34822 17.3431C2.24996 16.6123 2.24998 15.6865 2.25 14.5537V9.44631C2.24998 8.31349 2.24996 7.38774 2.34822 6.65689C2.45093 5.89294 2.67321 5.2306 3.20191 4.7019C3.7306 4.17321 4.39294 3.95093 5.15689 3.84822C5.79906 3.76188 6.59168 3.75142 7.54305 3.75017C7.70068 3.21562 7.94963 2.74729 8.34857 2.34835C8.95048 1.74643 9.70836 1.48754 10.6085 1.36652C11.4754 1.24996 12.5778 1.24998 13.9453 1.25ZM7.25197 17.0042C7.25555 17.6487 7.2662 18.2293 7.30285 18.7491C6.46836 18.7459 5.848 18.7312 5.35676 18.6652C4.75914 18.5848 4.46611 18.441 4.26257 18.2374C4.05903 18.0339 3.91519 17.7409 3.83484 17.1432C3.7516 16.5241 3.75 15.6997 3.75 14.5V9.5C3.75 8.30029 3.7516 7.47595 3.83484 6.85676C3.91519 6.25914 4.05903 5.9661 4.26257 5.76256C4.46611 5.55902 4.75914 5.41519 5.35676 5.33484C5.848 5.2688 6.46836 5.25415 7.30285 5.25091C7.2662 5.77073 7.25555 6.35129 7.25197 6.99583C7.24966 7.41003 7.58357 7.74768 7.99778 7.74999C8.41199 7.7523 8.74964 7.41838 8.75194 7.00418C8.75803 5.91068 8.78643 5.1356 8.89448 4.54735C8.9986 3.98054 9.16577 3.65246 9.40923 3.40901C9.68599 3.13225 10.0746 2.9518 10.8083 2.85315C11.5637 2.75159 12.5648 2.75 14.0002 2.75H15.0002C16.4356 2.75 17.4367 2.75159 18.1921 2.85315C18.9259 2.9518 19.3144 3.13225 19.5912 3.40901C19.868 3.68577 20.0484 4.07435 20.1471 4.80812C20.2486 5.56347 20.2502 6.56459 20.2502 8V16C20.2502 17.4354 20.2486 18.4365 20.1471 19.1919C20.0484 19.9257 19.868 20.3142 19.5912 20.591C19.3144 20.8678 18.9259 21.0482 18.1921 21.1469C17.4367 21.2484 16.4356 21.25 15.0002 21.25H14.0002C12.5648 21.25 11.5637 21.2484 10.8083 21.1469C10.0746 21.0482 9.68599 20.8678 9.40923 20.591C9.16577 20.3475 8.9986 20.0195 8.89448 19.4527C8.78643 18.8644 8.75803 18.0893 8.75194 16.9958C8.74964 16.5816 8.41199 16.2477 7.99778 16.25C7.58357 16.2523 7.24966 16.59 7.25197 17.0042Z"
                          fill="#1C274C"
                        ></path>{' '}
                      </g>
                    </svg>
                    <span className=" text-base">تسجيل خروج</span>
                  </>
                </Link>
              </li>

              {props.img && (
                <li
                  onClick={props.onClickAvatar}
                  className="max-md:w-full max-md:flex-col flex flex-row"
                >
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={props.img} alt="Avatar" />
                    </div>
                    {props.name}
                  </div>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="max-md:w-full max-md:mb-2">
                <Link to="/Login">Login</Link>
              </li>
              <li className="max-md:w-full max-md:mb-2">
                <Link to="/SignUp">Sign Up</Link>
              </li>
            </>
          )}

          <li className="max-md:w-full max-md:flex-col flex flex-row">
            {props.endDelete && (
              <Link
                className=""
                onClick={() => {
                  props.endDelete === 'Delete Account'
                    ? props.onClickDelete()
                    : 0;
                }}
                // to={'../'}
              >
                {props.endDelete === 'Delete Account' ? (
                  <span className="text-red-900">{props.endDelete}</span>
                ) : (
                  props.endDelete
                )}
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBarUsers;
