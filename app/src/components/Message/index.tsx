import { useEffect, useRef } from 'react';
import alert from '../../assets/alert.svg';
import check from '../../assets/check.svg';
import { useMessage } from '../../contexts/message';

export const Message = () => {
  const { handleMessage, handleExiting, animatedStyle, refresh } = useMessage();
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleExiting();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleExiting, refresh]);

  return (
    <div
      onClick={() => handleExiting()}
      className="message"
      ref={containerRef}
      style={{
        display: 'flex',
        width: '100%',
        height: 60,
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        backgroundColor: `${
          handleMessage.type === 'error' ? '#E63C3D' : '#4863F7'
        }`,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        ...animatedStyle,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
        }}
      >
        <img src={handleMessage.type === 'error' ? alert : check} />
      </div>
      <div style={{ fontSize: 16, color: '#fff', marginLeft: 8 }}>
        {handleMessage.message}
      </div>
    </div>
  );
};
