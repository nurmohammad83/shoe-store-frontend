import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import Wrapper from "@/components/Wrapper";
import { fetchDataFromApi } from "@/Utils/api";
import Link from "next/link";

export default function Home({products}) {

  return (
    <main>
      <HeroBanner />
        <Wrapper>
          {/* Heading and paragraph start */}
              <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px] ">
                <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">Cushioning for Your Miles</div>
                <div className="text-md md:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, ducimus dolor. Hic, quam commodi quia iste maxime</div>
              </div>
               {/* Heading and paragraph end */}
              {/* All Products */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
 
                 {
                  products?.map(product=> <ProductCard key={product.id} product={product}/>)
                 }
    
               </div>
        </Wrapper>
    </main>
  )
}


export async function getStaticProps(context) {
  const products = await fetchDataFromApi('/api/prs?populate=*')
  return {
    props: {products:products?.data}, // will be passed to the page component as props
  }
}