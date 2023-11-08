import { useState } from 'react';
import { FilmInfo } from '../../../data/films/film-info';
import { FilmRatingInfo } from '../../../data/films/film-rating-info';
import DetailsContent from './tabs/details-content';
import OverviewContent from './tabs/overview-content';
import ReviewContent from './tabs/review-content';

type TabInfo = {
  id: number;
  description: string;
  componentToShow: JSX.Element;
}

function getTabs(props: FilmInfo & FilmRatingInfo) {
  const TabInfos: TabInfo[] = [
    {
      id: 1,
      description: 'Overview',
      componentToShow: OverviewContent(props)
    },
    {
      id: 2,
      description: 'Details',
      componentToShow: DetailsContent()
    },
    {
      id: 3,
      description: 'Review',
      componentToShow: ReviewContent()
    }
  ];

  return TabInfos;
}

export default function FilmCardDesciption(props: FilmInfo & FilmRatingInfo) {
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const tabInfos = getTabs(props);

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabInfos.map((tab) => {
            let classForLi = 'film-nav__item';
            if (activeTabId === tab.id) {
              classForLi += ' film-nav__item--active';
            }

            return (
              <li key={tab.id} className={classForLi} onClick={() => {
                setActiveTabId(tab.id);
              }}
              >
                <a to="#" className="film-nav__link">{tab.description}</a>
              </li>
            );
          })}
        </ul>
      </nav>

      {(tabInfos.find((tabInfo) => tabInfo.id === activeTabId) || tabInfos[0]).componentToShow}
    </div>
  );
}
