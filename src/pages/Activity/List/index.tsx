import React, { useEffect, useMemo, useState } from 'react'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { ButtonNewActivity, Container, NewActivity, Content } from './style'
import SelectInput from '../../../components/SelectInput'
import ListCard from '../../../components/ListCard'
import { useActivity } from './../hooks/useActivity'
import Button from '../../../components/Button'

const List: React.FC = () => {
	const [statusSelected, setStatusSelected] = useState<number | undefined>(
		undefined
	)

	const [collaboratorSelected, setCollaboratorSelected] = useState<
		number | undefined
	>(undefined)

	const { getActivities, activities, collaborators, getUsers } = useActivity()

	useEffect(() => {
		getActivities()
		getUsers()
	}, [])

	const pageData = {
		title: 'Atividades',
		lineColor: '#4E41F0'
	}

	const statusOptions = useMemo(
		() => [
			{ value: '', label: 'Todos' },
			{ value: 0, label: 'PENDENTE' },
			{ value: 1, label: 'EM ANDAMENTO' },
			{ value: 2, label: 'CONCLUIDO' }
		],
		[]
	)

	const collaboratorOptions = useMemo(
		() => [
			{ value: '', label: 'Todos' },
			...collaborators.map((collaborator) => ({
				value: collaborator.id,
				label: collaborator.name
			}))
		],
		[collaborators]
	)

	const handleCollaboratorSelected = (collaborator: string) => {
		const parseCollaborator =
			collaborator === '' ? undefined : Number(collaborator)
		setCollaboratorSelected(parseCollaborator)
	}

	const handleStatusSelected = (status: string) => {
		const parseStatus = status === '' ? undefined : Number(status)
		setStatusSelected(parseStatus)
	}

	const filteredActivities = useMemo(() => {
		return activities.filter((activity) => {
			const statusMatch =
				statusSelected === undefined || activity.status === statusSelected
			const collaboratorMatch =
				collaboratorSelected === undefined ||
				activity.collaborator === collaboratorSelected
			return statusMatch && collaboratorMatch
		})
	}, [activities, statusSelected, collaboratorSelected])

	const mapStatus = (statusCode: number): string => {
		switch (statusCode) {
			case 0:
				return 'PENDENTE'
			case 1:
				return 'EM ANDAMENTO'
			case 2:
				return 'CONCLUIDO'
			default:
				return 'STATUS INDEFINIDO'
		}
	}

	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
					<SelectInput
						options={collaboratorOptions}
						onChange={(e) => handleCollaboratorSelected(e.target.value)}
						defaultValue={collaboratorSelected}
					/>

					<SelectInput
						options={statusOptions}
						onChange={(e) => handleStatusSelected(e.target.value)}
						defaultValue={statusSelected}
					/>
				</ContentHeader>

				<NewActivity>
					<ButtonNewActivity href="/activity/created">
						<Button type="primary" margin="10px 0px 10px 0px">
							Nova Atividade
						</Button>
					</ButtonNewActivity>
				</NewActivity>

				<Content>
					{filteredActivities.map((item) => (
						<ListCard
							key={item.id}
							tagColor={'#4E41F0'}
							title={item.title}
							subtitle={mapStatus(item.status as number)}
							amount={item.openDate as string}
							url={`/activity/${item.id}`}
						/>
					))}
				</Content>
			</Container>
		</Layout>
	)
}

export default List
