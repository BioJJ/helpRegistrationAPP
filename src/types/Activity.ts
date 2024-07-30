
export interface Activity {
	id?: number | undefined
	openDate?: string
	closingDate?: string
	collaborator: number | undefined
	priority: number | undefined
	status: number | undefined
	title: string
	description: string
}
