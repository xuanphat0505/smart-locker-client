import{EUserRole} from "@/types/user.type.ts";

export type TAuthSigninRequestParam = {
    email:    string
    password: string
    role:     EUserRole
}

export type TAuthSignupRequestParam = {
    name:     string
    email:    string
    password: string
    phone?:   string
    role:     EUserRole
}

export type TAuthResponse = {
    success:  boolean
    token:    string
    user: {
        id:     string
        name:   string
        email:  string
        phone?: string
        role:   EUserRole
    }
    message?: string
}