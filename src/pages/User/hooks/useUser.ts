import { useEffect, useState } from 'react'

import { User } from '../../../types/User'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import {
	connectionAPIGet,
	connectionAPIPost,
	connectionAPIPut
} from '../../../functions/connections/connectionsAPI'
import { URL_USERS } from '../../../constants/urls'
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer'

export const useUser = () => {
	const [loading, setLoading] = useState(false)
	const { setNotification } = useGlobalReducer()

	const { setCollaborators, setCollaborator, collaborators, collaborator } = useUserReducer()

	const getUsers = async (): Promise<void> => {
		await connectionAPIGet<User[]>(`${URL_USERS}`).then((result) => {
			setLoading(true)
			setCollaborators(result)
			setLoading(false)
		})
	}
	const addNewUser = async (body: User): Promise<void> => {
		setLoading(true)

		await connectionAPIPost(URL_USERS, body)
			.then(() => {
				setNotification('Usuario cadastrada com sucesso!', 'success')
			})
			.catch(() => {
				setNotification('Erro ao cadastrar Usuario', 'error')
				return undefined
			})

		setLoading(false)
	}
	const updateUser = async (body: User): Promise<void> => {
		setLoading(true)

		await connectionAPIPut(`${URL_USERS}/${body.id}`, body)
			.then(() => {
				setNotification('Usuario Atualizado com sucesso!', 'success')
			})
			.catch(() => {
				setNotification('Erro ao Atualizar Usuario', 'error')
				return undefined
			})

		setLoading(false)
	}
	const getUserById = async (id: number): Promise<void> => {
		setLoading(true)

		await connectionAPIGet<User>(`${URL_USERS}/${id}`)
			.then((result) => {
				setCollaborator(result)
				return result
			})
			.catch(() => {
				setNotification('Erro ao buscar atividade', 'error')
				return undefined
			})
		setLoading(false)
	}

	return {
		loading,
		getUsers,
		addNewUser,
		updateUser,
		getUserById,
		collaborators,
		collaborator
	}
}
