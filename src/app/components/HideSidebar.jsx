"use client";
import { useState } from 'react'; 
import hideSidebarEyeOpen from '../../images/icon-show-sidebar.svg';
import hideSidebarEyeClose from '../../images/icon-hide-sidebar.svg';
import Image from 'next/image';
import styles from '../page.module.css';

const HideSidebar = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div className={styles.hideSidebar}>
      <div className={styles.sidebarContentHide}>

      <button
        type='button'
        onClick={() => setChecked(!checked)}
      >
        <Image src={hideSidebarEyeClose} alt="Hide Sidebar" width={20} height={20} priority />
        <p>Hide Sidebar</p>
      </button>

      </div>

      <div className={styles.sidebarContentHide}>

      <button
        type='button'
        onClick={() => setChecked(!checked)}
      >
        <Image src={hideSidebarEyeOpen} alt="Hide Sidebar" width={20} height={20} priority />
        <p>Hide Sidebar</p>
      </button>

      </div>
    </div>
  )
};

export default HideSidebar;