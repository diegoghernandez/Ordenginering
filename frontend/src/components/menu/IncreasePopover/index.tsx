import Styles from './IncreasePopover.module.css'

interface Props {
	queue: number[]
}

export function IncreasePopover({ queue }: Props) {
	return (
		<ul>
			{queue.map((element) => (
				<li
					key={element}
					role='alert'
					aria-live='polite'
					className={Styles['increase-popover']}
				>
					+1
				</li>
			))}
		</ul>
	)
}
