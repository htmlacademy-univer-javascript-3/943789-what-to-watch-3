import { useState } from 'react';
import { FilmInfo } from '../../../data/films/film-info';
import { FilmRatingInfo } from '../../../data/films/film-rating-info';
import DetailsContent from './tabs/details-content';
import OverviewContent from './tabs/overview-content';
import ReviewContent from './tabs/review-content';
import classNames from 'classnames';

enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Review = 'Review'
}

function getTabs(props: FilmInfo & FilmRatingInfo) {
  const TabToComponent: {[key in Tab] : JSX.Element} = {
    Overview: <OverviewContent {...props}/>,
    Details: <DetailsContent/>,
    Review: <ReviewContent />
  };

  return TabToComponent;
}

export default function FilmCardDesciption(props: FilmInfo & FilmRatingInfo) {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Overview);

  const tabInfos = getTabs(props);
  const tabs = Object.keys(tabInfos) as Array<Tab>;

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {tabs.map((tab) => {
            const liClass = classNames({
              'film-nav__item': true,
              'film-nav__item--active': activeTab === tab
            });

            return (
              <li key={tab} className={liClass}>
                <a className="film-nav__link" onClick={() => {
                  setActiveTab(tab);
                }}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {tabInfos[(tabs.find((tab) => tab === activeTab) || tabs[0])]}
    </div>
  );
}
