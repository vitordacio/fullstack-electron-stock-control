import React, { ChangeEventHandler } from 'react';
import '../index.css';
import assets from '../../../assets';

type TextInputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: number;
  placeholder?: string;
  name: string;
  toFixed?: boolean;
  disabled?: boolean;
};

export const InputNumberDefault: React.FC<TextInputProps> = ({
  value,
  onChange,
  name,
  placeholder,
  toFixed,
  disabled,
}) => {
  return (
    <input
      name={name}
      className={`input_text${disabled ? ` input_disabled` : ''}`}
      value={value}
      onChange={onChange}
      type="number"
      placeholder={placeholder}
      step={toFixed ? '0.01' : ''}
      disabled={disabled}
    />
  );
};

type TextInput = TextInputProps & {
  title: string;
  minWidth?: number;
  handleQtd?: (type: 'minus' | 'plus') => void;
};

const InputNumber: React.FC<TextInput> = ({
  title,
  minWidth,
  handleQtd,
  ...rest
}) => {
  return (
    <div style={{ width: '100%' }}>
      {title && <label className="title">{title}:</label>}
      <div
        className="container_input"
        style={{
          display: 'flex',
          flexDirection: 'row',
          minWidth,
        }}
      >
        {handleQtd && (
          <div
            className="input_qtd"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleQtd('minus');
            }}
          >
            <img src={assets.minus} />
          </div>
        )}
        <InputNumberDefault {...rest} />
        {handleQtd && (
          <div
            className="input_qtd"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleQtd('plus');
            }}
          >
            <img src={assets.plus} />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputNumber;
