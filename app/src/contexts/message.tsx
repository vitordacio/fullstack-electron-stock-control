import React, { createContext, useContext, useState } from 'react';

interface IMessageContextData {
  handleMessage: handleMessage;
  animatedStyle: React.CSSProperties | undefined;
  // animatedStyle: IStyle;
  handleEntering: () => void;
  handleExiting: () => void;
  throwInfo: (data: string) => void;
  throwError: (data: string) => void;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IProps {
  children: React.ReactNode;
}

type handleMessage = {
  message: string;
  type?: 'info' | 'error' | '';
};

const MessageContext = createContext<IMessageContextData>(
  {} as IMessageContextData,
);

const MessageProvider: React.FC<IProps> = ({ children }) => {
  const [translateY, setTranslateY] = useState<number>(-60);
  const [opacity, setOpacity] = useState<number>(0);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [handleMessage, setHandleMessage] = useState<handleMessage>({
    message: '',
    type: '',
  });

  const handleEntering = () => {
    setTranslateY(0);
    setOpacity(1);
    setRefresh(prev => !prev);
  };

  const handleExiting = () => {
    setTranslateY(-60);
    setOpacity(0);
  };

  const throwInfo = (infoMessage: string) => {
    setHandleMessage({
      message: infoMessage,
    });

    handleEntering();
  };

  const throwError = (errorMessage: string) => {
    setHandleMessage({
      type: 'error',
      message: errorMessage,
    });

    handleEntering();
  };

  const animatedStyle: React.CSSProperties = {
    transform: `translateY(${translateY}px)`,
    opacity,
  };

  return (
    <MessageContext.Provider
      value={{
        handleMessage,
        animatedStyle,
        handleEntering,
        handleExiting,
        refresh,
        setRefresh,
        throwInfo,
        throwError,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = () => useContext(MessageContext);

export { MessageProvider, useMessage };
