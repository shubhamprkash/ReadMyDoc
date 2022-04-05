import { GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typing';

export default function Post() {
  return (
    <main>
        <Header />
    </main>
  );
}

export const getStaticPaths = async() => {
    const query = `*[_type == "post"]{
      _id,
      slug{
        current
      }
    }`;


    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) =>({
      params:{
        slug: post.slug.current
      }
    }));
    return{
      paths,
      fallback: 'blocking'
    }
};

export const getStaticPaths: GetStaticProps = async ({ params }) => {
  
}