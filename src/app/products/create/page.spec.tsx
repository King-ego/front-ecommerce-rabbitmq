import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CadastroProduto from '@/app/products/create/page'
import { ProductHttpService } from '@/requests/http/services/ProductHttpService'

jest.mock('@/requests/http/services/ProductHttpService', () => ({
	ProductHttpService: {
		createProduct: jest.fn(),
	},
}))

const mockedProductService = ProductHttpService as jest.Mocked<typeof ProductHttpService>

describe('CadastroProduto', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('Create product with valid input', async () => {
		mockedProductService.createProduct.mockResolvedValue(undefined);

		render(<CadastroProduto />)

		fireEvent.change(screen.getByTestId('test_name_id'), {
			target: { value: 'Smartphone' }
		})

		fireEvent.change(screen.getByTestId('test_price_id'), {
			target: { value: 999.99 }
		})

		fireEvent.change(screen.getByTestId('test_quantity_id'), {
			target: { value: 10 }
		})

		fireEvent.change(screen.getByTestId('test_category_id'), {
			target: { value: 'eletronicos' }
		})

		fireEvent.change(screen.getByTestId('test_description_id'), {
			target: { value: 'Smartphone Android' }
		})

		fireEvent.click(screen.getByTestId('submit_button'))

		await waitFor(() => {
			expect(mockedProductService.createProduct).toHaveBeenCalledWith({
				name: 'Smartphone',
				price: 999.99,
				quantity_in_stock: 10,
				category: 'eletronicos',
				description: 'Smartphone Android'
			})
		})
	})

	it('fields empty in send', async () => {
		render(<CadastroProduto />)

		fireEvent.click(screen.getByTestId('submit_button'))

		await waitFor(() => {
			expect(screen.getByText('Informe o nome do produto')).toBeInTheDocument()
			expect(screen.getByText('Informe o preço')).toBeInTheDocument()
			expect(screen.getByText('Informe a quantidade')).toBeInTheDocument()
			expect(screen.getByText('Descreva o produto')).toBeInTheDocument()
		})

		expect(mockedProductService.createProduct).not.toHaveBeenCalled()
	})
})
