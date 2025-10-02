'use server';

import Image from "next/image";
import Link from "next/link";
import { ProductHttpService } from "@/requests/http/services/ProductHttpService";

export default async function Home() {
	const products = await ProductHttpService.getProducts();

	return (
		<section className="w-full">
			<div className="flex flex-wrap p-8 gap-4">
				{products?.map((product) =>
					<div key={product.id}>
						<Image src={`https://dummyimage.com/600x400/cccccc/000000&text=`} alt={`Product`} width={300}
							   height={200}/>
						<Link href={`/product/${product.slug}`}>{product.name}</Link>
						<p>{product.description}</p>
						<p>{Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(product.price)}</p>
					</div>
				)}
			</div>

			{/*<div>
                <Image src='https://dummyimage.com/600x400/cccccc/000000&text=' alt={""} width={300} height={300} />
                <>{JSON.stringify(products, null, 2) }</>
            </div>*/}
		</section>
	);
}
