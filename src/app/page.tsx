'use client';

import {Suspense, useEffect, useRef, useState} from "react";
import {redirect} from "next/navigation";
import clsx from "clsx";
import {useProductStore} from "@/store";
import {ProductHttpService} from "@/requests/http/services/ProductHttpService";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const { products, setProducts } = useProductStore();
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(()=> {
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

	const formatPrice = ((price: number) => {
		const value = Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(price)

		const [integer, decimal] = value.split(',');
		return (
			<span>
				<span className="text-2xl font-bold text-gray-900">{integer}</span>
				{decimal && <span className="text-sm text-gray-500">,{decimal}</span>}
			</span>
		)
	})

	if(!loading && !products.length) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="text-gray-500">Nenhum Produto Encontrado</div>
			</div>
		)
	}

	return (
		<></>
	);
}
