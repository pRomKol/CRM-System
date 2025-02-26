import './input.scss';
import React, { ChangeEvent } from "react";

type InputPropsType = {
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const cleanedValue = value.replace(/\s+/g, ' ');
    props.onChange(cleanedValue);
  };

  return (
      <input
          value={props.value || ""}
          onChange={onChangeHandler}
          onBlur={props.onBlur}
          onKeyPress={props.onKeyPress}
          type="text"
          className="input"
          placeholder="Task To Be Done..."
          autoFocus
      />
  );
};