export type TApiResponse<T> = {
    success:  boolean
    data?:    T
    message?: string
    error?:   string
}