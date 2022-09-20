import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { fetchLoadFilmAction } from '../../store/api-actions';
import { getFilm } from '../../store/data-loading/selector';
import { getFilmFoundStatus } from '../../store/film-screening/selector';
import { getFilmTime } from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';


function Player(): JSX.Element | null {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm);
  const isFilmNotFound = useAppSelector(getFilmFoundStatus);

  const videoRef = useRef<HTMLVideoElement>(null);
  const video = videoRef.current;

  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [togglerPos, setTogglerPos] = useState(0);

  useEffect(() => {
    dispatch(fetchLoadFilmAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const updateTogglerPos = () => {
      if (videoRef.current !== null && !isNaN(videoRef.current.duration) ) {
        setTogglerPos(videoRef.current.currentTime / videoRef.current.duration * 100);
      }
      if (videoRef.current?.ended) {
        setIsPlaying(false);
      }
    };

    const addIsLoading = () => setIsLoading(true);
    const removeIsLoading = () => setIsLoading(false);

    videoRef.current.addEventListener('timeupdate', updateTogglerPos);
    videoRef.current.addEventListener('loadstart', addIsLoading);
    videoRef.current.addEventListener('canplay', removeIsLoading);

    if (isPlaying) {
      videoRef.current.pause();
      videoRef.current.muted = false;
      return;
    }

    videoRef.current.play();

    return () => {
      if (video === null) { return; }
      video.addEventListener('timeupdate', updateTogglerPos);
      video.addEventListener('loadstart', addIsLoading);
      video.addEventListener('canplay', removeIsLoading);
    };

  }, [video, isPlaying, film]);

  if (isFilmNotFound) {
    dispatch(redirectToRoute(AppRoute.NotFound));
  }

  if (!film) { return <LoadingScreen />; }

  return (
    <div className="player">
      {isLoading && <LoadingScreen />}
      <video src={film.videoLink} className="player__video"
        poster={film.previewImage}
        ref={videoRef}
        muted
      >
      </video>
      <button type="button" className="player__exit"
        onClick={() => navigate(`/films/${id}`)}
      >Exit
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress"
              value={togglerPos}
              max="100"
            >
            </progress>
            <div className="player__toggler"
              style={{ left: `${togglerPos}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">-
            {
              video
                ? getFilmTime(video.duration - video.currentTime)
                : '00:00:00'
            }
          </div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {
              isPlaying
                ?
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                :
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
            }
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">Transpotting</div>
          <button type="button" className="player__full-screen"
            onClick={() => video?.requestFullscreen()}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div >
  );
}

export default Player;
