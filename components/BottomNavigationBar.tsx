
import React from 'react';
import { NavItem as NavItemProps, NavItemType, IconProps } from '../types'; // Renamed NavItem to NavItemProps

// Keep NavItem and NavItemType exports if they are used elsewhere by this name
export type { NavItem as BottomNavItem } from '../types'; // Export with a new name if needed
export { NavItemType };


interface BottomNavigationBarProps {
  items: NavItemProps[];
  layout?: 'horizontal' | 'vertical';
  onItemClick?: (id: NavItemType, href?: string) => void;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ items, layout = 'vertical', onItemClick }) => {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={`bg-white ${
        isHorizontal
          ? 'relative border-b border-[#f4f0f0]' // Desktop styles
          : 'fixed bottom-0 left-0 right-0 z-20 border-t border-[#f4f0f0]' // Mobile styles
      }`}
      role="navigation"
    >
      <div
        className={`flex ${
          isHorizontal
            ? 'gap-8 px-4 justify-start items-center' // Desktop item container
            : 'gap-2 px-4 pb-3 pt-2' // Mobile item container
        }`}
      >
        {items.map((item) => {
          const isActive = item.isActive;
          const commonTextClass = isActive ? 'text-[#181111]' : 'text-[#886364]';

          return (
            <a
              key={item.id}
              className={`flex cursor-pointer ${
                isHorizontal
                  ? `flex-row items-center gap-1 border-b-[3px] pb-[13px] pt-4 ${isActive ? 'border-b-[#181111]' : 'border-b-transparent'}` // Desktop item
                  : 'flex-1 flex-col items-center justify-end gap-1 rounded-full' // Mobile item
              } ${commonTextClass}`}
              onClick={() => {
                if (onItemClick) {
                  onItemClick(item.id, item.href);
                }
              }}
              href={item.href || '#'}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`flex items-center justify-center ${isHorizontal ? '' : 'h-8'}`}>
                {React.cloneElement(item.icon as React.ReactElement<IconProps>, {
                  className: commonTextClass,
                })}
              </div>
              <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${commonTextClass}`}>
                {item.label}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
};
