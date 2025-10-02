import Product from "@/requests/interfaces/Product";

export interface ProductState {
	products: Product[];
	addProduct: (product: Product) => void;
	deleteProduct: (productId: string) => void;
	setProducts: (products: Product[]) => void;
}
