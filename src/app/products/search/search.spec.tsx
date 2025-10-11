import { render, fireEvent, screen } from '@testing-library/react';
import SearchPage from "./page";

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
		query: {},
	}),
	useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

describe('Search Page', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render search page', async () => {
		const { findByText } = render(<SearchPage />);
		expect(await findByText("Fitros de Produtos")).toBeInTheDocument();
	});

	it('should sender new value in submit input', () => {
		const { push } = require('next/navigation').useRouter();
		render(<SearchPage />);

		fireEvent.change(screen.getByTestId("search_input"), { target: { value: 'test' } });

		fireEvent.submit(screen.getByTestId("search_form"))

		expect(push).toHaveBeenCalledWith('/products/search?q=test');
	});
})
