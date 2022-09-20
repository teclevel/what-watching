import { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { TABS, Tab } from '../../../const';
import { Film } from '../../../types/films';
import DetailsTab from '../details-tab/details-tab';
import OverviewTab from '../overveiw-tab/overveiw-tab';
import ReviewTab from '../review-tab/review-tab';

type TabsComponentProps = {
  film: Film;
}

function ListTabs({ film }: TabsComponentProps): JSX.Element {
  const [tabActive, setTabActive] = useState(Tab.OVERVIEW);

  const tabClass = 'film-nav__item';
  const tabActiveClass = 'film-nav__item--active';

  const openTabHandle = ({ currentTarget }: BaseSyntheticEvent) => setTabActive(currentTarget.dataset.tab);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            TABS.map((itemTab) => (
              <li key={itemTab}
                className={itemTab === tabActive
                  ? `${tabClass} ${tabActiveClass}`
                  : tabClass}
                onClick={openTabHandle}
                data-tab={itemTab}
              >
                <Link to="#" className="film-nav__link">{itemTab}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
      {tabActive === Tab.OVERVIEW && <OverviewTab film={film} />}
      {tabActive === Tab.DETAILS && <DetailsTab film={film} />}
      {tabActive === Tab.REVIEWS && <ReviewTab />}
    </div >
  );
}

export default ListTabs;
