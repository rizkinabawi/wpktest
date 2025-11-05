import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { apiClient } from '../api-client'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await apiClient.login(email, password)
          
          if (response.success && response.data) {
            const { user, token } = response.data
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            })
            // simpan ke localStorage secara eksplisit juga
            localStorage.setItem('auth-user', JSON.stringify(user))
            localStorage.setItem('auth-token', token)
            localStorage.setItem('auth-isAuthenticated', 'true')
            return { success: true }
          } else {
            set({ isLoading: false })
            return {
              success: false,
              error: response.error?.message || 'ログインに失敗しました',
            }
          }
        } catch (error) {
          set({ isLoading: false })
          return {
            success: false,
            error: 'ネットワークエラーが発生しました',
          }
        }
      },

      logout: async () => {
        await apiClient.logout()
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
        // hapus dari localStorage juga
        localStorage.removeItem('auth-user')
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-isAuthenticated')
      },

      checkAuth: async () => {
        // cek dari localStorage dulu
        const localUser = localStorage.getItem('auth-user')
        const localToken = localStorage.getItem('auth-token')
        const localAuth = localStorage.getItem('auth-isAuthenticated') === 'true'

        if (localUser && localToken && localAuth) {
          set({
            user: JSON.parse(localUser),
            token: localToken,
            isAuthenticated: true,
          })
          return
        }

        const token = get().token
        if (!token) {
          set({ isAuthenticated: false, user: null })
          return
        }

        try {
          const response = await apiClient.getMe()
          if (response.success && response.data) {
            set({
              user: response.data,
              isAuthenticated: true,
            })
          } else {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
            })
          }
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },

      setUser: (user: User | null) => {
        set({ user })
        if (user) {
          localStorage.setItem('auth-user', JSON.stringify(user))
        } else {
          localStorage.removeItem('auth-user')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
