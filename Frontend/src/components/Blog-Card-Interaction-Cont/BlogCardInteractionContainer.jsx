import React from 'react'
import { NavLink } from 'react-router-dom';
import {BlogCard, BlogInteraction} from '../../components'

function BlogCardInteractionContainer({ blogId, authorName,blogCardType, userData, userProfileId, likeCount, commentCount, blogTitle, blogTags, authorAvatar, createdAt, blogImg, updateLikes, openModal,blogsLiked }) {
    return (
        <div className='relative'>
            <NavLink id={`postLink-${blogId}`} to={`/blog/${blogId}`}>
                <BlogCard
                    type={blogCardType}
                    title={blogTitle}
                    tags={blogTags}
                    coverImage={blogImg}
                    author={authorName}
                    authorImg={authorAvatar}
                    createdAt={createdAt}
                />
            </NavLink>
            <BlogInteraction
                userData={userData}
                userProfileId={userProfileId}
                blogId={blogId}
                openModal={openModal}
                authorName={authorName}
                likeCount={likeCount}
                commentCount={commentCount}
                blogImg={blogImg}
                liked={blogsLiked.includes(blogId)}
                updateLikes={updateLikes}
            />
        </div>
    )
}

export default BlogCardInteractionContainer