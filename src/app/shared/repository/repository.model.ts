import { PaginationRequest } from '../model/pagination.model'

export type RepositoryEntityStatus = 'active' | 'archived'

export interface RepositoryEntityRef {
  id: string
  timestamp?: Date
  updated?: Date
}

export interface RepositoryResponseEntity {
  id: string
}

export interface RepositoryResponseList<T> {
  data?: T[]
  total?: number
  current?: number
}

export type RepositoryResponseCategory = 'create' | 'edit' | 'list' | 'detail' | 'status' | 'log'

export type RepositoryRequestQuery = 'first' | 'next' | 'previous' | 'custom'

export type RepositoryRequestOrder = 'desc' | 'asc'

export interface RepositoryRequest<T, S> {
  query: RepositoryRequestQuery
  pagination: PaginationRequest<T>
  filter: FilterRequest<S>
  order: OrderRequest
}

export interface FilterRequest<S> {
  status: S
  field: FilterField
}

export interface OrderRequest {
  key: string
  value: RepositoryRequestOrder
}

export interface FilterField {
  key: string
  value: string
}

export interface Log<T> {
  item: T
  id: string
  timestamp: Date
}
