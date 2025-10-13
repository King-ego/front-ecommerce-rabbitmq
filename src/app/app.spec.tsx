import {render, fireEvent, screen, waitFor} from "@testing-library/react";
import AppPage from "./page"
import {ProductHttpService} from "@/requests/http/services/ProductHttpService";
import { redirect } from "next/navigation";

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));


describe('App Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(ProductHttpService, 'getProducts').mockResolvedValue([
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
		])
	})

	it('should be render', async () => {
		const { findByText } = render(<AppPage />);
		expect(await findByText("Produto Teste")).toBeInTheDocument();
	})

	it('should show message not found products', async () => {
		jest.spyOn(ProductHttpService, 'getProducts').mockResolvedValueOnce([]);

		const { findByText } = render(<AppPage />);
		expect(await findByText("Nenhum Produto Encontrado")).toBeInTheDocument();

	});


	it('should handle click and redirect', async () => {
		const mockPush = jest.fn();
		type RedirectType = typeof redirect;

		(redirect as jest.MockedFunction<RedirectType>).mockImplementation((url, options) => mockPush(url));
		render(<AppPage/>)

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
		type RedirectType = typeof redirect;

		(redirect as jest.MockedFunction<RedirectType>).mockImplementation((url, options) => mockPush(url));
		render(<AppPage/>)

		fireEvent.click(screen.getByTestId('search_button'))

		await waitFor(() => {
				expect(mockPush).not.toHaveBeenCalledWith('/products');
			}
		)
	});

	it('should handle click and redirect name wrong', async () => {
		const mockPush = jest.fn();
		type RedirectType = typeof redirect;

		(redirect as jest.MockedFunction<RedirectType>).mockImplementation((url, options) => mockPush(url));
		render(<AppPage/>)

		fireEvent.change(screen.getByTestId('search_input'), {
			target: { value: 'test1' }
		})

		fireEvent.click(screen.getByTestId('search_button'))

		await waitFor(() => {
				expect(mockPush).not.toHaveBeenCalledWith('/products/search?q=test');
		})

	})
})
