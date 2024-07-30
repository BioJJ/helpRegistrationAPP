import { RouteObject } from 'react-router-dom'

import List from './List'
import Form from './forms'

export enum ActivityRoutesEnum {
	LIST = '/list/activity',
	ACTIVITY_INSERT = '/activity/created',
	ACTIVITY_EDIT = '/activity/:activityId'
}

export const listActivity: RouteObject[] = [
	{
		path: ActivityRoutesEnum.LIST,
		element: <List />
	},
	{
		path: ActivityRoutesEnum.ACTIVITY_INSERT,
		element: <Form />
	},
	{
		path: ActivityRoutesEnum.ACTIVITY_EDIT,
		element: <Form />
	}
]
