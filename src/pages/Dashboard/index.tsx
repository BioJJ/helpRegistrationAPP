import React, { useEffect, useMemo, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'


import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

import { Container, Content } from './style'
import WalletBox from '../../components/Dashboard/WalletBox'
import MessageBox from '../../components/Dashboard/MessageBox'
import PieChartBox from '../../components/Dashboard/PieChartBox'
import Layout from '../../components/Layout'

import { useActivity } from '../Activity/hooks/useActivity'

const Dashboard: React.FC = () => {
	const [statusSelected, setStatusSelected] = useState<number | undefined>(
		undefined
	)

	const statusOptions = useMemo(
		() => [
			{ value: '', label: 'Todos' },
			{ value: 0, label: 'PENDENTE' },
			{ value: 1, label: 'EM ANDAMENTO' },
			{ value: 2, label: 'CONCLUIDO' }
		],
		[]
	)

	const { getActivities, loading, activities } = useActivity()

	useEffect(() => {
		getActivities()
	}, [loading])

	const filteredActivities = useMemo(() => {
		return activities.filter((activity) => {
			if (statusSelected === undefined) return true
			return activity.status === statusSelected
		})
	}, [statusSelected, activities])

	const handleStatusSelected = (status: string) => {
		const parseStatus = status === '' ? undefined : Number(status)
		setStatusSelected(parseStatus)
	}

	const totalPendente = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.status === 0) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalAndamento = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.status === 1) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalConcluido = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.status === 2) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalBaixa = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.priority === 0) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalMedia = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.priority === 1) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalAlta = useMemo(() => {
		let total: number = 0

		filteredActivities.forEach((item) => {
			if (item.priority === 2) {
				total += 1
			}
		})

		return total
	}, [filteredActivities])

	const totalBalance = useMemo(() => {
		return totalAndamento + totalPendente - totalConcluido
	}, [totalAndamento, totalPendente, totalConcluido])

	const message = useMemo(() => {
		if (totalBalance < 0) {
			return {
				title: 'Que triste!',
				description: 'Neste mês, você gastou mais do que deveria.',
				footerText:
					'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
				icon: sadImg
			}
		} else if (totalAndamento === 0 && totalPendente === 0) {
			return {
				title: "Op's!",
				description: 'Neste mês, não há registros de Atividades.',
				footerText:
					'Parece que você não fez nenhum registro no Status selecionado.',
				icon: opsImg
			}
		} else if (totalBalance === 0) {
			return {
				title: 'Ufaa!',
				description: 'Você concluio todas as atividades',
				footerText: 'Parabens.',
				icon: happyImg
			}
		} else {
			return {
				title: 'Muito bem!',
				description: 'Você possui atividades Não concluidas!',
				footerText: 'Foco.',
				icon: grinningImg
			}
		}
	}, [totalBalance, totalAndamento, totalPendente])

	const relationPendenteVersusAndamentoVersusConcluido = useMemo(() => {
		const total = totalAndamento + totalPendente + totalConcluido

		const percentPendent = Number(((totalPendente / total) * 100).toFixed(1))
		const percentAndamento = Number(((totalAndamento / total) * 100).toFixed(1))
		const percentConcluido = Number(((totalConcluido / total) * 100).toFixed(1))

		const data = [
			{
				name: 'Pendentes',
				value: totalPendente,
				percent: percentPendent ? percentPendent : 0,
				color: '#4E41F0'
			},
			{
				name: 'Em andamento',
				value: totalAndamento,
				percent: percentAndamento ? percentAndamento : 0,
				color: '#F7931B'
			},
			{
				name: 'Concluidas',
				value: totalConcluido,
				percent: percentConcluido ? percentConcluido : 0,
				color: '#E44C4E'
			}
		]

		return data
	}, [totalAndamento, totalPendente, totalConcluido])


	const relationPriority = useMemo(() => {
		const total = totalAndamento + totalPendente

		const percentPendent = Number(((totalBaixa / total) * 100).toFixed(1))
		const percentAndamento = Number(((totalMedia / total) * 100).toFixed(1))
		const percentConcluido = Number(((totalAlta / total) * 100).toFixed(1))

		const data = [
			{
				name: 'Baixa',
				value: totalBaixa,
				percent: percentPendent ? percentPendent : 0,
				color: '#4E41F0'
			},
			{
				name: 'Media',
				value: totalMedia,
				percent: percentAndamento ? percentAndamento : 0,
				color: '#F7931B'
			},
			{
				name: 'Alta',
				value: totalAlta,
				percent: percentConcluido ? percentConcluido : 0,
				color: '#E44C4E'
			}
		]

		return data
	}, [totalAndamento, totalPendente, totalConcluido])

	return (
		<Layout>
			<Container>
				<ContentHeader title="Dashboard" lineColor="#F7931B">
					<SelectInput
						options={statusOptions}
						onChange={(e) => handleStatusSelected(e.target.value)}
						defaultValue={statusSelected}
					/>
				</ContentHeader>

				<Content>
					<WalletBox
						title="Pendente"
						color="#4E41F0"
						amount={totalPendente}
						footerlabel="atualizado com base nas Atividades Pendentes"
						icon="dolar"
					/>

					<WalletBox
						title="Em andamento"
						color="#F7931B"
						amount={totalAndamento}
						footerlabel="atualizado com base nas Atividades Em andamento"
						icon="arrowUp"
					/>

					<WalletBox
						title="Concluído"
						color="#E44C4E"
						amount={totalConcluido}
						footerlabel="atualizado com base nas  Atividades Concluídas"
						icon="arrowDown"
					/>

					<MessageBox
						title={message.title}
						description={message.description}
						footerText={message.footerText}
						icon={message.icon}
					/>

					<PieChartBox
						data={relationPendenteVersusAndamentoVersusConcluido}
						title="Status Atividades"
					/>


					<WalletBox
						title="Prioridade Baixa"
						color="#4E41F0"
						amount={totalBaixa}
						footerlabel="atualizado com base nas Atividades com Prioridade baixa"
						icon="dolar"
					/>

					<WalletBox
						title="Prioridade Media"
						color="#F7931B"
						amount={totalMedia}
						footerlabel="atualizado com base nas Atividades com Prioridade media"
						icon="arrowUp"
					/>

					<WalletBox
						title="Prioridade Alta"
						color="#E44C4E"
						amount={totalAlta}
						footerlabel="atualizado com base nas  Atividades com Prioridade alta"
						icon="arrowDown"
					/>

					<PieChartBox data={relationPriority} title="Status de Prioridade" />
				</Content>
			</Container>
		</Layout>
	)
}

export default Dashboard
