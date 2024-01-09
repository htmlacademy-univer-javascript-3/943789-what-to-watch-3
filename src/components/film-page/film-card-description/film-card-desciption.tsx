import { useState } from 'react';
import DetailsContent from './tabs/details-content';
import OverviewContent from './tabs/overview-content';
import ReviewContent from './tabs/review-content';
import classNames from 'classnames';

enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Review = 'Review'
}

export default function FilmCardDesciption() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Overview);

  const tabInfos = {
    Overview: <OverviewContent />,
    Details: <DetailsContent/>,
    Review: <ReviewContent />
  };

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
