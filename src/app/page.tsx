'use server';

import Image from "next/image";
import ApiRequest from "@/requests/api";
import Product from "@/requests/interfaces/Product";

export default async function Home() {
    const products = await ApiRequest<Product[]>('/products', {
        cache: 'force-cache',
        next: { revalidate: 600 },
        headers: {
            'Content-Type': 'application/json'
        },
    })

    console.log({products});


    return (
        <div className="">
           <main>
               {products?.map((product) =>
                   <div key={product.id}>
                     <Image src={`https://dummyimage.com/600x400/cccccc/000000&text=`} alt={`Product`} width={300} height={200} />
                     <p>{product.name}</p>
                   </div>
               )}
           </main>

            {/*<div>
                <Image src='https://dummyimage.com/600x400/cccccc/000000&text=' alt={""} width={300} height={300} />
                <>{JSON.stringify(products, null, 2) }</>
            </div>*/}
        </div>
    );
}
