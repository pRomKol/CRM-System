import './input.scss';
import React, { ChangeEvent } from "react";

type InputPropsType = {
  value: string | undefined;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value);
  };

  return (
      <input
          value={props.value || ""}
          onChange={onChangeHandler}
          onKeyPress={props.onKeyPress}
          type="text"
          className="input"
          placeholder="Task To Be Done..."
          autoFocus
      />
  );
};