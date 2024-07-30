import { useState } from 'react'

import { useActivityReducer } from '../../../store/reducers/activityReducer/userActivityReducer'
import { Activity } from '../../../types/Activity'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { URL_ACTIVITY, URL_USERS } from '../../../constants/urls'
import { User } from '../../../types/User'
import {
	connectionAPIGet,
	connectionAPIPost,
	connectionAPIPut
} from '../../../functions/connections/connectionsAPI'

export const useActivity = () => {
	const [loading, setLoading] = useState(false)
	const { setNotification } = useGlobalReducer()

	const { activities, setActivities, activity, setActivity } =
		useActivityReducer()

	const [collaborators, setCollaborator] = useState<User[]>([])

	const getActivities = async (): Promise<void> => {
		await connectionAPIGet<Activity[]>(`${URL_ACTIVITY}`).then((result) => {
			setLoading(true)
			setActivities(result)
			setLoading(false)
		})
	}
	const getUsers = async (): Promise<void> => {
		await connectionAPIGet<User[]>(`${URL_USERS}`).then((result) => {
			setLoading(true)
			setCollaborator(result)
			setLoading(false)
		})
	}
	const addNewActivity = async (body: Activity): Promise<void> => {
		setLoading(true)

		await connectionAPIPost<Activity[]>(URL_ACTIVITY, body)
			.then((result) => {
				setActivities([...result])

				setNotification('Atividade cadastrada com sucesso!', 'success')
			})
			.catch(() => {
				setNotification('Erro ao cadastrar atividade', 'error')
				return undefined
			})

		setLoading(false)
	}
	const getActivityById = async (id: number): Promise<void> => {
		setLoading(true)

		await connectionAPIGet<Activity>(`${URL_ACTIVITY}/${id}`)
			.then((result) => {
				setActivity(result)

				return result
			})
			.catch(() => {
				setNotification('Erro ao buscar atividade', 'error')
				return undefined
			})
		setLoading(false)
	}
	const updateActivity = async (body: Activity): Promise<void> => {
		setLoading(true)

		await connectionAPIPut(`${URL_ACTIVITY}/${body.id}`, body)
			.then((result) => {
				setNotification('Atividade Atualizada com sucesso!', 'success')
			})
			.catch(() => {
				setNotification('Erro ao Atualizar atividade', 'error')
				return undefined
			})

		setLoading(false)
	}

	return {
		addNewActivity,
		getActivityById,
		updateActivity,
		loading,
		collaborators,
		activities,
		activity,
		getActivities,
		getUsers
	}
}
