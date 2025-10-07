'use client';

import Image from "next/image";
import clsx from "clsx";
import { ProductHttpService } from "@/requests/http/services/ProductHttpService";
import { Suspense, useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";
import {useProductStore} from "@/store";

export default function Home() {
	const {products, setProducts} = useProductStore();
	const [loading, setLoading] = useState(false);
	const ref = useRef<HTMLInputElement | null>(null);

	useEffect(()=> {
		setLoading((state) => !state);
		ProductHttpService.getProducts()
			.then(resp=> {
				setProducts(resp)
			})
			.finally(()=>setLoading(state => !state))
	},[])

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
		<section className="container mx-auto px-4 py-8 bg-[#171717] min-h-screen">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-400 mb-2">Produtos Cadastrados</h1>
				<p className="text-gray-200">Gerencie todos os produtos do seu catálogo</p>
			</div>

			<div className="rounded-lg shadow-sm p-6 mb-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

					<div className="flex-1">
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center">
								<button
									className="text-white font-medium transition duration-200 flex items-center gap-2"
									onClick={() => handleSearch()}
									data-testid="search_button"
								>
									<svg className="w-5 h-5" fill="none" stroke="#171717" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
											  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>

								</button>
							</div>
							<input
								type="text"
								ref={ref}
								data-testid="search_input"
								placeholder="Pesquisar produtos por nome, categoria..."
								className="block w-full pl-10 pr-3 py-2 text-gray-600 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>


				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				<Suspense fallback={<div>Procurando Produtos</div>}>
					{products.map(product => (
						<div
							key={product.id}
							className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-200">

							<div className="h-48 bg-gray-200 relative">
								{/*<img
								src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
								alt="Produto"
								className="w-full h-full object-cover"
							/>*/}
								<Image className="w-full h-full object-cover"
									   src={product.image_url || "https://dummyimage.com/600x400/cccccc/000000&text="}
									   alt={product.name} width={800}
									   height={80} priority/>
								<div className="absolute top-3 right-3">
								<span className={
									clsx("text-xs px-2 py-1 rounded-full font-medium",
										product.quantity_in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')
								}>
									{product.quantity_in_stock ? 'Em estoque' : 'Sem estoque'}
								</span>
								</div>
							</div>

							<div className="p-4">
								<div className="mb-2">
								<span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
									{product.category}
								</span>
								</div>

								<h3 className="font-semibold text-gray-800 mb-1 text-lg">{product.name}</h3>

								<p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
									{product.description}
								</p>
								<div className="flex justify-between items-center mb-3">
									<div>
										{formatPrice(product.price)}
									</div>
									<div className="text-sm text-gray-600">
										<span className="font-medium">{product.quantity_in_stock}</span> em estoque
									</div>
								</div>

								<div className="flex gap-2">
									<button
										className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
										Editar
									</button>
									<button
										className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium transition duration-200">
										Excluir
									</button>
								</div>
							</div>
						</div>
					))}
				</Suspense>
			</div>
		</section>
	);
}
