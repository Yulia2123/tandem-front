import css from './ProfilePage.module.css'
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo'
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs'
import ProfilePageClient from './ProfilePage.client'
export default async function ProfilePage() {
    return (
        <main className={css.profileMain}>
            <div className='container'>
                <TravellerInfo />
                <div className={css.profileHistoryContentWrapper}>
                    <ProfileTabs />
                    <div className={css.profileHistoryContent}> 
                        <ProfilePageClient/>
                    </div>
                </div>

            </div>
        </main>
    )

}