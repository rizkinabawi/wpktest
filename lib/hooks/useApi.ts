import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../api-client'
import { toast } from 'sonner'

// News hooks
export function useNews(params?: { page?: number; limit?: number; status?: string; category?: string }) {
  return useQuery({
    queryKey: ['news', params],
    queryFn: async () => {
      const response = await apiClient.getNews(params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch news')
      }
      return response.data
    },
  })
}

export function useNewsById(id: string) {
  return useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const response = await apiClient.getNewsById(id)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch news')
      }
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateNews() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.createNews(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to create news')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      toast.success('お知らせを作成しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateNews() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.updateNews(id, data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update news')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      toast.success('お知らせを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteNews() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.deleteNews(id)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete news')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      toast.success('お知らせを削除しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Services hooks
export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await apiClient.getServices()
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch services')
      }
      return response.data
    },
  })
}

export function useCreateService() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.createService(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to create service')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('サービスを作成しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateService() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.updateService(id, data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update service')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('サービスを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteService() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.deleteService(id)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete service')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      toast.success('サービスを削除しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Inquiries hooks
export function useInquiries(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['inquiries', params],
    queryFn: async () => {
      const response = await apiClient.getInquiries(params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch inquiries')
      }
      return response.data
    },
  })
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.createInquiry(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to create inquiry')
      }
      return response.data
    },
    onSuccess: () => {
      toast.success('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiClient.updateInquiryStatus(id, status)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update inquiry status')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('ステータスを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Applications hooks
export function useApplications(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: async () => {
      const response = await apiClient.getApplications(params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch applications')
      }
      return response.data
    },
  })
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiClient.createApplication(formData)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to create application')
      }
      return response.data
    },
    onSuccess: () => {
      toast.success('応募を受け付けました。ご応募ありがとうございます。')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await apiClient.updateApplicationStatus(id, status)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update application status')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      toast.success('ステータスを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Job Positions hooks
export function useJobPositions(params?: { status?: string; limit?: number; page?: number }) {
  return useQuery({
    queryKey: ['job-positions', params],
    queryFn: async () => {
      const response = await apiClient.getJobPositions(params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch job positions')
      }
      return response.data
    },
  })
}

export function useJobPositionById(id: string) {
  return useQuery({
    queryKey: ['job-positions', id],
    queryFn: async () => {
      const response = await apiClient.getJobPositionById(id)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch job position')
      }
      return response.data
    },
    enabled: !!id,
  })
}

export function useCreateJobPosition() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.createJobPosition(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to create job position')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] })
      toast.success('求人情報を作成しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateJobPosition() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.updateJobPosition(id, data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update job position')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] })
      toast.success('求人情報を更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useDeleteJobPosition() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.deleteJobPosition(id)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to delete job position')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-positions'] })
      toast.success('求人情報を削除しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Dashboard hooks
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await apiClient.getDashboardStats()
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch dashboard stats')
      }
      return response.data
    },
  })
}

export function useDashboardRecent() {
  return useQuery({
    queryKey: ['dashboard', 'recent'],
    queryFn: async () => {
      const response = await apiClient.getDashboardRecent()
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch recent activities')
      }
      return response.data
    },
  })
}

// Settings hooks
export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await apiClient.getSettings()
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch settings')
      }
      return response.data
    },
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.updateSettings(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update settings')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] })
      toast.success('設定を更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
      const response = await apiClient.updatePassword(data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update password')
      }
      return response.data
    },
    onSuccess: () => {
      toast.success('パスワードを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Homepage Sections hooks
export function useHomepageSections(params?: { visible?: boolean }) {
  return useQuery({
    queryKey: ['homepage-sections', params],
    queryFn: async () => {
      const queryParams = params?.visible ? { visible: 'true' } : {}
      const response = await apiClient.get('/homepage-sections', queryParams)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch homepage sections')
      }
      return response.data
    },
  })
}

export function useHomepageSectionById(sectionId: string) {
  return useQuery({
    queryKey: ['homepage-section', sectionId],
    queryFn: async () => {
      const response = await apiClient.get(`/homepage-sections/${sectionId}`)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch homepage section')
      }
      return response.data
    },
    enabled: !!sectionId,
  })
}

export function useUpdateHomepageSection() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ sectionId, data }: { sectionId: string; data: any }) => {
      const response = await apiClient.put(`/homepage-sections/${sectionId}`, data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update homepage section')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-sections'] })
      queryClient.invalidateQueries({ queryKey: ['homepage-section'] })
      toast.success('セクションを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useUpdateAllHomepageSections() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { sections: any[] }) => {
      const response = await apiClient.put('/homepage-sections', data)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to update homepage sections')
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage-sections'] })
      toast.success('ホームページを更新しました')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

// Equipment hooks
export function useEquipment(params?: { category?: string; status?: string; limit?: number }) {
  return useQuery({
    queryKey: ['equipment', params],
    queryFn: async () => {
      const response = await apiClient.get('/equipment', params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch equipment')
      }
      return response.data
    },
  })
}

export function useCreateEquipment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/equipment', data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to create equipment')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
      toast.success('設備を作成しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateEquipment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/equipment/${id}`, data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to update equipment')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
      toast.success('設備を更新しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteEquipment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/equipment/${id}`)
      if (!response.success) throw new Error(response.error?.message || 'Failed to delete equipment')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] })
      toast.success('設備を削除しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

// Sample Products hooks
export function useSampleProducts(params?: { category?: string; status?: string; limit?: number }) {
  return useQuery({
    queryKey: ['sample-products', params],
    queryFn: async () => {
      const response = await apiClient.get('/sample-products', params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch sample products')
      }
      return response.data
    },
  })
}

export function useCreateSampleProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/sample-products', data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to create sample product')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sample-products'] })
      toast.success('サンプル製品を作成しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateSampleProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/sample-products/${id}`, data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to update sample product')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sample-products'] })
      toast.success('サンプル製品を更新しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteSampleProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/sample-products/${id}`)
      if (!response.success) throw new Error(response.error?.message || 'Failed to delete sample product')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sample-products'] })
      toast.success('サンプル製品を削除しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

// Events hooks
export function useEvents(params?: { status?: string; isPublic?: boolean; limit?: number }) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: async () => {
      const response = await apiClient.get('/events', params)
      if (!response.success) {
        throw new Error(response.error?.message || 'Failed to fetch events')
      }
      return response.data
    },
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/events', data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to create event')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      toast.success('イベントを作成しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/events/${id}`, data)
      if (!response.success) throw new Error(response.error?.message || 'Failed to update event')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      toast.success('イベントを更新しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/events/${id}`)
      if (!response.success) throw new Error(response.error?.message || 'Failed to delete event')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      toast.success('イベントを削除しました')
    },
    onError: (error: Error) => toast.error(error.message),
  })
}

