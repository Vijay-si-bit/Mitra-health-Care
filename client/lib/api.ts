// API utility functions
import { ApiResponse, PaginatedResponse } from "./types";

const API_BASE = "/api";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Generic CRUD operations
export const api = {
  // GET request
  get: <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, { method: "GET" }),

  // POST request
  post: <T>(endpoint: string, data?: any): Promise<T> =>
    request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // PUT request
  put: <T>(endpoint: string, data?: any): Promise<T> =>
    request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // PATCH request
  patch: <T>(endpoint: string, data?: any): Promise<T> =>
    request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    }),

  // DELETE request
  delete: <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, { method: "DELETE" }),
};

// Specific API endpoints
export const endpoints = {
  // Health check
  ping: () => api.get<{ message: string }>("/ping"),
  
  // Demo endpoint
  demo: () => api.get<{ message: string; timestamp: string }>("/demo"),
  
  // Test endpoint with data
  test: (data?: any) => api.post<{ success: boolean; method: string; timestamp: string }>("/test", data),

  // User management
  users: {
    list: () => api.get<ApiResponse<any[]>>("/users"),
    get: (id: string) => api.get<ApiResponse<any>>(`/users/${id}`),
    create: (data: any) => api.post<ApiResponse<any>>("/users", data),
    update: (id: string, data: any) => api.put<ApiResponse<any>>(`/users/${id}`, data),
    delete: (id: string) => api.delete<ApiResponse<void>>(`/users/${id}`),
  },

  // Student management
  students: {
    list: () => api.get<ApiResponse<any[]>>("/students"),
    get: (id: string) => api.get<ApiResponse<any>>(`/students/${id}`),
    create: (data: any) => api.post<ApiResponse<any>>("/students", data),
    update: (id: string, data: any) => api.put<ApiResponse<any>>(`/students/${id}`, data),
    delete: (id: string) => api.delete<ApiResponse<void>>(`/students/${id}`),
  },

  // Mood tracking
  moods: {
    list: (studentId: string) => api.get<ApiResponse<any[]>>(`/students/${studentId}/moods`),
    create: (studentId: string, data: any) => api.post<ApiResponse<any>>(`/students/${studentId}/moods`, data),
    get: (studentId: string, moodId: string) => api.get<ApiResponse<any>>(`/students/${studentId}/moods/${moodId}`),
  },

  // Risk assessments
  risks: {
    list: (studentId: string) => api.get<ApiResponse<any[]>>(`/students/${studentId}/risks`),
    latest: (studentId: string) => api.get<ApiResponse<any>>(`/students/${studentId}/risks/latest`),
    create: (studentId: string, data: any) => api.post<ApiResponse<any>>(`/students/${studentId}/risks`, data),
  },

  // Chat sessions
  chat: {
    sessions: (studentId: string) => api.get<ApiResponse<any[]>>(`/students/${studentId}/chat/sessions`),
    create: (studentId: string) => api.post<ApiResponse<any>>(`/students/${studentId}/chat/sessions`),
    messages: (sessionId: string) => api.get<ApiResponse<any[]>>(`/chat/sessions/${sessionId}/messages`),
    sendMessage: (sessionId: string, data: any) => api.post<ApiResponse<any>>(`/chat/sessions/${sessionId}/messages`, data),
  },

  // Analytics
  analytics: {
    dashboard: (studentId: string, period: string) => api.get<ApiResponse<any>>(`/analytics/dashboard/${studentId}?period=${period}`),
    trends: (studentId: string, type: string) => api.get<ApiResponse<any>>(`/analytics/trends/${studentId}?type=${type}`),
    reports: (studentId: string) => api.get<ApiResponse<any>>(`/analytics/reports/${studentId}`),
  },

  // Notifications
  notifications: {
    list: () => api.get<ApiResponse<any[]>>("/notifications"),
    markRead: (id: string) => api.patch<ApiResponse<void>>(`/notifications/${id}/read`),
    markAllRead: () => api.patch<ApiResponse<void>>("/notifications/read-all"),
  },

  // Crisis support
  crisis: {
    contacts: () => api.get<ApiResponse<any[]>>("/crisis/contacts"),
    alert: (data: any) => api.post<ApiResponse<any>>("/crisis/alert", data),
  },

  // Coaching resources
  coaching: {
    resources: () => api.get<ApiResponse<any[]>>("/coaching/resources"),
    getResource: (id: string) => api.get<ApiResponse<any>>(`/coaching/resources/${id}`),
  },
};

export { ApiError };
