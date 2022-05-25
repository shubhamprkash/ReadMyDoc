import { GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typing';
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

function Post( { post }: Props) {
  
  // console.log(post);

  return (
    <main>
      <head>
        <title>Posts</title>
      </head>
        <Header />

        <img className='w-full h-60 object-cover'
         src={ urlFor( post.mainImage ).url()! }  alt="post-main-img"/>

         <article className='max-w-3xl mx-auto p-5'>
            <h1 className='text-4xl mt-10 mb-3'>{ post.title }</h1>
            <h2 className='ml-3 mb-5 text-xl font-line text-gray-500'>{ post.description }</h2>
            
            <div className="flex items-center  space-x-2">
              <img 
                  className='m-3 h-10 w-10 rounded-full '
                  src={urlFor( post.author.image ).url()!} alt="post-author-img" />
              <p className='font-extralight text-sm'>
                Blog post by <span className='text-red-600'> { post.author.name } </span>- Published at {" "}
                
                {/* ****************  time issue here 
                 **********   Innvalid date ****************************/}
                {console.log(" datae dekho ")}
                {new Date(post._createdAt).toLocaleString(`Date`)}
                {console.log("testing pring date")}
                                     
                {}
              </p>
            
            </div>

            <div className='mt-10'>
              <PortableText 
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="text-xl font-bold my-5" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={ href } className="text-blue-500 hover:underline">
                   { children }
                  </a>
                ),
              }}
              />
                
            </div>
         
         </article>
    </main>
  );
}

export default Post;


// query to display the post title and author with demo img

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


// post query for loading the post into new page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
                  _id,
                  _createAt,
                  title,
                  author->{
                    name,
                    image
                  },
                  'comments': *[
                      _type == "comment" &&
                      post._ref == ^._id &&
                      approved == true],
                  description,
                  mainImage,
                  slug,
                  body
                }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if(!post){
      return{
        notFound : true
      };
    }

      return{
        props:{
          post,
        },
        revalidate: 60,           //  cache update in every 60 sec
    };


};