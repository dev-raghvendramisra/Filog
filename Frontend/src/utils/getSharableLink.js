import conf from '../conf/conf'


export default  function getSharableLink(platform,blogId,blogTitle,blogAuthor) {
  const encodedUrl = encodeURIComponent(`${conf.productionEndpoint}/blog/${blogId}`);
  const encodedTitle = encodeURIComponent(blogTitle + `\nCheck out this amazing blog on Filog by ${blogAuthor}` );


  
  if(platform=="twitter") return  `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}` ;

  if(platform=="facebook") return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  if(platform=="linkedin") return `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}` ;

  if(platform=="whatsapp") return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
}