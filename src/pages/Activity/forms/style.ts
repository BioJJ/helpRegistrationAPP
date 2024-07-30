import styled from 'styled-components'
import InputMask from 'react-input-mask'

export const Container = styled.div``

export const Content = styled.main``

export const Label = styled.label`
	background-color: ${(props) => props.theme.colors.gray};
	color: ${(props) => props.theme.colors.secondary};
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
`
export const Select = styled.select`
	width: 100%;
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
	margin: 7px 0;
	font-size: 1em;

	&:focus {
		border-color: #4e41f0;
		outline: none;
	}
`

export const Description = styled.textarea`
	width: 100%;
	height: 100px; 
	padding: 10px;
	border-radius: 5px;
	border: 1px solid #ddd;
	margin: 7px 0;
	font-size: 1em;
`

export const ButtonCanceled = styled.a`
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
export const MaskInput = styled(InputMask)`
	width: 100%;

	margin: 7px 0;
	padding: 10px;

	border-radius: 5px;
`