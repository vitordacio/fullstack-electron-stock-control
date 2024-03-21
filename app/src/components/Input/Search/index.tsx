import React, { ChangeEventHandler } from 'react';
import assets from '../../../assets/index';

type SearchInputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder?: string;
  onClick?: () => void;
  name?: string;
};

const InputSearch: React.FC<SearchInputProps> = ({
  onChange,
  value,
  placeholder,
  onClick,
  name,
}) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onClick) onClick();
  };

  return (
    <>
      <form
        className="container_input"
        style={{ marginBottom: 8 }}
        onSubmit={handleSearch}
      >
        <input
          name={name}
          type="text"
          placeholder={placeholder || 'Pesquisar'}
          className="input_text"
          value={value}
          onChange={onChange}
          min={0}
          style={{ paddingRight: 40 }}
        />
        <button type="submit" className="icon_container" onClick={onClick}>
          <img src={assets.search} className="icon" />
        </button>
      </form>
    </>
  );
};

export default InputSearch;
