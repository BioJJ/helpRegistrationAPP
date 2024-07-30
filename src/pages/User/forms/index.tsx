import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentHeader from '../../../components/ContentHeader'
import Layout from '../../../components/Layout'
import {
	ButtonCanceled,
	Container,
	MaskInput,
	Select
} from './style'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { UserRoutesEnum } from '../routes'
import { useUser } from '../hooks/useUser'

const setorOptions = [
	{ value: 0, label: 'Desenvolvimento' },
	{ value: 1, label: 'RH' },
	{ value: 2, label: 'Diretoria' },
	{ value: 3, label: 'P&D' },
	{ value: 4, label: 'Financeiro' }
]

const profileOptions = [
	{ value: 0, label: 'ADM' },
	{ value: 1, label: 'USER' }
]

const Form: React.FC = () => {
	const { userId } = useParams<{ userId: string }>()

	const navigate = useNavigate()

	const [name, setName] = useState<string>('')
	const [cpf, setCpf] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [cargo, setCargo] = useState<string>('')
	const [setor, setSetor] = useState<string>('')
	const [salario, setSalario] = useState<number>()
	const [profile, setProfile] = useState<number[]>([])

	const [update, setUpdate] = useState<boolean>(false)

	const pageData = {
		title: update ? 'Atualizar Usuario' : 'Novo Usuario',
		lineColor: '#4E41F0'
	}

	const { addNewUser, updateUser, getUserById, collaborator, loading } =
		useUser()

	const handleNewUser = () => {
		if (update) {
			const id = Number(userId)
			updateUser({
				id,
				name,
				cpf,
				email,
				password,
				cargo,
				setor,
				salario,
				profile
			})
		} else {
			addNewUser({
				name,
				cpf,
				email,
				password,
				cargo,
				setor,
				salario,
				profile
			})
		}

		navigate(UserRoutesEnum.LIST)
	}

	useEffect(() => {
		mapperActivity()
	}, [collaborator])

	useEffect(() => {
		if (userId) {
			setUpdate(true)
			getUserById(Number(userId))
		}
	}, [])

	const mapperActivity = async () => {
		if (collaborator) {
			setName(collaborator.name)
			setCpf(collaborator.cpf)
			setEmail(collaborator.email)
			setPassword(collaborator.password)
			setCargo(collaborator.cargo)
			setSetor(collaborator.setor as string)
			setSalario(collaborator.salario)
			setProfile([collaborator.profile[0]])
		}
	}
	return (
		<Layout>
			<Container>
				<ContentHeader title={pageData.title} lineColor={pageData.lineColor} />

				<Input
					type="text"
					placeholder="Nome"
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<MaskInput
					mask="999.999.999-99"
					type="text"
					placeholder="CPF"
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
				/>

				<Input
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<Input
					type="password"
					placeholder="Senha"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Input
					type="number"
					placeholder="Salario"
					required
					value={salario}
					onChange={(e) => setSalario(Number(e.target.value))}
				/>

				<Select value={setor} onChange={(e) => setSetor(e.target.value)}>
					<option value="">Selecione o setor </option>
					{setorOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>

				<Input
					type="text"
					placeholder="Cargo"
					required
					value={cargo}
					onChange={(e) => setCargo(e.target.value)}
				/>

				<Select
					value={profile[0]}
					onChange={(e) => setProfile([Number(e.target.value)])}
				>
					<option value="">Selecione o Perfil </option>
					{profileOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Select>

				<Button
					loading={loading}
					type="primary"
					margin="10px 0px 10px 0px"
					onClick={handleNewUser}
				>
					{update ? 'Atualizar' : 'Cadastrar'}
				</Button>

				<ButtonCanceled href="/list/user">
					<Button type="link" margin="10px 0px 10px 0px">
						Cancelar
					</Button>
				</ButtonCanceled>
			</Container>
		</Layout>
	)
}

export default Form
