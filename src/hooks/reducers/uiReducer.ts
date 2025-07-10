import { PanelType, AppMode, GitLabEvent } from '@/types'

export interface UIState {
  isLoading: boolean
  error: string | null
  activePanel: PanelType
  appMode: AppMode
  theme: 'light' | 'dark' | 'system'
  selectedEvent: GitLabEvent | null
  isDetailModalVisible: boolean
}

export type UIAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ACTIVE_PANEL'; payload: PanelType }
  | { type: 'SET_APP_MODE'; payload: AppMode }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'SHOW_EVENT_DETAIL'; payload: GitLabEvent }
  | { type: 'HIDE_EVENT_DETAIL' }
  | { type: 'RESET_UI' }

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_ERROR':
      return { ...state, error: action.payload }

    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.payload }

    case 'SET_APP_MODE':
      return { ...state, appMode: action.payload }

    case 'SET_THEME':
      return { ...state, theme: action.payload }

    case 'SHOW_EVENT_DETAIL':
      return {
        ...state,
        selectedEvent: action.payload,
        isDetailModalVisible: true,
      }

    case 'HIDE_EVENT_DETAIL':
      return {
        ...state,
        selectedEvent: null,
        isDetailModalVisible: false,
      }

    case 'RESET_UI':
      return {
        ...state,
        isLoading: false,
        error: null,
        selectedEvent: null,
        isDetailModalVisible: false,
      }

    default:
      return state
  }
}

export const initialUIState: UIState = {
  isLoading: false,
  error: null,
  activePanel: 'main',
  appMode: 'events',
  theme: 'system',
  selectedEvent: null,
  isDetailModalVisible: false,
}
