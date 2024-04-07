import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

// this page have differents tabs (for admin)
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) setTab(tabFromUrl)
  }, [location.search])

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* right side */}
      {tab === 'profile' && <DashProfile />}
    </div>
  )
}