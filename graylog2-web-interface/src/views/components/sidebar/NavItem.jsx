// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import { SizeMe } from 'react-sizeme';

import styles from './SideBar.css';
import CustomPropTypes from '../CustomPropTypes';

type Props = {
  isOpen: boolean,
  isSelected: boolean,
  expandToRight: boolean,
  text: string,
  icon: React.Element<any>,
  onClick: (string) => void,
  children: React.Element<any>,
}

const NavItem = ({ isOpen, isSelected, expandToRight, text, children, icon, onClick }: Props) => {
  const selectedColor = isSelected ? styles.selected : '';
  // eslint-disable-next-line no-nested-ternary
  const selected = isSelected
    ? (expandToRight
      ? styles.openFieldContent
      : styles.contentOpen)
    : styles.contentClosed;

  return (
    <div>
      <div role="presentation" onClick={onClick} className={`${styles.sidebarNav} ${selectedColor}`}>
        <div className={styles.sidebarIcon}>{icon}</div>
        {(isOpen && <div className={styles.sidebarNavFont}>{text}</div>)}
      </div>
      <SizeMe monitorHeight refreshRate={100}>
        {({ size }) => {
          return (
            <div className={`${styles.navContent} ${selected}`}>
              {
                isSelected && children
                  ? React.cloneElement(children, { listHeight: size.height - 150 })
                  : <span />
              }
            </div>
          );
        }}
      </SizeMe>
    </div>
  );
};

NavItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  expandToRight: PropTypes.bool,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: CustomPropTypes.OneOrMoreChildren.isRequired,
};

NavItem.defaultProps = {
  expandToRight: false,
};

export default NavItem;
