'use server';

import {ProductHttpService} from "@/requests/http/services/ProductHttpService";
import Home from "@/app/Home";

export default async function ProductsPage() {
	const initialProducts = await ProductHttpService.getProducts();

/*
	if(!loading && !products.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="text-gray-500">Nenhum Produto Encontrado</div>
			</div>
		)
	}*/

	return (
		<Home initialProducts={initialProducts} />
	);
}
