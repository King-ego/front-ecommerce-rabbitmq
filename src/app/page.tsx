'use server';

import {ProductHttpService} from "@/requests/http/services/ProductHttpService";
import Home from "@/app/Home";

export default async function ProductsPage() {
	const initialProducts = await ProductHttpService.getProducts();

	return (
		<Home initialProducts={initialProducts} />
	);
}
