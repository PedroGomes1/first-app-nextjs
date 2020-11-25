import SEO from '../components/SEO';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Title } from '../styles/pages/Home';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>

      <SEO
        title="DevCommerce, blablabla"
        shouldExcludeTitleSuffix
        image="boost.png"
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(product.data.title)}
                  </a>
                </Link>
              </li>
            )

          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async() => {

  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product') //Trago todos os documentos do tipo produto
  ])
  
  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    }
  }
}