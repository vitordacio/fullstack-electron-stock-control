import React, { ChangeEventHandler, useState } from 'react';
import assets from '../../../../assets/index';
import { IProduct } from '../../../../interfaces/product';
import Loading from '../../../Loading';
import './index.css';

type SearchProductInputProps = {
  products: IProduct[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  onClick?: () => void;
  onSelect: (product: IProduct) => void;
  name?: string;
  loading?: boolean;
};

const InputSearchProductWithSelect: React.FC<SearchProductInputProps> = ({
  products,
  loading,
  onChange,
  value,
  onClick,
  name,
  onSelect,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onClick) onClick();
  };

  const handleLiClick = (
    product: IProduct,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(product);
    setIsInputFocused(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <form
        className="container_input"
        style={{ marginBottom: 8 }}
        onSubmit={handleSearch}
      >
        <input
          name={name}
          type="text"
          placeholder="Pesquisar por produto"
          className="input_text"
          value={value}
          onChange={onChange}
          onFocus={() => setIsInputFocused(true)}
          style={{ paddingRight: 40 }}
          autoComplete="off"
        />
        <button
          type="submit"
          className="icon_container"
          onClick={() => setIsInputFocused(false)}
        >
          <img src={assets.x} className="icon" />
        </button>
      </form>

      {isInputFocused && (
        <ul className="searched_list">
          {loading ? (
            <li>
              <Loading size={32} />
            </li>
          ) : (
            <>
              {products &&
                products.length !== 0 &&
                products.map(product => (
                  <li
                    key={product.id_product}
                    onClick={e => handleLiClick(product, e)}
                  >
                    <span className="searched_name">{product.name}</span>
                    <span>Cód.: {product.code}</span>
                    <span>Preço venda: {product.price}</span>
                  </li>
                ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default InputSearchProductWithSelect;
