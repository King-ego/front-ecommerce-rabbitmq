import { render } from '@testing-library/react';
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
})
