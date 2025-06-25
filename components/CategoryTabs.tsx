import React from 'react';
import { Tab } from '../types';

interface CategoryTabsProps {
  activeTab: Tab;
  onTabClick: (tab: Tab) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeTab, onTabClick }) => {
  const tabs = [
    { id: Tab.Fragrances, label: 'Fragancias' },
    { id: Tab.Beauty, label: 'Belleza' },
    { id: Tab.Brands, label: 'Marcas' },
    { id: Tab.Favorites, label: 'Favoritos' },
  ];

  return (
    <div className="pb-3">
      <div className="flex border-b border-[#e5dcdc] px-4 gap-8">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 cursor-pointer ${
              activeTab === tab.id
                ? 'border-b-[#181111] text-[#181111]'
                : 'border-b-transparent text-[#886364]'
            }`}
            onClick={() => onTabClick(tab.id)}
            href="#"
          >
            <p className={`${activeTab === tab.id ? 'text-[#181111]' : 'text-[#886364]'} text-sm font-bold leading-normal tracking-[0.015em]`}>
              {tab.label}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export { Tab };
