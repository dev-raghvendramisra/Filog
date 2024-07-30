import React, { useState, useEffect, useRef } from 'react';
import { ID } from 'appwrite';


function PostCard({ coverImage, tags = [], title, author, authorImg, createdAt,classNamePostCardCont="",classNamepostCardImgCont="",classNamePostCardTagCont="",classNamePostCardHeadingCont="",classNamePostCardAuthorDateCont="" }) {
  const headingRef = useRef();
  const authorRef = useRef();
  const [truncatedTitle, setTruncatedTitle] = useState(title);
  const [truncatedAuthor, setTruncatedAuthor] = useState(author);
  const [rerender, forceRerender]  = React.useState(false)
  
  

  useEffect(() => {
    if (headingRef.current && headingRef.current.scrollHeight > headingRef.current.clientHeight) {
      setTruncatedTitle(title.substring(0, 67) + ' . . .');
    }
    if (authorRef.current && authorRef.current.scrollWidth > authorRef.current.clientWidth) {
      setTruncatedAuthor(author.substring(0, 12) + '.');
     
    }

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
    <div className={`flex  bg-transparent border-2 dark:bg-darkPrimary_grays dark:border-footer_text_light  p-1vw rounded-3xl ${classNamePostCardCont}`}>

      {coverImage ? (
        <div id={`postCard-img-cont-${ID.unique()}`} className={`w-19vw h-12vw rounded-xl overflow-hidden ${classNamepostCardImgCont}`}>
          <img className='h-100p w-100p object-cover' src={coverImage} />
        </div>
      ) : null}
      <div id="postCard-content-wrapper">

      
      <div id={`postCard-tag-cont-${ID.unique()}`} className={`w-19vw h-2vw  overflow-hidden text-0.9vw flex items-center justify-start gap-3 ${classNamePostCardTagCont}`} >
        {tags.map((tag) => (
          <div  className={`dark:${getClass(tag,true)} ${getClass(tag)} text-white px-0.5vw py-0.2vw rounded-md`} key={ID.unique()}>
            {tag}
          </div>
        ))}
      </div>

      <div  id={`postCard-heading-cont-${ID.unique()}`} className={`w-19vw h-6vw overflow-hidden text-1.3vw mt-0.8vw ${classNamePostCardHeadingCont}`} ref={headingRef}>
        <p className='font-semibold' id={`postCard-heading-${ID.unique()}`}>{truncatedTitle}</p>
      </div>
      {
        author?
      <div id={`postCard-author-date-cont-${ID.unique()}`} 
      className={`w-19vw h-4vw  text-footer_text_light dark:text-footer_text flex-shrink-0 flex items-center justify-between gap-1 text-1vw overflow-hidden ${classNamePostCardAuthorDateCont}`}
       >
        <div className='flex items-center gap-2' ref={authorRef}>
        <img src={authorImg} 
        className="h-2vw w-2vw object-cover rounded-full" />
        <span 
        className='whitespace-nowrap'>
          {truncatedAuthor}
        </span>
        </div>
        <div id={`postCard-date-cont ${ID.unique()}`}
         className='whitespace-nowrap'>   
          {trimTime(createdAt)}
        </div>
      </div>:null
      }
</div>
    </div>
  );
}

export default PostCard;


