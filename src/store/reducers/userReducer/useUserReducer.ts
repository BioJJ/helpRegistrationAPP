import { useDispatch } from 'react-redux'

import { UserType } from '../../../types/UserType'
import { User } from '../../../types/User'
import { useAppSelector } from '../../hooks'
import {
	setUsersAction,
	setCollaboratorsAction,
	setCollaboratorAction
} from '.'

export const useUserReducer = () => {
	const dispatch = useDispatch()
	const { users, collaborators, collaborator } = useAppSelector(
		(state) => state.userReducer
	)

	const setUsers = (users: UserType[]) => {
		dispatch(setUsersAction(users))
	}

	const setCollaborators = (users: User[]) => {
		dispatch(setCollaboratorsAction(users))
	}

	const setCollaborator = (user: User) => {
		dispatch(setCollaboratorAction(user))
	}

	return {
		users,
		collaborators,
		setUsers,
		setCollaborators,
		collaborator,
		setCollaborator
	}
}
