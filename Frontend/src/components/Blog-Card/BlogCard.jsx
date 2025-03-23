import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { nanoid } from 'nanoid';
import ProfilePic from '../ProfilePic/ProfilePic';
import { NavLink } from 'react-router-dom';
import getMaxLength from '../../utils/getTextCapacity';

function BlogCard({
  loader = false,
  coverImage,
  tags = [],
  title,
  author,
  authorImg,
  authorUserName,
  createdAt,
  type = "horizontal",
  mobile = false,
  classNameBlogCardCont = "",
  classNameBlogCardImgCont = "",
  classNameBlogCardTagCont = "",
  classNameBlogCardHeadingCont = "",
  classNameBlogCardAuthorDateCont = "",
  uniqueId,
  onClick = () => { } }) {

  const headingRef = useRef();
  const authorRef = useRef();
  const fallbackImgRef = useRef();


  const getTruncatedHeading = (minFont, maxFont, minHeight,maxHeight,minWidth,maxWidth)=>{
    if(!loader){
        const maxLen = getMaxLength(mobile ? maxFont : minFont, mobile ? maxHeight : minHeight, mobile ? maxWidth : minWidth, 'vw', title)
        if(maxLen==title.length || maxLen>title.length){
          return title
        }
        return title.substring(0, maxLen - 6) + ' . . .';
      }
  }


  const getTruncatedAuthor = (ref)=>{
    if (ref.current && ref.current.scrollWidth > ref.current.clientWidth) {
      return author.substring(0, author.split(' ')[0].length + 2) + '.'
    }
    return author;
  } 
 

  function getClass(tag, dark = false) {
    return (dark ? `bg-${tag.toLowerCase()}-dark` : `bg-${tag.toLowerCase()}-light`)
  }
  
  function trimTime(time) {
    let str = time.substring(0, time.lastIndexOf(" "))
    return str.substring(0, str.lastIndexOf(" "))
  
  
  }

  return (
    <div id={`BlogCard-${uniqueId}`}
      onClick={onClick}
      className={`flex sm:w-fit relative bg-transparent border-2 dark:bg-darkPrimary_grays dark:border-footer_text_light dark:border-opacity-50 p-1vw sm:p-4vw rounded-3xl cursor-pointer ${type === "horizontal" ? "w-fit gap-8" : "flex-col gap-4"} ${loader ? "dark:bg-opacity-50 " : ""} ${classNameBlogCardCont}`}>
      
      {coverImage || loader ? (
        <div id={`BlogCard-img-cont-${uniqueId}`}
          className={`w-19vw sm:w-60vw sm:h-40vw h-12vw rounded-xl overflow-hidden relative ${loader ? "bg-slate-200 dark:bg-darkPrimary postCardLoader rounded-xl" : ""} ${classNameBlogCardImgCont}`}>
          
          {!loader
            ? <>
              <img ref={fallbackImgRef} id="fallback-img" className='absolute h-100p w-100p object-cover bg-white dark:bg-darkPrimary_grays' src="/fallback img/thumbnailFallback.webp" />
              <img
                onLoad={() => { fallbackImgRef.current.classList.add("hidden") }}
                className='h-100p w-100p object-cover' src={coverImage} />
            </>
            : null}

        </div>
      ) : null}

      <div id="BlogCard-content-wrapper">
        <div id={`BlogCard-tag-cont-${uniqueId}`}
          className={`w-19vw sm:w-60vw h-2vw overflow-scroll hideScrollbar text-0.9vw sm:h-8vw sm:text-3vw flex items-center justify-start gap-3 ${loader ? "bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl" : ""} ${classNameBlogCardTagCont}`}>
          {!loader ? tags.map((tag, idx) => (
            idx <= 2 ? <div className={`dark:${getClass(tag, true)} ${getClass(tag)} text-white px-0.5vw py-0.2vw sm:rounded-xl sm:px-2vw sm:py-1vw roundedxl-md`} key={nanoid(24)}>
              {tag}
            </div> : null
          )) : null}
        </div>

        <div id={`BlogCard-heading-cont-${uniqueId}`}
          className={`w-19vw sm:mt-2vw sm:w-60vw h-6vw sm:h-12vw overflow-hidden text-1.3vw sm:text-4vw mt-0.8vw ${loader ? "bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl" : ""} ${classNameBlogCardHeadingCont}`} ref={headingRef}>
          {!loader ? <p className='font-semibold' id={`BlogCard-heading-${uniqueId}`}>{
            getTruncatedHeading(1.3,4,6,12,19,60)
            }</p> : null}
        </div>

        {
          author || loader ?
            <div id={`BlogCard-author-date-cont-${uniqueId}`}
              className={`w-19vw sm:w-60vw text-footer_text_light dark:text-footer_text flex-shrink-0 flex items-center justify-between gap-1 sm:gap-4 text-1vw overflow-hidden ${type === "horizontal" && loader ? "h-2vw" : "h-fit mt-1vw sm:mt-4vw"} ${loader ? "bg-slate-200 postCardLoader dark:bg-darkPrimary rounded-xl h-2vw" : "h-4vw"} ${classNameBlogCardAuthorDateCont}`}
              ref={authorRef}>
              {!loader ? <>
                <div className='flex items-center gap-2 hover:text-primary transition-all sm:text-3.5vw dark:hover:text-primary_darkMode'>
                  <NavLink to={`/user/@${authorUserName}`} className='flex items-center gap-2 hover:text-primary transition-all dark:hover:text-primary_darkMode'>
                    <ProfilePic height='h-2vw sm:h-8vw' width='w-2vw sm:w-8vw' className='ml-0' src={authorImg} />
                    <span className='whitespace-nowrap hover:underline hover:underline-offset-4 hover:underline-2'>{getTruncatedAuthor(authorRef)}</span>
                  </NavLink>
                </div>
                <div id={`BlogCard-date-cont ${uniqueId}`} className='whitespace-nowrap sm:text-3.5vw'>
                  {trimTime(createdAt)}
                </div>
              </> : null}
            </div>
          : null
        }
      </div>
    </div>
  );
}

export default BlogCard;





