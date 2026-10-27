'use client'
import { useProfileStore } from '@/lib/store/historyPageStore';
import css from './ProfileTabs.module.css';

export default function ProfileTabs(){
    const { currentTab, setTab } = useProfileStore();
    
    return(
        <div className={css.profileHistoryButtonsWrapper}>
            <button 
                type='button' 
                onClick={() => setTab('saved-history')} 
                className={`${css.profileHistoryButtons} ${css.profileHistoryButtonLeft} ${currentTab === 'saved-history' ? css.activeBtn : ''}`}
            >
                Збережені історії
            </button>
            <button 
                type='button' 
                onClick={() => setTab('my-posted-history')} 
                className={`${css.profileHistoryButtons} ${css.profileHistoryButtonRight} ${currentTab === 'my-posted-history' ? css.activeBtn : ''}`}
            >
                Мої історії
            </button>
        </div>
    );
}