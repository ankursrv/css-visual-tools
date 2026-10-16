// ============================================================
// Shared TypeScript types and interfaces for the application.
// Add domain-specific types in separate files (e.g., account.types.ts).
// ============================================================

// ------------------------------------
// Utility types
// ------------------------------------

/** Makes all properties of T optional and nullable */
export type Nullable<T> = T | null;

/** Extracts the resolved value type from a Promise */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// ------------------------------------
// API types
// ------------------------------------

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// ------------------------------------
// Component types
// ------------------------------------

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

// ------------------------------------
// Navigation types
// ------------------------------------

export interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}
