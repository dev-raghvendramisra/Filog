import React from 'react'
import { HomeHero, HomeUpper } from '../../Components'
import {PostCard} from '../../Components';

function Home() {

  const posts = [ //mock data for testing
    {
      title: "Workflow and Internal Mechanics of CSS with PostCSS and Vite",
      content: "In modern web development, tools such as Vite and PostCSS are essential for optimizing CSS, particularly within frameworks like React. This article explores the setup and optimization of CSS using PostCSS plugins like Tailwind CSS and AutoPrefixer within a project powered by Vite.",
      createdAt: "Jul 22 2024 21:32 AM",
      status: true,
      coverImgId: "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhqfnb7dorvnjq735oud9.jpg",
      subImagesId: [],
      tags:["Technology", "Lifestyle", "Nature"],
      author: "Raghvendra Misra",
      authorImg: "https://api.dicebear.com/9.x/micah/svg?seed=66a29c840017bf5eb34a&scale=100&flip=true&baseColor=f9c9b6&seed=raghav&backgroundColor=194FE6"
      },
    // {
    //   title: "Exploring Server-Side Rendering with Next.js",
    //   content: "Server-side rendering (SSR) with Next.js offers improved performance and SEO benefits. This post delves into how to set up SSR in a Next.js project, with examples and best practices.",
    //   createdAt: "Aug 15 2024 14:45 PM",
    //   status: true,
    //   coverImgId: "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fnextjs.jpg",
    //   subImagesId: [],
    //   author: "Alex Johnson",
    //   authorImg: "https://api.dicebear.com/9.x/micah/svg?seed=alex&scale=100&flip=true&baseColor=f9c9b6&backgroundColor=194FE6"
    // },
    // {
    //   title: "Understanding State Management with Redux in React",
    //   content: "Redux is a powerful state management tool for React applications. This article covers the core concepts of Redux, including actions, reducers, and the store, along with practical examples.",
    //   createdAt: "Sep 05 2024 10:20 AM",
    //   status: true,
    //   coverImgId: "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fredux.jpg",
    //   subImagesId: [],
    //   author: "Emily Smith",
    //   authorImg: "https://api.dicebear.com/9.x/micah/svg?seed=emily&scale=100&flip=true&baseColor=f9c9b6&backgroundColor=194FE6"
    // },
    // {
    //   title: "Building Responsive Layouts with CSS Grid",
    //   content: "CSS Grid offers a powerful way to create responsive web layouts. This post demonstrates how to use CSS Grid to build complex layouts with minimal code.",
    //   createdAt: "Oct 10 2024 08:55 AM",
    //   status: true,
    //   coverImgId: "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcssgrid.jpg",
    //   subImagesId: [],
    //   author: "Michael Lee",
    //   authorImg: "https://api.dicebear.com/9.x/micah/svg?seed=michael&scale=100&flip=true&baseColor=f9c9b6&backgroundColor=194FE6"
    // },
    // {
    //   title: "Optimizing Web Performance with Lighthouse",
    //   content: "Google Lighthouse is an essential tool for web performance auditing. This article covers how to use Lighthouse to identify performance bottlenecks and optimize your web applications.",
    //   createdAt: "Nov 12 2024 12:30 PM",
    //   status: true,
    //   coverImgId: "https://media.dev.to/cdn-cgi/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Flighthouse.jpg",
    //   subImagesId: [],
    //   author: "Sophia Brown",
    //   authorImg: "https://api.dicebear.com/9.x/micah/svg?seed=sophia&scale=100&flip=true&baseColor=f9c9b6&backgroundColor=194FE6"
    // }
  ];
  
 
  

  return (
    <div className='flex flex-col justify-start gap-80 items-center min-h-100vh  mb-6vw'>
      <HomeUpper />
      {/* <h1>Get Featured</h1> */}

      <div>
          <PostCard title={posts[0].title} createdAt={posts[0].createdAt} content={posts[0].content} coverImage={posts[0].coverImgId} author={posts[0].author} authorImg={posts[0].authorImg} tags={posts[0].tags} />
      </div>
      <HomeHero />
    </div>
  )
}

export default Home