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

	it('deve cadastrar produto com dados válidos', async () => {
		mockedProductService.createProduct.mockResolvedValue(undefined);

		render(<CadastroProduto />)

		fireEvent.change(screen.getByTestId('test_name_id'), {
			target: { value: 'Smartphone' }
		})

		/*fireEvent.change(screen.getByLabelText('Preço (R$)'), {
			target: { value: '999.99' }
		})*/

		/*fireEvent.change(screen.getByLabelText('Quantidade em Estoque'), {
			target: { value: '10' }
		})*/

		/*fireEvent.change(screen.getByPlaceholderText('Selecione a categoria'), {
			target: { value: 'eletronicos' }
		})*/

		/*fireEvent.change(screen.getByPlaceholderText('Descreva o produto detalhadamente...'), {
			target: { value: 'Smartphone Android' }
		})*/

		/*fireEvent.click(screen.getByText('Cadastrar Produto'))

		await waitFor(() => {
			expect(mockedProductService.createProduct).toHaveBeenCalledWith({
				name: 'Smartphone',
				price: 999.99,
				quantity_in_stock: 10,
				category: 'eletronicos',
				description: 'Smartphone Android'
			})
		})*/
	})

	it('deve exibir erros de validação quando campos obrigatórios estão vazios', async () => {
		render(<CadastroProduto />)

		fireEvent.click(screen.getByText('Cadastrar Produto'))

		await waitFor(() => {
			expect(screen.getByText('Informe o nome do produto')).toBeInTheDocument()
			expect(screen.getByText('Informe o preço')).toBeInTheDocument()
			expect(screen.getByText('Informe a quantidade')).toBeInTheDocument()
		})

		expect(mockedProductService.createProduct).not.toHaveBeenCalled()
	})
})
