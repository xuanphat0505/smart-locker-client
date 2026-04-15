import {ApiPath} from '../types/service.enum'
import qs from 'qs'

class ApiService {
    private _token: string | undefined
    private readonly baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

    set token(t: string | undefined) {
        this._token = t
    }

    get token() {
        return this._token
    }


    private buildHeaders(isFormData = false): HeadersInit {
        return {
            ...(!isFormData && {'Content-Type': 'application/json'}),
            ...(this._token && {Authorization: `Bearer ${this._token}`}),
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            let serverMessage = response.statusText
            try {
                const errBody = await response.json()
                serverMessage = errBody?.message ?? errBody?.error ?? serverMessage
            } catch {
            }
            throw new Error(`[${response.status}] ${serverMessage}`)
        }
        return response.json() as Promise<T>
    }


    async get<T>(path: ApiPath, queryObject?: unknown): Promise<T> {
        const query = queryObject ? '?' + qs.stringify(queryObject) : ''
        const response = await fetch(this.baseUrl + path + query, {
            method: 'GET',
            headers: this.buildHeaders(),
        })
        return this.handleResponse<T>(response)
    }

    async post<T>(path: ApiPath, data: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: 'POST',
            headers: this.buildHeaders(),
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async put<T>(path: ApiPath, data: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: 'PUT',
            headers: this.buildHeaders(),
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async patch<T>(path: ApiPath, data: unknown): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: 'PATCH',
            headers: this.buildHeaders(),
            body: JSON.stringify(data),
        })
        return this.handleResponse<T>(response)
    }

    async delete<T>(path: ApiPath): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: 'DELETE',
            headers: this.buildHeaders(),
        })
        return this.handleResponse<T>(response)
    }

    async upload<T>(path: ApiPath, formData: FormData): Promise<T> {
        const response = await fetch(this.baseUrl + path, {
            method: 'POST',
            headers: this.buildHeaders(true),
            body: formData,
        })
        return this.handleResponse<T>(response)
    }
}

export const apiService = new ApiService()