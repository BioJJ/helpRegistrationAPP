import React from 'react'
import { ButtonListActivity, Container, Tag } from './style'

interface IListCardProps {
	tagColor: string
	title: string
	subtitle: string
	amount: string
	url: string
}

const ListCard: React.FC<IListCardProps> = ({
	tagColor,
	title,
	subtitle,
	amount,
	url
}) => (
	<ButtonListActivity href={url}>
		<Container>
			<Tag color={tagColor} />
			<div>
				<span>{title}</span>
				<small>{subtitle}</small>
			</div>
			<h3>{amount}</h3>
		</Container>
	</ButtonListActivity>
)

export default ListCard
