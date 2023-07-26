"use client";
import { useState } from 'react';
import styles from '../page.module.css';
// import { useDispatch } from 'react-redux';
import hideSidebarEyeOpen from '../../images/icon-show-sidebar.svg';
import hideSidebarEyeClose from '../../images/icon-hide-sidebar.svg';
import Image from 'next/image';
import { saveHidden } from '@/redux/actions/actions-sidebar';

const HideSidebar = () => {
  const [checked, setChecked] = useState(true);

  // const dispatch = useDispatch();

  // const hideSidebar = (checked) => {
  //   dispatch(saveHidden(checked))
  //   setChecked(!checked)
  // };

  return (
    <div className={styles.hideSidebar}>

      <div className={styles.sidebarContentHide}>

        <button
          type='button'
          onClick={() => hideSidebar(checked)}
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