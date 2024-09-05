import React, { useState, useEffect, useRef } from 'react';
import { ID } from 'appwrite';
import ProfilePic from '../ProfilePic/ProfilePic';


function BlogCard({ 
  loader=false,
  coverImage, 
  tags = [], 
  title, 
  author, 
  authorImg, 
  createdAt,
  type="horizontal",
  classNameBlogCardCont="",
  classNameBlogCardImgCont="",
  classNameBlogCardTagCont="",
  classNameBlogCardHeadingCont="",
  classNameBlogCardAuthorDateCont="",
  onClick=()=>{} }) {
    
  const headingRef = useRef();
  const authorRef = useRef();
  const fallbackImgRef = useRef();
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [truncatedAuthor, setTruncatedAuthor] = useState(author);
  const [rerender, forceRerender]  = React.useState(false);
  const uniqueId = ID.unique();
 
  


  useEffect(() => {
    if(!loader){
    if (headingRef.current && headingRef.current.scrollHeight > headingRef.current.clientHeight) {
      setTruncatedTitle(title.substring(0, 67) + ' . . .');
    }
    if (authorRef.current && authorRef.current.scrollWidth > authorRef.current.clientWidth) {
      setTruncatedAuthor(author.substring(0, 12) + '.');
     
    }}

  }, [rerender]);

  useEffect(()=>{
    const timer = setTimeout(()=>{forceRerender(true)},500)
    return ()=>{
      clearTimeout(timer)
    }

  },[])

  function getClass(tag,dark=false) {
    return (dark?`bg-${tag.toLowerCase()}-dark`:`bg-${tag.toLowerCase()}-light`)
  }

  function trimTime(time){
    let str= time.substring(0,time.lastIndexOf(" "))
    return str.substring(0,str.lastIndexOf(" "))


  }

  return (
    <div id={`BlogCard-${uniqueId}`} 
    onClick={onClick}
    className={`flex relative bg-transparent border-2 dark:bg-darkPrimary_grays dark:border-footer_text_light dark:border-opacity-50 p-1vw rounded-3xl cursor-pointer ${type=="horizontal" ? "w-fit gap-8":"flex-col gap-4"} ${loader?"dark:bg-opacity-50 ":""}
    ${classNameBlogCardCont}`}>

      {coverImage || loader ? (
        <div id={`BlogCard-img-cont-${uniqueId}`} 
        className={`w-19vw h-12vw rounded-xl overflow-hidden relative
        ${loader?"bg-slate-200  dark:bg-darkPrimary postCardLoader rounded-xl":""}
        ${classNameBlogCardImgCont}`}>

         {!loader
         ? <>
          <img ref={fallbackImgRef} id="fallback-img" className='absolute h-100p w-100p object-cover bg-white dark:bg-darkPrimary_grays' src="/fallback img/thumbnailFallback.webp" />
          <img 
          onLoad={()=>{fallbackImgRef.current.classList.add("hidden")}}
          className='h-100p w-100p object-cover' src={coverImage} />
          </>
          :null }   

        </div>
      ) : null}
      <div id="BlogCard-content-wrapper">

      
      <div id={`BlogCard-tag-cont-${uniqueId}`} 
      className={`w-19vw h-2vw  overflow-scroll hideScrollbar text-0.9vw flex items-center justify-start gap-3 
      ${loader?"bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl":""}
      ${classNameBlogCardTagCont}`} >
        
        {!loader?tags.map((tag,idx) => (
          idx<=2?<div  className={`dark:${getClass(tag,true)} ${getClass(tag)} text-white px-0.5vw py-0.2vw rounded-md`} key={ID.unique()}>
            {tag}
          </div>:null
        )):null}
      </div>

      <div  id={`BlogCard-heading-cont-${uniqueId}`} 
        className={`w-19vw h-6vw overflow-hidden text-1.3vw mt-0.8vw 
        ${loader?"bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl":""} 
        ${classNameBlogCardHeadingCont}`} ref={headingRef}>

       { !loader? <p className='font-semibold' id={`BlogCard-heading-${uniqueId}`}>{truncatedTitle}</p>:null}

      </div>

      {
        author || loader?
      <div id={`BlogCard-author-date-cont-${uniqueId}`} 
      className={`w-19vw   text-footer_text_light dark:text-footer_text flex-shrink-0 flex items-center justify-between gap-1 text-1vw overflow-hidden 
        ${type=="horizontal" && "h-fit mt-1vw"}
        ${loader?"bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl h-2vw":"h-4vw"} 
        ${classNameBlogCardAuthorDateCont}`}
       >
        {!loader?<>
        <div className='flex items-center gap-2' ref={authorRef}>
          <ProfilePic height='h-2vw' width='w-2vw' className='ml-0' src={authorImg} />
          <span 
          className='whitespace-nowrap'>
           {truncatedAuthor}
          </span>
          </div>
          <div id={`BlogCard-date-cont ${uniqueId}`}
           className='whitespace-nowrap'>   
            {trimTime(createdAt)}
        </div>
        </>:null}

      </div>:null
      }
     </div>
    </div>
  );
}

export default BlogCard;


