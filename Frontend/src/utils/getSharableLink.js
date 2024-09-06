import conf from '../conf/conf'


export default  function getSharableLink({platform,blogId,blogTitle,blogAuthor,clipboard=false}) {
  const encodedUrl = encodeURIComponent(`${conf.productionEndpoint}/blog/${blogId}`);
  const encodedTitle = encodeURIComponent(blogTitle + `\nCheck out this amazing blog on Filog by ${blogAuthor}` );

  if(platform=="twitter") return  ()=> window.open(`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`) ;

  if(platform=="facebook") return ()=> window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);

  if(platform=="linkedin") return ()=> window.open(`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`) ;

  if(platform=="whatsapp") return ()=> window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`);

  
  if(clipboard) return (onErr,onSuccess)=>{
     try {
      navigator.clipboard.writeText(encodedUrl)
      .then(onSuccess)
     } catch {
      onErr()
     }
  };
  
}