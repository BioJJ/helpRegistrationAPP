import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import {
	ButtonCanceled,
	Container,
	Description,
	MaskInput,
	Select
} from './style'
import { useActivity } from './../hooks/useActivity'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { ActivityRoutesEnum } from '../routes'

export interface SelectedFile {
	name: string
	size: number
	type: string
}

const priorityOptions = [
	{ value: 0, label: 'Baixa' },
	{ value: 1, label: 'Média' },
	{ value: 2, label: 'Alta' }
]

const statusOptions = [
	{ value: 0, label: 'PENDENTE' },
	{ value: 1, label: 'EM ANDAMENTO' },
	{ value: 2, label: 'CONCLUIDO' }
]

const Form: React.FC = () => {
	const { activityId } = useParams<{ activityId: string }>()

	const navigate = useNavigate()

	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [status, setStatus] = useState<number>()
	const [priority, setPriority] = useState<number>()
	const [collaborator, setCollaborator] = useState<number>()
	const [closingDate, setClosingDate] = useState<string>('')

	const [update, setUpdate] = useState<boolean>(false)

	const {
		collaborators,
		addNewActivity,
		getActivityById,
		updateActivity,
		loading,
		getUsers,
		activity
	} = useActivity()

	const pageData = {
		title: update ? 'Atualizar Atividade' : 'Nova Atividade',
		lineColor: '#4E41F0'
	}

	const handleNewActivity = () => {
		if (update) {
			const id = Number(activityId)
			updateActivity({
				id,
				title,
				description,
				status,
				priority,
				collaborator,
				closingDate
			})
		} else {
			addNewActivity({
				title,
				description,
				status,
				priority,
				collaborator,
				closingDate
			})
		}

		setTitle('')
    setDescription('')
    setStatus(0)
    setPriority(0)
    setCollaborator(0)
    setClosingDate('')

		navigate(ActivityRoutesEnum.LIST)
	}

	useEffect(() => {
		mapperActivity()
	}, [activity])

	useEffect(() => {
		getUsers()
		if (activityId) {
			setUpdate(true)
			getActivityById(Number(activityId))
		}
	}, [])

	const mapperActivity = async () => {
		if (activity) {
			setTitle(activity.title)
			setDescription(activity.description)
			setStatus(activity.status)
			setPriority(activity.priority)
			setCollaborator(activity.collaborator)
			setClosingDate(activity.closingDate as string)
		}
	}
	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor} />

				<Input
					type="text"
					placeholder="Titulo"
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<Description
					placeholder="Descrição"
					required
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<Select
					value={priority}
					onChange={(e) => setPriority(Number(e.target.value))}
				>
					<option value="">Selecione a Prioridade</option>
					{priorityOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>

				<Select
					value={status}
					onChange={(e) => setStatus(Number(e.target.value))}
				>
					<option value="">Selecione o Status</option>
					{statusOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>

				<Select
					value={collaborator}
					onChange={(e) => setCollaborator(Number(e.target.value))}
				>
					<option value="">Selecione o Colaborador</option>
					{collaborators.map((option) => (
						<option key={option.id} value={option.id}>
							{option.name}
						</option>
					))}
				</Select>

				{update && (
					<MaskInput
						mask="99/99/9999"
						type="text"
						placeholder="Data de fechamento"
						value={closingDate}
						onChange={(e) => setClosingDate(e.target.value)}
					/>
				)}

				<Button
					loading={loading}
					type="primary"
					margin="10px 0px 10px 0px"
					onClick={handleNewActivity}
				>
					{update ? 'Atualizar' : 'Cadastrar'}
				</Button>

				<ButtonCanceled href="/list/activity">
					<Button type="link" margin="10px 0px 10px 0px">
						Cancelar
					</Button>
				</ButtonCanceled>
			</Container>
		</Layout>
	)
}

export default Form
