
// 'use client'
// import { useProfileStore } from '@/lib/store/historyPageStore';
// import css from './ProfileTabs.module.css';

// export default function ProfileTabs(){
//     const { currentTab, setTab } = useProfileStore();
    
//     return(
//         <div className={css.profileHistoryButtonsWrapper}>
//             <button 
//                 type='button' 
//                 onClick={() => setTab('saved-history')} 
//                 className={`${css.profileHistoryButtons} ${css.profileHistoryButtonLeft} ${currentTab === 'saved-history' ? css.activeBtn : ''}`}
//             >
//                 Збережені історії
//             </button>
//             <button 
//                 type='button' 
//                 onClick={() => setTab('my-posted-history')} 
//                 className={`${css.profileHistoryButtons} ${css.profileHistoryButtonRight} ${currentTab === 'my-posted-history' ? css.activeBtn : ''}`}
//             >
//                 Мої історії
//             </button>
//         </div>
//     );
// }


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './ProfileTabs.module.css';

const TABS = [
  {
    href: '/profile/saved',
    label: 'Збережені історії',
  },
  {
    href: '/profile/my-stories',
    label: 'Мої історії',
  },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className={styles.tabs} aria-label="Історії профілю">
      {TABS.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={
              isActive ? styles.tabActive : styles.tab
            }
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

