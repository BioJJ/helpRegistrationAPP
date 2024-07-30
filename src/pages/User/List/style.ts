import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.main``

export const NewActivity = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	margin-bottom: 40px;
	width: 100%;
`

export const ButtonNewActivity = styled.a`
	color: ${(props) => props.theme.colors.info};
	text-decoration: none;

	margin: 7px 0;
	display: flex;
	align-items: center;

	transition: opacity 0.3s;

	&:hover {
		opacity: 0.7;
	}

	> svg {
		font-size: 18px;
		margin-right: 5px;
	}
`
