export interface FormUploadState<T> {
  loading: boolean
  loaded?: T | boolean
  error: Error
}

export enum FormInitialization {
  CLEAR = 'CLEAR',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  RESET = 'RESET',
  ERROR = 'ERROR',
}

export enum FormType {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
}

export enum FormAction {
  ADD = 'Add',
  EDIT = 'Edit',
}
