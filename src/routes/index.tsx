import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {RoleSelection} from '@/pages/Roleselection'
import {AuthPage} from '@/pages/AuthPages'

import {SelectLocker} from '@/pages/Shipper/SelectLocker'
import {PackageInfo} from '@/pages/Shipper/PackageInfo'
import {Success} from '@/pages/Shipper/Success'

import {CustomerLayout} from '@/components/Customer/CustomerLayout' // ← thêm
import {CustomerHome} from '@/pages/Customer/Home/Home.tsx'
import {OpenLocker} from '@/pages/Customer/OpenLocker/OpenLocker.tsx'
import {OpenSuccess} from '@/pages/Customer/OpenSuccess/OpenSuccess.tsx'
import {History} from '@/pages/Customer/History/History.tsx'
import {Profile} from '@/pages/Customer/Profile/Profile.tsx'
import {PersonalInfo} from "@/pages/Customer/Profile/PersonalInfo";
import {ChangePassword} from "@/pages/Customer/Profile/Changepassword";
import {Notifications} from "@/pages/Customer/Profile/Notifications";
import {AppRating} from "@/pages/Customer/Profile/Apprating";
import {UserGuide} from "@/pages/Customer/Profile/Userguide/Userguide.tsx";
import {ContactSupport} from "@/pages/Customer/Profile/Contactsupport/Contactsupport.tsx";
import {ChatAI} from "@/pages/Customer/ChatAi/ChatAI.tsx";
import TermsOfService from "@/components/shared/RegisterForm/TermsOfService";
import PrivacyPolicy from "@/components/shared/RegisterForm/PrivacyPolicy";

const router = createBrowserRouter([
    {path: '/', element: <RoleSelection/>},

    {path: '/shipper/login', element: <AuthPage/>},
    {path: '/shipper/register', element: <AuthPage/>},
    {path: '/shipper', element: <SelectLocker/>},
    {path: '/shipper/package-info', element: <PackageInfo/>},
    {path: '/shipper/success', element: <Success/>},

    {path: '/customer/login', element: <AuthPage/>},
    {path: '/customer/register', element: <AuthPage/>},
    {path: '/terms-of-service', element: <TermsOfService/>},
    {path: '/privacy-policy', element: <PrivacyPolicy/>},
    {
        path: '/customer',
        element: <CustomerLayout/>,
        children: [
            {index: true, element: <CustomerHome/>},
            {path: 'open-locker', element: <OpenLocker/>},
            {path: 'open-success', element: <OpenSuccess/>},
            {path: 'history', element: <History/>},
            {path: 'chat-ai', element: <ChatAI/>},
            {path: 'profile', element: <Profile/>},
            {path: '/customer/profile/personal-info', element: <PersonalInfo/>},
            {path: 'profile/change-password', element: <ChangePassword/>},
            {path: 'profile/notifications', element: <Notifications/>},
            {path: 'profile/app-rating', element: <AppRating/>},
            {path: 'profile/user-guide', element: <UserGuide/>},
            {path: 'profile/contact', element: <ContactSupport/>},
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router}/>
}