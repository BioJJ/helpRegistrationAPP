import { RouteObject } from 'react-router-dom'

import List from './List'
import Form from './forms'

export enum UserRoutesEnum {
	LIST = '/list/user',
	USER_INSERT = '/user/created',
	USER_EDIT = '/user/:userId'
}

export const listUser: RouteObject[] = [
	{
		path: UserRoutesEnum.LIST,
		element: <List />
	},
	{
		path: UserRoutesEnum.USER_INSERT,
		element: <Form />
	},
	{
		path: UserRoutesEnum.USER_EDIT,
		element: <Form />
	}
]
