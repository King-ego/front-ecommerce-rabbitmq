import { Suspense } from "react";
import ProductManagement from "./_component/pageComponent";

export default function Search() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<ProductManagement />
		</Suspense>
	);
}
