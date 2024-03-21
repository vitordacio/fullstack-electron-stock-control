import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { ICategory } from '../../../../interfaces/category';
import { useMessage } from '../../../../contexts/message';
import { categoryService } from '../../../../services/Category';
import '../../index.css';

type SelectCategoryProps = {
  name: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  nullValue?: string;
  value?: string;
  minWidth?: number;
  allOption?: boolean;
};

const InputSelectCategory: React.FC<SelectCategoryProps> = ({
  minWidth,
  name,
  value,
  onChange,
  allOption,
  nullValue,
}) => {
  const { throwError } = useMessage();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
    let newCategories;

    try {
      newCategories = await categoryService.findIndex();
    } catch (error) {
      throwError('Não foi possível carregar categorias');
    } finally {
      if (newCategories) setCategories(newCategories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <label className="title">Categoria:</label>
      <div
        className="container_input"
        style={{
          minWidth,
        }}
      >
        <select
          name={name}
          className="input_text"
          value={value}
          onChange={onChange}
        >
          {allOption && <option value="">Todas</option>}
          <option value={nullValue ? nullValue : ''}>Sem categoria</option>
          {categories &&
            categories.length !== 0 &&
            categories.map(category => (
              <option
                key={category.id_category}
                value={category.id_category}
              >{`${category.name}`}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default InputSelectCategory;
