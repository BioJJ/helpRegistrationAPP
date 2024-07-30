export interface User {
	id?: number
	name: string
	cpf: string
	email: string
	password: string
	cargo: string
	dataDeAdmissao?: string
	setor: string
	salario: number | undefined
	profile: number[] 
	datacriacao?: string
	perfis?: string[]
}
