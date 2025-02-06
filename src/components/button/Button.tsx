import './button.scss'
import {ReactNode} from "react";
type ButtonPropsType = {
    buttonType: string
    title: string | ReactNode
    onClick:(...args) => void
    reqType?: 'submit'
    form?:string
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.onClick()
    }
  return (
    <button type={props.reqType} onClick={onClickHandler}
      className={
        props.buttonType === "delete"
          ? "delete-button"
          : props.buttonType === "refactor"
            ? "refactor-button"
            : "add-button"
      }
    >
        {props.title}
    </button>
  );
};
