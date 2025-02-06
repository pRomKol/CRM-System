import './input.scss'
import {ChangeEvent, useState} from "react";

type InputPropsType = {
  value: string
  setInputValue:(value: string)=> void
}
export const Input = (props: InputPropsType) => {

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    props.setInputValue(e.target.value)
  }
  return <input value={props.value} onChange={e => props.setInputValue(e.target.value)} type="text" className="input"
                placeholder='Task To Be Done...'/>;
};
