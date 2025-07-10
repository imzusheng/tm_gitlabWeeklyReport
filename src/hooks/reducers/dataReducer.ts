import {
  GitLabEvent,
  FilterConditions,
  SortOptions,
  PaginationOptions,
  GitLabProject,
  ChangelogFilterConditions,
} from '@/types'
import {
  DEFAULT_FILTER_CONDITIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from '@/constants'

export interface DataState {
  events: GitLabEvent[]
  totalCount: number
  filterConditions: FilterConditions
  sortOptions: SortOptions
  paginationOptions: PaginationOptions
  projects: GitLabProject[]
  selectedProjectId: number | null
  eventsSelectedIds: number[]
  changelogState: {
    selectedEventIds: number[]
    isAllEventsSelected: boolean
    totalCount: number
    events: GitLabEvent[]
  }
  changelogFilterConditions: ChangelogFilterConditions
  aiGenerationConfig: {
    taskType: 'weekly-report' | 'changelog'
    prompt: string
    tokensUsed: number
    result: string
  } | null
}

export type DataAction =
  | {
      type: 'SET_EVENTS'
      payload: { events: GitLabEvent[]; totalCount: number }
    }
  | { type: 'SET_FILTER_CONDITIONS'; payload: FilterConditions }
  | { type: 'SET_SORT_OPTIONS'; payload: SortOptions }
  | { type: 'SET_PAGINATION_OPTIONS'; payload: Partial<PaginationOptions> }
  | { type: 'SET_PROJECTS'; payload: GitLabProject[] }
  | { type: 'SET_SELECTED_PROJECT'; payload: number | null }
  | {
      type: 'SET_EVENTS_SELECTED_IDS'
      payload: number[] | ((prev: number[]) => number[])
    }
  | {
      type: 'SET_CHANGELOG_STATE'
      payload: Partial<DataState['changelogState']>
    }
  | {
      type: 'SET_CHANGELOG_FILTER_CONDITIONS'
      payload: ChangelogFilterConditions
    }
  | {
      type: 'SET_AI_GENERATION_CONFIG'
      payload: DataState['aiGenerationConfig']
    }
  | { type: 'RESET_SELECTION' }
  | { type: 'RESET_DATA' }

export const dataReducer = (
  state: DataState,
  action: DataAction,
): DataState => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload.events,
        totalCount: action.payload.totalCount,
        paginationOptions: {
          ...state.paginationOptions,
          total: action.payload.totalCount,
        },
      }

    case 'SET_FILTER_CONDITIONS':
      return {
        ...state,
        filterConditions: action.payload,
        paginationOptions: { ...state.paginationOptions, page: 1 },
      }

    case 'SET_SORT_OPTIONS':
      return { ...state, sortOptions: action.payload }

    case 'SET_PAGINATION_OPTIONS':
      return {
        ...state,
        paginationOptions: { ...state.paginationOptions, ...action.payload },
      }

    case 'SET_PROJECTS':
      return { ...state, projects: action.payload }

    case 'SET_SELECTED_PROJECT':
      return { ...state, selectedProjectId: action.payload }

    case 'SET_EVENTS_SELECTED_IDS': {
      const newIds =
        typeof action.payload === 'function'
          ? action.payload(state.eventsSelectedIds)
          : action.payload
      return { ...state, eventsSelectedIds: newIds }
    }

    case 'SET_CHANGELOG_STATE':
      return {
        ...state,
        changelogState: { ...state.changelogState, ...action.payload },
      }

    case 'SET_CHANGELOG_FILTER_CONDITIONS':
      return {
        ...state,
        changelogFilterConditions: action.payload,
      }

    case 'SET_AI_GENERATION_CONFIG':
      return { ...state, aiGenerationConfig: action.payload }

    case 'RESET_SELECTION':
      return {
        ...state,
        eventsSelectedIds: [],
        changelogState: {
          ...state.changelogState,
          selectedEventIds: [],
          isAllEventsSelected: false,
        },
      }

    case 'RESET_DATA':
      return {
        ...state,
        events: [],
        totalCount: 0,
        projects: [],
        selectedProjectId: null,
        eventsSelectedIds: [],
        changelogState: {
          selectedEventIds: [],
          isAllEventsSelected: false,
          totalCount: 0,
          events: [],
        },
        aiGenerationConfig: null,
      }

    default:
      return state
  }
}

// 默认的Changelog筛选条件
const getDefaultChangelogFilterConditions = (): ChangelogFilterConditions => {
  const today = new Date()
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return {
    startDate: oneWeekAgo.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    actionTypes: [],
    targetTypes: [],
  }
}

export const initialDataState: DataState = {
  events: [],
  totalCount: 0,
  filterConditions: DEFAULT_FILTER_CONDITIONS,
  sortOptions: DEFAULT_SORT_OPTIONS,
  paginationOptions: DEFAULT_PAGINATION_OPTIONS,
  projects: [],
  selectedProjectId: null,
  eventsSelectedIds: [],
  changelogState: {
    selectedEventIds: [],
    isAllEventsSelected: false,
    totalCount: 0,
    events: [],
  },
  changelogFilterConditions: getDefaultChangelogFilterConditions(),
  aiGenerationConfig: null,
}
