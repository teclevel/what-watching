import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetFilmFoundState } from '../../store/film-screening/film-screening';

function GoToMainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const clickHandle = () => dispatch(resetFilmFoundState());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Error 404. Page not found!</h1>
      <p>
        <Link to={AppRoute.Main}
          onClick={clickHandle}
        >
          Go to main page.
        </Link >
      </p>
    </div >
  );
}

export default GoToMainPage;
