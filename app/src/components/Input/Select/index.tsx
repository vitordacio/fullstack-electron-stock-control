import React, { ChangeEventHandler } from 'react';
import '../index.css';

type TextInputProps = {
  name: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  value?: number;
  options: {
    value: string;
    name: string;
  }[];
  nullOption?: string;
};

export const InputSelectDefault: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  options,
  nullOption,
}) => {
  return (
    <select
      name={name}
      className="input_text"
      value={value}
      onChange={onChange}
    >
      {nullOption && <option value="">{nullOption}</option>}
      {options &&
        options.length !== 0 &&
        options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >{`${option.name}`}</option>
        ))}
    </select>
  );
};

type TextInput = TextInputProps & {
  title: string;
  minWidth?: number;
};

const InputSelect: React.FC<TextInput> = ({ title, minWidth, ...rest }) => {
  return (
    <div>
      {title && <label className="title">{title}:</label>}
      <div
        className="container_input"
        style={{
          minWidth,
        }}
      >
        <InputSelectDefault {...rest} />
      </div>
    </div>
  );
};

export default InputSelect;
