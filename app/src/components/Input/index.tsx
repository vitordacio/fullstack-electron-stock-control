import React, { ChangeEventHandler, useState } from 'react';
import assets from '../../assets/index';
import './index.css';

type TextInputProps = {
  type?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  maxLength?: number;
  name: string;
  disabled?: boolean;
};

export const InputDefault: React.FC<TextInputProps> = ({
  value,
  onChange,
  type,
  maxLength,
  name,
  placeholder,
  disabled,
}) => {
  return (
    <input
      name={name}
      className="input_text"
      value={value}
      onChange={onChange}
      type={type}
      min={0}
      maxLength={maxLength}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

type TextInput = TextInputProps & {
  name: string;
  title: string;
  isSecurityEntry?: boolean;
  reset?: boolean;
  minWidth?: number;
};

const Input: React.FC<TextInput> = ({
  title,
  type,
  isSecurityEntry,
  minWidth,
  ...rest
}) => {
  const [isSecurity, setIsSecurity] = useState(isSecurityEntry);

  return (
    <div style={{ width: '100%' }}>
      {title && <label className="title">{title}:</label>}
      <div
        className="container_input"
        style={{
          minWidth,
        }}
      >
        <InputDefault
          type={isSecurity ? 'password' : type || 'text'}
          {...rest}
        />
        {isSecurityEntry && (
          <div
            className="icon_container"
            onClick={() => setIsSecurity(!isSecurity)}
          >
            <img
              src={isSecurity ? assets.eye : assets.eye_off}
              className="icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

// const Input: React.FC<TextInput> = ({
//   name,
//   control,
//   error,
//   title,
//   type,
//   placeholder,
//   isSecurityEntry,
//   reset,
//   ...rest
// }) => {
//   const [isSecurity, setIsSecurity] = useState(isSecurityEntry);
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     const resetInput = () => {
//       setInputValue('');
//     };

//     resetInput();
//   }, [reset]);

//   return (
//     <>
//       {title && <label className="title">{title}:</label>}
//       <div className="container_input">
//         <Controller
//           name={name}
//           control={control}
//           render={({ field: { onChange } }) => (
//             <InputDefault
//               placeholder={placeholder}
//               value={inputValue}
//               onChange={e => {
//                 setInputValue(e.target.value);
//                 onChange(e);
//               }}
//               type={isSecurity ? 'password' : type || 'text'}
//               {...rest}
//             />
//           )}
//         />
//         {isSecurityEntry && (
//           <div
//             className="icon_container"
//             onClick={() => setIsSecurity(!isSecurity)}
//           >
//             <img
//               src={isSecurity ? assets.eye : assets.eye_off}
//               className="icon"
//             />
//           </div>
//         )}
//       </div>
//       {error && <span className="error">{error.message}</span>}
//     </>
//   );
// };

// export default Input;
