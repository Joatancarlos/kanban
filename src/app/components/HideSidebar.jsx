"use client";
import hideSidebarEyeClose from '../../images/icon-hide-sidebar.svg';
import Image from 'next/image';
import styles from '../page.module.css';
import useStore from '@/zustand/store';

const HideSidebar = () => {
  const [isHidden, updateHidden] = useStore((state) => 
  [state.isHidden, state.updateHidden]
  );
  return (
    <div className={styles.hideSidebar}>
      <div className={styles.sidebarContentHide}>

      <button
        type='button'
        onClick={() => updateHidden(!isHidden)}
        className={styles.buttonHideSidebar}
      >
        <Image src={hideSidebarEyeClose} alt="Hide Sidebar" width={20} height={20} priority />
        <p>Hide Sidebar</p>
      </button>

      </div>

    </div>
  )
};

export default HideSidebar;