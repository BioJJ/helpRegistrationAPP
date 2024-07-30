import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Activity } from '../../../types/Activity'

interface ActivityState {
	activities: Activity[]
	activity: Activity
}

const initialState: ActivityState = {
	activities: [],
	activity: {
		collaborator: undefined,
		priority: undefined,
		status: undefined,
		title: '',
		description: ''
	}
}

export const counterSlice = createSlice({
	name: 'activityReducer',
	initialState,
	reducers: {
		setActivitiesAction: (state, action: PayloadAction<Activity[]>) => {
			state.activities = action.payload
		},
		setActivityAction: (state, action: PayloadAction<Activity>) => {
			state.activity = action.payload
		}
	}
})

export const { setActivityAction, setActivitiesAction } = counterSlice.actions

export default counterSlice.reducer
