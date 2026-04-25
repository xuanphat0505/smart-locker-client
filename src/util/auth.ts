import {EUserRole} from '@/types/user.types'

export const CUSTOMER_LOGIN_PATH = '/customer/login'
export const SHIPPER_LOGIN_PATH = '/shipper/login'
export const CUSTOMER_HOME_PATH = '/customer'
export const SHIPPER_HOME_PATH = '/shipper'

export function getRoleFromPath(pathname: string): EUserRole {
    return pathname.startsWith('/shipper') ? EUserRole.shipper : EUserRole.user
}

export function getDefaultLoginPath(role: EUserRole): string {
    return role === EUserRole.shipper ? SHIPPER_LOGIN_PATH : CUSTOMER_LOGIN_PATH
}

export function getDefaultRegisterPath(role: EUserRole): string {
    return role === EUserRole.shipper ? '/shipper/register' : '/customer/register'
}

export function getHomePathByRole(role: EUserRole): string {
    return role === EUserRole.shipper ? SHIPPER_HOME_PATH : CUSTOMER_HOME_PATH
}
