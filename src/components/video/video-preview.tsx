import { useEffect, useRef, useState } from 'react';

type VideoInfo = {
  src: string;
  muted: boolean;
  poster: string;
  isPlaying: boolean;
}

type ElementInfo = {
  height: string | number | undefined;
  width: string | number | undefined;
}

export default function VideoPreview(props: VideoInfo & ElementInfo) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!isLoaded || !videoElement) {
      return;
    }

    if (props.isPlaying) {
      videoElement.play();
    } else {
      videoElement.load();
    }
  }, [props.isPlaying, isLoaded]);

  return (
    <video
      poster={props.poster}
      src={props.src}
      muted={props.muted}
      height={props.height}
      width={props.width}
      ref={videoRef}
      onLoadedData={() => setIsLoaded(true)}
    >
    </video>
  );
}
