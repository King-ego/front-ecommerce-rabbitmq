'use server';

import {ProductHttpService} from "@/requests/http/services/ProductHttpService";
import HomePage from "@/app/HomePage";

export default async function ProductsPage() {
	const initialProducts = await ProductHttpService.getProducts();

	return (
		<HomePage initialProducts={initialProducts} />
	);
}
