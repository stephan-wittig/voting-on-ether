import React from 'react';

//CSS
import style from "./TextField.css";

const TextField = ({value, handleChange, disabled}) => (
  <div className={style.textField}>
    <textarea className={style.textField} value={value} onChange={handleChange} disabled={disabled}/>
  </div>
);

export default TextField;
