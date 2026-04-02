import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {RoleSelection} from '@/pages/Roleselection'
import {AuthPage} from "@/pages/AuthPages";

type Props = {
    title: string
}

export function PlaceholderPage({title}: Props) {
    return (
        <div className="page" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
            color: 'var(--text-muted)'
        }}>
            <p style={{fontWeight: 700}}>{title}</p>
            <p style={{fontSize: 13}}>đợi tí chill chưa làm xong</p>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <RoleSelection />,
    },
    {
        path: '/shipper/login',
        element: <AuthPage />,
    },
    {
        path: '/shipper/register',
        element: <AuthPage />,
    },
    {
        path: '/shipper/*',
        element: <PlaceholderPage title="Shipper Dashboard" />,
    },


    {
        path: '/customer/login',
        element: <AuthPage />,
    },
    {
        path: '/customer/register',
        element: <AuthPage />,
    },
    {
        path: '/customer/*',
        element: <PlaceholderPage title="Khách hàng Dashboard" />,
    },
]);

export function AppRouter() {
    return (
    <RouterProvider router={router}/>
    )
}