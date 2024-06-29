import React from 'react';

function Card(props) {
  return (
    <div
      dir="rtl"
      className={`w-96 max-md:w-60  ${props.bgColor} hover:scale-105  transition-all rounded-lg pb-14  shadow-2xl`}
    >
      <div className="stat gap-2">
        {props.svg}
        <div className="stat-title text-white text-2xl max-md:text-xl text-wrap max-w-96 max-md:max-w-60 ">
          {props.text}{' '}
        </div>
        <div className="stat-value text-secondary">{props.number}</div>
      </div>
    </div>
  );
}

export default Card;
