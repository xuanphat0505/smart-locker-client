import {EUserRole} from '@/types/user.types'
import type {TAuthResponse, TAuthSigninRequestParam} from '@/types/auth.service.types'

const MOCK_PASSWORD = '123456'

const MOCK_USERS = [
    {
        id: 'mock-shipper-001',
        name: 'Mock Shipper',
        email: 'shipper@smartlocker.dev',
        phone: '0900000001',
        role: EUserRole.shipper,
        token: 'mock-token-shipper',
    },
    {
        id: 'mock-customer-001',
        name: 'Mock Customer',
        email: 'customer@smartlocker.dev',
        phone: '0900000002',
        role: EUserRole.user,
        token: 'mock-token-customer',
    },
]

export function mockSignIn(params: TAuthSigninRequestParam): TAuthResponse {
    const user = MOCK_USERS.find(
        (item) =>
            item.email.toLowerCase() === params.email.trim().toLowerCase() &&
            item.role === params.role,
    )

    if (!user || params.password !== MOCK_PASSWORD) {
        return {
            success: false,
            token: '',
            user: {
                id: '',
                name: '',
                email: '',
                role: params.role,
            },
            message: 'Tài khoản, mật khẩu hoặc vai trò không đúng',
        }
    }

    return {
        success: true,
        token: user.token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
        message: 'Đăng nhập mock thành công',
    }
}

export {MOCK_PASSWORD, MOCK_USERS}
