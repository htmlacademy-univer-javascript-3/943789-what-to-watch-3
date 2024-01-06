import { useCallback, useEffect, useRef, useState } from 'react';

type VideoInfo = {
  src: string;
  muted: boolean;
  poster: string;
  state: VideoState;
}

type ElementInfo = {
  height?: string | number;
  width?: string | number;
  className?: string;
  onLoadedData?: React.ReactEventHandler<HTMLVideoElement>;
  onTimeUpdate?: React.ReactEventHandler<HTMLVideoElement>;
  onDurationUpdate?: React.ReactEventHandler<HTMLVideoElement>;
}

export enum VideoState {
  Load,
  Pause,
  Play
}

export default function VideoPlayer(props: VideoInfo & ElementInfo) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!isLoaded || !videoElement) {
      return;
    }

    switch (props.state) {
      case VideoState.Load:
        videoElement.load();
        break;
      case VideoState.Pause:
        videoElement.pause();
        break;
      case VideoState.Play:
        videoElement.play();
        break;
    }
  }, [props.state, isLoaded]);

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsLoaded(true);
    if (props.onLoadedData !== undefined) {
      props.onLoadedData(event);
    }
  }, [setIsLoaded, props]);

  return (
    <video
      poster={props.poster}
      src={props.src}
      muted={props.muted}
      height={props.height}
      width={props.width}
      ref={videoRef}
      onLoadedData={handleLoad}
      className={props.className}
      onTimeUpdate={props.onTimeUpdate}
      onDurationChange={props.onDurationUpdate}
    >
    </video>
  );
}
