import ApiRequest from "@/requests/api";
import Product from "@/requests/interfaces/Product";

export class ProductHttpService {
	public static async getProducts(): Promise<Product[]> {
		return ApiRequest<Product[]>('/products', {
			cache: 'force-cache',
			next: {revalidate: 600},
			headers: {
				'Content-Type': 'application/json'
			},
		})
	}

	public static async createProduct(product: Omit<Product, 'id'| 'slug'| 'image_url'>): Promise<void> {
		await ApiRequest<Product>('/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(product)
		})

	}
}

