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

const router = createBrowserRouter([
    {path: '/', element: <RoleSelection/>},

    {path: '/shipper/login', element: <AuthPage/>},
    {path: '/shipper/register', element: <AuthPage/>},
    {path: '/shipper', element: <SelectLocker/>},
    {path: '/shipper/package-info', element: <PackageInfo/>},
    {path: '/shipper/success', element: <Success/>},

    {path: '/customer/login', element: <AuthPage/>},
    {path: '/customer/register', element: <AuthPage/>},
    {
        path: '/customer',
        element: <CustomerLayout/>,
        children: [
            {index: true, element: <CustomerHome/>},
            {path: 'open-locker', element: <OpenLocker/>},
            {path: 'open-success', element: <OpenSuccess/>},
            {path: 'history', element: <History/>},
            {path: 'profile', element: <Profile/>},
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router}/>
}