import React from 'react';

function Card(props) {
  return (
    // <div dir="rtl" className="stats stats-vertical lg:stats-horizontal shadow ">
    //   <div className="stat">
    //     <div className="stat-title">عدد الاشخاص المسجلين</div>
    //     <div className="stat-value">{props.numberUsers}</div>
    //     <div className="stat-desc">Jan 1st - Feb 1st</div>
    //   </div>

    //   <div className="stat">
    //     <div className="stat-title">المشاريع قيد الموافقة</div>
    //     <div className="stat-value">4,200</div>
    //     <div className="stat-desc">↗︎ 400 (22%)</div>
    //   </div>

    //   <div className="stat">
    //     <div className="stat-title">New Registers</div>
    //     <div className="stat-value">1,200</div>
    //     <div className="stat-desc">↘︎ 90 (14%)</div>
    //   </div>
    // </div>

    <div
      dir="rtl"
      className={`w-96 max-md:w-60  ${props.bgColor} rounded-lg pb-14  shadow-2xl`}
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
