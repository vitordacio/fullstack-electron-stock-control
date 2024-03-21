import './index.css';
import React from 'react';
import Loading from '../../components/Loading';
import assets from '../../assets/index';

const ButtonIcons = {
  alert: assets.alert,
  edit: assets.edit,
  minus: assets.minus,
  plus: assets.plus,
  settings: assets.settings,
  chevron: assets.chevron,
  refresh: assets.refresh,
  filter: assets.filter,
};

interface IButton {
  customClass?: 'red' | 'transparent' | 'transparent_no_hover';
  text?: string;
  type?: 'reset' | 'button' | 'submit' | undefined;
  style?: React.CSSProperties;
  loading?: boolean;
  marginVertical?: boolean;
  icon?: keyof typeof ButtonIcons;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<IButton> = ({
  customClass,
  type,
  style,
  loading,
  marginVertical,
  text,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`button${customClass ? ` button_${customClass}` : ''}${
        marginVertical ? ` margin_top` : ''
      }`}
      type={type}
      style={style}
      onClick={onClick}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          {icon && (
            <div>
              <img src={ButtonIcons[icon]} />
            </div>
          )}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
