import React from 'react';

function SearchInput(props) {
  return (
    <div
      className="gap-2 w-[80%] max-md:w-[80%] flex justify-start items-center"
      dir="rtl"
    >
      <input
        dir="rtl"
        placeholder="ابحث عن طالب"
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-[50%] max-md:w-[70%]  transition-all  outline-none"
        name="search"
        type=""
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      <button onClick={props.onClick} className="btn btn-primary rounded-full">
        <svg
          className="size-6 text-white "
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            strokeLinejoin="round"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}

export default SearchInput;
