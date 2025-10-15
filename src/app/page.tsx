'use client';

import Image from "next/image";
import clsx from "clsx";
import { ProductHttpService } from "@/requests/http/services/ProductHttpService";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import {useProductStore} from "@/store";
import AppPage from "./_page.component";

export default function Home() {
	const { products, setProducts } = useProductStore();
	const [ loading, setLoading ] = useState(false);
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(()=> {
		setLoading((state) => !state);
		ProductHttpService.getProducts()
			.then(resp=> {
				setProducts(resp)
			})
			.finally(()=>setLoading(state => !state))
	},[setProducts])

	const handleSearch = () => {
		if (ref.current?.value) {
			redirect(`/products/search?q=${ref.current.value || ''}`);
		}
	}

	if(!loading && !products.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="text-gray-500">Nenhum Produto Encontrado</div>
			</div>
		)
	}

	return (
		<AppPage products={products} handleSearch={handleSearch} />
	);
}
