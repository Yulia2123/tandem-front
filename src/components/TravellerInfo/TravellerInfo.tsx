'use client'
import { useQuery } from '@tanstack/react-query'
import css from './TravellerInfo.module.css'
import Image from 'next/image'
import { getCurrentUser } from '@/lib/api/users'
import { useProfileStore } from '@/lib/store/historyPageStore'
export default function TravellerInfo(){
      const { currentTab } = useProfileStore();
      const isSavedTab = currentTab === 'saved-history';
    const {data, isError} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser
    })
    if(!data || isError){
        return <p className={css.errorMessage}>Помилка завантаження інформації про користувача.</p>
    }
    return(
        <div className={css.profileAbout}>
                    <div></div>
                    <div className={css.profileAboutAvatar}>
                        <Image src={data.avatarUrl} alt='Your avatar' fill className={css.profileAboutAvatarImg}></Image>
                    </div>
                    <div className={css.profileAboutWrapper}>
                        <p>{data.name}</p>
                        <p>Статей: {isSavedTab ? data.Article.length : data.articlesAmount}</p>
                    </div>
                </div>
    )
}