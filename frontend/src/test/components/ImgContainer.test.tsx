import { ImgContainer } from '@/components/common/ImgContainer'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

describe('ImgContainer component tests', () => {
	afterEach(() => cleanup())

	it('Should render correctly without button', () => {
		render(
			<ImgContainer locale='en'>
				<img src='/image' alt='Image' />
			</ImgContainer>
		)

		expect(screen.getByRole('img')).toBeInTheDocument()
		expect(
			screen.queryByRole('button', { name: 'Show author image' })
		).not.toBeInTheDocument()
	})

	it('Should render correctly with button', () => {
		render(
			<ImgContainer locale='en' authorName='Author'>
				<img src='/image' alt='Image' />
			</ImgContainer>
		)

		expect(screen.getByRole('img')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Show author image' })
		).toBeInTheDocument()
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})

	it('Should show the dialog with author name', () => {
		render(
			<ImgContainer locale='en' authorName='Author'>
				<img src='/image' alt='Image' />
			</ImgContainer>
		)

		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
		fireEvent.click(screen.getByRole('button'))
		expect(screen.getByRole('dialog')).toBeInTheDocument()

		expect(
			screen.getByRole('heading', { name: "Image's author" })
		).toBeInTheDocument()
		expect(screen.getByText('Author')).toBeInTheDocument()
		expect(
			screen.getByRole('button', { name: 'Discard' })
		).toBeInTheDocument()

		fireEvent.click(screen.getByRole('button', { name: 'Discard' }))
		expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
	})
})
