import React from 'react';

function RadioButton(props) {
  return (
    <div>
      <div className="label flex" dir="rtl">
        <span className="label-text text-right">{props.name}</span>
      </div>
      <div className="flex flex-row-reverse gap-2" dir="ltr">
        <div className="form-control ">
          <label className="label cursor-pointer flex gap-3">
            <span className="label-text">{props.value1}</span>
            <input
              type="radio"
              name={props.name}
              className="radio checked:bg-blue-500"
              value={props.value1}
              checked={props.value === props.value1}
              onChange={() => props.onChange(props.value1)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer flex gap-3">
            <span className="label-text">{props.value2}</span>
            <input
              type="radio"
              name={props.name}
              className="radio checked:bg-blue-500"
              value={props.value2}
              checked={props.value === props.value2}
              onChange={() => props.onChange(props.value2)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer flex gap-3">
            <span className="label-text">{props.value3}</span>
            <input
              type="radio"
              name={props.name}
              className="radio checked:bg-blue-500"
              value={props.value3}
              checked={props.value === props.value3}
              onChange={() => props.onChange(props.value3)}
            />
          </label>
        </div>
      </div>
      <div className="label flex justify-center">
        <span id="error-message" className="label-text-alt text-red-700">
          {props.error}
        </span>
      </div>
    </div>
  );
}

export default RadioButton;
