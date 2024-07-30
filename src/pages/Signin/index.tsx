import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useRequests } from '../../hooks/auth'

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

import {
	Container,
	Logo,
	Form,
	FormTitle,
	FormRegister,
	MaskInput,
	Select
} from './style'

const SignIn: React.FC = () => {
	const navigate = useNavigate()
	const [name, setName] = useState<string>('')
	const [cpf, setCpf] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [cargo, setCargo] = useState<string>('')
	const [setor, setSetor] = useState<string>('')
	const [salario, setSalario] = useState<number>()
	const [profile, setProfile] = useState<number[]>([0])

	const [register, setRegister] = useState<boolean>(false)

	const { authRequest, newUserRequest, loading } = useRequests()

	const handleLogin = () => {
		authRequest(navigate, {
			email,
			password
		})
	}

	const handleNewUser = () => {
		newUserRequest(navigate, {
			name,
			cpf,
			email,
			password,
			cargo,
			setor,
			salario,
			profile
		})

		setTimeout(toggleRegister, 3000)
	}

	const toggleRegister = () => {
		setRegister(!register)
	}

	return (
		<Container>
			<Logo>
				<img src={logoImg} alt="HelpRegistrationAPP" />
				<h2>HelpRegistrationAPP</h2>
			</Logo>

			{register ? (
				<FormRegister>
					<FormTitle>Cadastrar</FormTitle>

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

					<Input
						type="text"
						placeholder="Cargo"
						required
						value={cargo}
						onChange={(e) => setCargo(e.target.value)}
					/>

					<Select value={setor} onChange={(e) => setSetor(e.target.value)}>
						<option value="">Selecione o setor </option>
						{setorOptions.map((option) => (
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
						Cadastrar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cancelar
					</Button>
				</FormRegister>
			) : (
				<Form>
					<FormTitle>Entrar</FormTitle>

					<Input
						type="email"
						placeholder="e-mail"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="senha"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>

					<Button
						loading={loading}
						type="primary"
						margin="10px 0px 10px 0px"
						onClick={handleLogin}
					>
						Acessar
					</Button>

					<Button
						type="link"
						margin="10px 0px 16px 0px"
						onClick={toggleRegister}
					>
						Cadastrar
					</Button>
				</Form>
			)}
		</Container>
	)
}

export default SignIn
