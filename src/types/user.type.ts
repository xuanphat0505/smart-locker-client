export enum EUserRole {
    shipper = 'SHIPPER',
    user    = 'USER',
}

export type TUserInfo = {
    id:    string
    name:  string
    email: string
    phone?: string
    role:  EUserRole
    token: string
}