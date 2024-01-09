import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchFilmById } from '../../api/api-actions';
import { selectCurrentFilm } from '../../stores/current-film/current-film-selectors';
import VideoPlayer, { VideoState } from '../video-player/video-player';

const MINUTES_IN_HOUR = 60;
const SECOND_IN_MINUTE = 60;

function formatWithLeadingZero(num: number, digitCount: number) {
  return String(num).padStart(digitCount, '0');
}

function formatTimeString(timeInSeconds: number) {
  let result = formatWithLeadingZero(timeInSeconds % SECOND_IN_MINUTE, 2);
  const remainMinutes = Math.floor(timeInSeconds / SECOND_IN_MINUTE);
  result = `${formatWithLeadingZero(remainMinutes % MINUTES_IN_HOUR, 2)}:${result}`;
  const remainHours = Math.floor(remainMinutes / MINUTES_IN_HOUR);

  if (remainHours > 0) {
    result = `${formatWithLeadingZero(remainHours, 2)}:${result}`;
  }

  return result;
}

function getPercentElapsed(duration: number, elapsed: number) {
  return elapsed * 100 / duration;
}

export default function PlayerPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const dispatch = useAppDispatch();
  const filmInfo = useAppSelector(selectCurrentFilm);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(1);
  const [videoState, setVideoState] = useState<VideoState>(VideoState.Load);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const filmId = params.id as string;

  useEffect(() => {
    dispatch(fetchFilmById(filmId));
  }, [filmId, dispatch]);

  useEffect(() => {
    if (fullscreen) {
      pageRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [fullscreen]);

  const handleVideoTimeUpdate = useCallback<React.ReactEventHandler<HTMLVideoElement>>((evt) => {
    const target = evt.target as HTMLVideoElement;
    setCurrentTime(target.currentTime);
  }, [setCurrentTime]);

  const handleVideoDurationUpdate = useCallback<React.ReactEventHandler<HTMLVideoElement>>((evt) => {
    const target = evt.target as HTMLVideoElement;
    setDuration(target.duration);
  }, [setDuration]);

  if (params.id === undefined || filmInfo === undefined) {
    return <NotFoundPage />;
  }

  const percentElapsed = getPercentElapsed(duration, currentTime);
  const remainTimeString = formatTimeString(Math.floor(duration - currentTime));

  return (
    <div ref={pageRef}>
      <div className="player">
        <VideoPlayer src={filmInfo.videoLink} poster={filmInfo.backgroundImage} state={videoState} className='player__video' onTimeUpdate={handleVideoTimeUpdate} onDurationUpdate={handleVideoDurationUpdate} muted={false} />

        <Link to={`/films/${filmId}`} type="button" className="player__exit">Exit</Link>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={percentElapsed} max="100"></progress>
              <div className="player__toggler" style={{ left: `${percentElapsed}%` }}>Toggler</div>
            </div>
            <div className="player__time-value">-{remainTimeString}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={() => {
              if (videoState !== VideoState.Play) {
                setVideoState(VideoState.Play);
              } else {
                setVideoState(VideoState.Pause);
              }
            }}
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref={videoState !== VideoState.Play ? '#play-s' : '#pause'}></use>
              </svg>
              <span>{videoState !== VideoState.Play ? 'Play' : 'Pause'}</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen" onClick={() => {
              setFullscreen(!fullscreen);
            }}
            >
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
