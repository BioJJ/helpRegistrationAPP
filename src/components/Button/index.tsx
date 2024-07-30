import { ButtonProps } from 'antd'

import { ButtonAntd } from './style'

interface ButtonCurrentProps extends ButtonProps {
	margin?: string
	width?: string
}

const Button = ({ margin, width, ...props }: ButtonCurrentProps) => {
	return <ButtonAntd style={{ margin, width }} {...props} />
}

export default Button
