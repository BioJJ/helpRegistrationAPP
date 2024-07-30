import { configureStore } from '@reduxjs/toolkit'

import globalReducer from './reducers/globalReducer'

import userReducer from './reducers/userReducer'
import ActivityReducer from './reducers/activityReducer'

export const store = configureStore({
	reducer: {
		globalReducer,
		userReducer,
		ActivityReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export default store
