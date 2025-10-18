import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import AppPage from "./HomePage"
import * as Navigate from "next/navigation"

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

const mockProducts = [
	{
		id: "1",
		name: "Produto Teste",
		slug: "produto-teste",
		price: 100.00,
		quantity_in_stock: 10,
		category: "categoria-teste",
		description: "Descrição do produto teste",
		image_url: "https://via.placeholder.com/150"
	}
]


describe('App Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	})

	it('should be render', async () => {
		const { findByText } = render(<AppPage initialProducts={mockProducts} />);
		expect(await findByText("Produto Teste")).toBeInTheDocument();
	})

	/*it('should show message not found products', async () => {
		jest.spyOn(ProductHttpService, 'getProducts').mockResolvedValueOnce([]);

		const { findByText } = render(<AppPage initialProducts={mockProducts} />);
		expect(await findByText("Nenhum Produto Encontrado")).toBeInTheDocument();

	});*/


	it('should handle click and redirect', async () => {
		const mockPush = jest.fn();

		(jest.spyOn(Navigate, "redirect") as unknown as jest.Mock)
			.mockImplementation((url: string) => mockPush(url) as never);

		render(<AppPage initialProducts={mockProducts}/>)

		fireEvent.change(screen.getByTestId('search_input'), {
			target: { value: 'test' }
		})

		fireEvent.click(screen.getByTestId('search_button'))

		await waitFor(() => {
				expect(mockPush).toHaveBeenCalledWith('/products/search?q=test');
			}
		)
	});

	it('should handle click and not redirect', async () => {
		const mockPush = jest.fn();
		(jest.spyOn(Navigate, "redirect") as unknown as jest.Mock)
			.mockImplementation((url: string) => mockPush(url) as never);

		render(<AppPage initialProducts={mockProducts}/>)

		fireEvent.click(screen.getByTestId('search_button'))

		await waitFor(() => {
				expect(mockPush).not.toHaveBeenCalledWith('/products');
			}
		)
	});

	it('should handle click and redirect name wrong', async () => {
		const mockPush = jest.fn();

		(jest.spyOn(Navigate, "redirect") as unknown as jest.Mock)
			.mockImplementation((url: string) => mockPush(url) as never);

		render(<AppPage initialProducts={mockProducts}/>)

		fireEvent.change(screen.getByTestId('search_button'), {
			target: { value: 'test1' }
		})

		fireEvent.click(screen.getByTestId('search_button'))

		await waitFor(() => {
				expect(mockPush).not.toHaveBeenCalledWith('/products/search?q=test');
		})

	})
})
