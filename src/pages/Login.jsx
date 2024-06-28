import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertToast from '../components/AlertToast';

function Login() {
  const [emailValue, setemailValue] = useState('');
  const [passwordValue, setpasswordValue] = useState('');
  const [errorField, seterrorField] = useState({});
  const [data, setData] = useState([]);
  const [alertToastValue, setalertToastValue] = useState('');
  const navigate = useNavigate();

  let urlUsers = 'https://667e0138297972455f66dc2e.mockapi.io/users';

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios.get(urlUsers).then((response) => {
      setData(response.data);
    });
  }
  function handleLogin() {
    let valid = true;
    let errors = {};

    const emailRegex = /^[^\s@]+@tuwaiq\.com$/;

    if (emailValue === '') {
      errors.email = 'يجب تعبئة الحقل';
      valid = false;
    } else if (!emailRegex.test(emailValue)) {
      errors.email = 'يجب ان يحتوي البريد على @tuwaiq.com';
      valid = false;
    } else {
      errors.email = '';
    }

    if (passwordValue === '') {
      errors.password = 'يجب تعبئة الحقل';
      valid = false;
    } else if (passwordValue.length < 8) {
      errors.password = 'كلمة السر يجب ان تحتوي على 8 خانات';
      valid = false;
    } else {
      errors.password = '';
    }

    const dataFound = data.find((item) => {
      return item.email === emailValue && item.password === passwordValue;
    });

    if (valid) {
      if (dataFound) {
        console.log(dataFound);
        setemailValue('');
        setpasswordValue('');
        localStorage.setItem('id', dataFound.id);
        dataFound.role == 'admin'
          ? navigate('../admin')
          : navigate('../student');
      } else {
        errors.email = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        errors.password = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      }
    }

    seterrorField(errors);
  }

  return (
    <div>
      <div
        className="flex items-center justify-center h-screen w-full px-5 sm:px-0 "
        dir="rtl"
      >
        {alertToastValue && <AlertToast text={alertToastValue} />}

        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">
              اهلا بك في ادارة مشاريع طويق
            </p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                البريد الألكتروني
              </label>
              <input
                onKeyDown={(e) => {
                  e.key === 'Enter' ? handleLogin() : null;
                }}
                dir="ltr"
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                required
                value={emailValue}
                placeholder="student@tuwaiq.com"
                onChange={(e) => {
                  setemailValue(e.target.value);
                }}
              />
              <label className="text-red-400">{errorField.email}</label>
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  كلمة السر
                </label>
              </div>
              <input
                onKeyDown={(e) => {
                  e.key === 'Enter' ? handleLogin() : null;
                }}
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                value={passwordValue}
                placeholder="********"
                onChange={(e) => {
                  setpasswordValue(e.target.value);
                }}
              />
              <label className="text-red-400">{errorField.password}</label>
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                هل نسيت كلمة السر؟
              </a>
            </div>
            <div className="mt-8">
              <button
                onClick={() => {
                  handleLogin();
                }}
                className="btn btn-primary text-white font-bold py-2 px-4 w-full rounded"
              >
                تسجيل الدخول
              </button>
            </div>

            <div className="mt-4 flex items-center w-full text-center">
              <Link
                to={'../'}
                className="text-xs text-gray-500 capitalize text-center w-full"
              >
                ليس لديك حساب من قبل؟
                <span className="text-blue-700"> تسجيل جديد</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
