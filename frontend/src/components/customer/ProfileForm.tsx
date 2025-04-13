import { CardContainer } from '@/components/common/CardContainer'
import { FormContainer } from '@/components/common/FormContainer'
import { useServicePromise } from '@/lib/hooks/useServicePromise'
import {
	changeProfile,
	type ChangeProfileValues,
} from '@/services/changeCustomerService'
import { CustomInput } from '@/components/common/CustomInput'
import { getFormValue } from '@/utils/getFormValue'

export type ProfileFormTranslation = {
	labels: {
		name: string
		birthDate: string
	}
	title: string
	submitLabel: string
}

interface Props {
	name: string
	birthDate: string
	t: ProfileFormTranslation
}

export function ProfileForm({ name, birthDate, t }: Props) {
	const { isLoading, error, response, handlePromise } = useServicePromise<
		ChangeProfileValues,
		string
	>(changeProfile)

	const labels = t.labels

	const handleData = (formValues: FormData) => {
		handlePromise({
			name: getFormValue(labels.name, formValues),
			birthDate: getFormValue(labels.birthDate, formValues),
			id: localStorage.getItem('id') ?? '0',
			password: 'no-necessary',
		})
	}

	return (
		<CardContainer styleClass=''>
			<FormContainer
				response={response}
				handleData={handleData}
				submitButton={{
					label: t.submitLabel,
					isLoading,
				}}
			>
				<h3>{t.title}</h3>
				<CustomInput
					label={labels.name}
					defaultValue={name}
					type='text'
					disable={isLoading}
					error={error?.name}
					required={true}
				/>
				<CustomInput
					label={labels.birthDate}
					defaultValue={birthDate}
					type='date'
					disable={isLoading}
					error={error?.name}
					required={true}
				/>
			</FormContainer>
		</CardContainer>
	)
}
