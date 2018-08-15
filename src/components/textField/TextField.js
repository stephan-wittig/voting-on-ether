import React from 'react';

//CSS
import style from "./TextField.css";

const TextField = ({value, disabled, setText}) => (
  <div className={style.textField}>
    <textarea className={style.textField} value={value} onChange={(e) => {setText(e.target.value)}} disabled={disabled}/>
  </div>
);

export default TextField;
