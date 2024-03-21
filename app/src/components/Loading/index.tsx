import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import assets from '../../assets/index';
import './index.css';

const LottieComponent: React.FC<{
  options: any;
  style: React.CSSProperties;
}> = ({ options, style }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current as HTMLDivElement,
      renderer: 'svg',
      loop: options.loop || false,
      autoplay: options.autoplay || false,
      animationData: options.animationData,
    });

    return () => {
      animation.destroy();
    };
  }, [options]);

  return <div ref={containerRef} style={style} />;
};

interface ILoadingProps {
  size?: number;
  style?: React.CSSProperties;
}

export const LoadingScreen = () => {
  return (
    <div className="loading_screen">
      <LottieComponent
        options={{ loop: true, autoplay: true, animationData: assets.loading }}
        style={{ width: 80, height: 80 }}
      />
    </div>
  );
};

const Loading: React.FC<ILoadingProps> = ({ size, style }) => {
  return (
    <div className={`loading ${style}`}>
      <LottieComponent
        options={{ loop: true, autoplay: true, animationData: assets.loading }}
        style={{ width: size || 40, height: size || 40 }}
      />
    </div>
  );
};

export default Loading;
