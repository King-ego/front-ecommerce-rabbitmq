"use server"
import SearchPage from "./SearchPage";
import {ProductHttpService} from "@/requests/http/services/ProductHttpService";

export default async function Search() {
	const products = await ProductHttpService.getProducts();
	return (
			<SearchPage  initialProducts={products} />
	);
}
