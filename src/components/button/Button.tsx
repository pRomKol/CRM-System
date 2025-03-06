import './button.scss'
import {Button as AntButton} from "antd";

type ButtonPropsType = {
    title: string
    onClick:() => void
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.onClick()
    }
  return (
      <AntButton
          onClick={onClickHandler}
      >
          {props.title}
      </AntButton>
  );
};
