
import Head from 'next/head'
import Link from 'next/link';
import Banner from '../components/Banner'
import Header from '../components/Header'
import {sanityClient, urlFor } from "../sanity";
import { Post } from '../typing';

interface Props{
  posts: [Post];
}

export default function Home({posts} : Props){
console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>ReadMyDoc</title>
        <link className='shadow-2xl' rel="icon" href="/readmydoc-logo-removebg-preview.png" />
      </Head>

      <Header/>

     <Banner/>
     
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 p-2 md:p-6 cursor-pointer">

      {posts.map(post =>(

        <Link key={post._id} href={`/post/${post.slug.current}`}>

          <div className='group border rounded-lg overflow-hidden mb-3'>

            <img 
              className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
              src={
              urlFor(post.mainImage).url()! } 
              alt="post-image" />

            <div className='flex justify-between p-5 bg-orange-50'>

                <div>
                    <p>{post.title}</p>
                    <p>{post.author.name}</p>
                </div>

                <img className='b-12 w-12 rounded-full' 
                     src={urlFor(post.author.image).url()} 
                     alt="post-author-img" />

            </div>  
          </div>
        </Link>
      ))}
    </div>
      
    </div>
  );
}

export const getServerSideProps = async () =>{
    const query = `*[_type == "post" ]{
      _id,
      title,
      author->{
      name,
      image
    },
       description,
       mainImage,
       slug
    }`;

    const posts = await sanityClient.fetch(query);

    return{
      props:{
            posts,
      }
    }

};