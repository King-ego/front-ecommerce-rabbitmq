import { Suspense } from "react";
import ProductManagement from "./pageComponent";

export default function Search() {
	return (
		<Suspense fallback={<div>Carregando...</div>}>
			<ProductManagement />
		</Suspense>
	);
}
