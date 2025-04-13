import { SmallModalContainer } from '@/components/common/SmallModalContainer'
import { Spin } from '@/components/common/Spin'
import { SECONDARY__BUTTON } from '@/lib/constants/styles'
import { useServicePromise } from '@/hooks/useServicePromise'
import { resendToken } from '@/services/authService'
import { getLocalFromUrl } from '@/utils/getLocalFromUrl'
import { useRef } from 'react'

interface Props {
	t: {
		resendButton: string
		responses: {
			SUCCESS: string
			SERVER: string
		}
	}
}

export function ResendToken({ t }: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const { response, isLoading, handlePromise } = useServicePromise<
		{ token: string; locale: string },
		string
	>(resendToken)

	const handleClick = () => {
		dialogRef.current?.showModal()
		handlePromise({
			token:
				new URLSearchParams(document.location.search).get('token') ?? '',
			locale: getLocalFromUrl(),
		})
	}

	return (
		<>
			<button className={SECONDARY__BUTTON} onClick={handleClick}>
				{t.resendButton}
			</button>
			<SmallModalContainer ref={dialogRef}>
				{isLoading && !response ? (
					<div
						style={{ width: '64px', height: '64px', placeSelf: 'center' }}
					>
						<Spin />
					</div>
				) : (
					<p>
						{
							t.responses[
								response?.message as keyof Props['t']['responses']
							]
						}
					</p>
				)}
			</SmallModalContainer>
		</>
	)
}
