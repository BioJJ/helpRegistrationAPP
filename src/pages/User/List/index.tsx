import React, { useEffect, useMemo, useState } from 'react'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import { ButtonNewActivity, Container, NewActivity, Content } from './style'
import { useUser } from './../hooks/useUser'
import Button from '../../../components/Button'
import ListCard from '../../../components/ListCard'
import SelectInput from '../../../components/SelectInput'

const setorOptions = [
	{ value: '', label: 'Todos os Setores' },
	{ value: 0, label: 'Desenvolvimento' },
	{ value: 1, label: 'RH' },
	{ value: 2, label: 'Diretoria' },
	{ value: 3, label: 'P&D' },
	{ value: 4, label: 'Financeiro' }
]

const List: React.FC = () => {
	const { getUsers, collaborators } = useUser()
	const [selectedSetor, setSelectedSetor] = useState<string>('')

	useEffect(() => {
		getUsers()
	}, [])

	const filteredCollaborators = useMemo(() => {
		return collaborators.filter((item) => {
			if (selectedSetor === '') return true
			return item.setor === selectedSetor
		})
	}, [collaborators, selectedSetor])

	const pageData = {
		title: 'Users',
		lineColor: '#4E41F0'
	}

	const handleSetorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedSetor(e.target.value)
	}

	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
					<SelectInput
						options={setorOptions}
						onChange={(e) => handleSetorChange(e)}
						defaultValue={selectedSetor}
					/>
				</ContentHeader>

				<NewActivity>
					<ButtonNewActivity href="/user/created">
						<Button type="primary" margin="10px 0px 10px 0px">
							Novo Usuario
						</Button>
					</ButtonNewActivity>
				</NewActivity>

				<Content>
					{filteredCollaborators.map((item) => (
						<ListCard
							key={item.id}
							tagColor={'#4E41F0'}
							title={item.name}
							subtitle={item.cpf}
							amount={String(item.salario)}
							url={`/user/${item.id}`}
						/>
					))}
				</Content>
			</Container>
		</Layout>
	)
}

export default List
