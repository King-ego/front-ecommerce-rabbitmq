import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CadastroProduto from '@/app/products/create/page'
import { ProductHttpService } from '@/requests/http/services/ProductHttpService'

// Mock do ProductHttpService
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
		mockedProductService.createProduct.mockResolvedValue()

		render(<CadastroProduto />)

		// Preencher formulário
		fireEvent.change(screen.getByPlaceholderText('Digite o nome do produto'), {
			target: { value: 'Smartphone' }
		})

		fireEvent.change(screen.getByDisplayValue(''), {
			target: { value: '999.99' }
		})

		const quantityInput = screen.getByLabelText('Quantidade em Estoque')
		fireEvent.change(quantityInput, {
			target: { value: '10' }
		})

		fireEvent.change(screen.getByPlaceholderText('Selecione a categoria'), {
			target: { value: 'eletronicos' }
		})

		fireEvent.change(screen.getByPlaceholderText('Descreva o produto detalhadamente...'), {
			target: { value: 'Smartphone Android' }
		})

		// Submeter formulário
		fireEvent.click(screen.getByText('Cadastrar Produto'))

		// Verificar se o serviço foi chamado
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
