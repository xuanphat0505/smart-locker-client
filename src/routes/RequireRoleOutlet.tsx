import {useEffect, useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAuthStore} from '@/store/useAuthStore'
import {EUserRole} from '@/types/user.types'
import {getHomePathByRole} from "@/util/auth.ts";

type Props = {
    allowedRole: EUserRole
    loginPath: string
}

export function RequireRoleOutlet({allowedRole, loginPath}: Props) {
    const user = useAuthStore((s) => s.user)
    const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated())

    useEffect(() => {
        if (hydrated) return
        const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true))
        return unsub
    }, [hydrated])

    if (!hydrated) {
        return null
    }

    if (!user) {
        return <Navigate to={loginPath} replace/>
    }

    if (user.role !== allowedRole) {
        return <Navigate to={getHomePathByRole(user.role)} replace/>
    }

    return <Outlet/>
}
