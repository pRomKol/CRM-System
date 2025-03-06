import React, { ChangeEvent } from "react";
import { Input } from 'antd';
import './input.scss';

type InputPropsType = {
  value: string | undefined;
  onChange: (value: string) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const TextInput = (props: InputPropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.currentTarget.value);
  };

  return (
      <Input
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