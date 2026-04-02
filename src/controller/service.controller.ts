import { ApiPath } from '../types/service.enum'
import qs from 'qs'

class ApiService {
    private _token: string | undefined
    private baseUrl = 'http://localhost:5000/api'

    set token(t: string | undefined) {
        this._token = t
    }

    get token() {
        return this._token
    }

    async postRequest<T>(path: ApiPath, data: unknown): Promise<T> {
        const url = this.baseUrl + path
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(this._token ? { Authorization: 'Bearer ' + this._token } : {}),
            },
            body: JSON.stringify(data),
        })
        const json = await response.json()
        return json as T
    }

    async getRequest<T>(path: ApiPath, queryObject?: unknown): Promise<T> {
        let queryString = ''
        if (queryObject) {
            queryString = '?' + qs.stringify(queryObject)
        }
        const url = this.baseUrl + path + queryString
        const response = await fetch(url, {
            headers: {
                ...(this._token ? { Authorization: 'Bearer ' + this._token } : {}),
            },
        })
        const json = await response.json()
        return json as T
    }
}

export const apiService = new ApiService()