import { render, fireEvent, screen } from '@testing-library/react';
import SearchPage from "./SearchPage";
import { useRouter } from "next/navigation";

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
];

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
		query: {},
	}),
	useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

/*jest.mock('@/requests/http/services/ProductHttpService', () => ({
	ProductHttpService: {
		getProducts: jest.fn().mockResolvedValue([{
			id: "1",
			name: "Produto Teste",
			slug: "produto-teste",
			price: 100.00,
			quantity_in_stock: 10,
			category: "categoria-teste",
			description: "Descrição do produto teste",
			image_url: "https://via.placeholder.com/150"
		}]),
	}
}))*/

describe('Search Page', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render search page', async () => {
		const { findByText } = render(<SearchPage initialProducts={mockProducts} />);
		expect(await findByText("Fitros de Produtos")).toBeInTheDocument();
	});

	it('should sender new value in submit input', () => {
		const { push } = useRouter();
		render(<SearchPage initialProducts={mockProducts} />);

		fireEvent.change(screen.getByTestId("search_input"), { target: { value: 'test' } });

		fireEvent.submit(screen.getByTestId("search_form"))

		expect(push).toHaveBeenCalledWith('/products/search?q=test');
	});
})
