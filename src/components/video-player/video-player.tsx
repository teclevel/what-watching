import { useEffect, useRef, useState } from 'react';

type VideoPlayerProps = {
  poster: string,
  autoPlay: boolean,
  src: string,
  muted: boolean
}

function VideoPlayer({ src, poster, autoPlay, muted }: VideoPlayerProps): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => setIsLoading(false));

    if (isPlaying) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [isPlaying]);

  return (
    <video className="player__video"
      src={src}
      poster={poster}
      ref={videoRef}
      muted={muted}
    >
    </video>
  );
}

export default VideoPlayer;
