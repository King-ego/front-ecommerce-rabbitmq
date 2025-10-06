import {render} from "@testing-library/react";
import AppPage from "./page"
import {ProductHttpService} from "@/requests/http/services/ProductHttpService";

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
})
