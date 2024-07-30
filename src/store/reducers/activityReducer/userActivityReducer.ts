import { useDispatch } from 'react-redux'

import { Activity } from '../../../types/Activity'
import { useAppSelector } from '../../hooks'
import { setActivityAction, setActivitiesAction } from '.'

export const useActivityReducer = () => {
	const dispatch = useDispatch()
	const { activities, activity } = useAppSelector(
		(state) => state.ActivityReducer
	)

	const setActivities = (activity: Activity[]) => {
		dispatch(setActivitiesAction(activity))
	}
	const setActivity = (activity: Activity) => {
		dispatch(setActivityAction(activity))
	}

	return {
		activities,
		setActivities,
		setActivity,
		activity
	}
}
