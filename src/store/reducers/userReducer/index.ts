import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../../types/UserType'
import { User } from '../../../types/User'

interface UserState {
	users: UserType[]
	collaborators: User[]
	collaborator: User
}

const initialState: UserState = {
	users: [],
	collaborators: [],
	collaborator: {
		name: '',
		cpf: '',
		email: '',
		password: '',
		cargo: '',
		dataDeAdmissao: '',
		setor: '',
		salario: 0,
		profile: [],
		datacriacao: '',
		perfis: []
	}
}

export const counterSlice = createSlice({
	name: 'userReducer',
	initialState,
	reducers: {
		setUsersAction: (state, action: PayloadAction<UserType[]>) => {
			state.users = action.payload
		},
		setCollaboratorsAction: (state, action: PayloadAction<User[]>) => {
			state.collaborators = action.payload
		},
		setCollaboratorAction: (state, action: PayloadAction<User>) => {
			state.collaborator = action.payload
		}
	}
})

export const { setUsersAction, setCollaboratorsAction, setCollaboratorAction } =
	counterSlice.actions

export default counterSlice.reducer
