import React from 'react';
import useTheme from '../../context/themeContext';

function ErrorPlaceHolderImage({ 
  type="post",
  customErrMsg="",
  postErrMsg= "The people you follow haven't posted any blogs yet. Check back later for updates!" ,
  userErrMsg="You haven't followed anyone yet. Follow some people to see their blogs in this section!",
  classNameText="w-54p",
  classNameImg="",
  classNameCont="" }) {
  
  const {isDark} = useTheme()

   React.useCallback(function getImage(type){
      if (type=="post") return isDark ?"/error-placeholders/postErr-dark.webp": "/error-placeholders/postErr-light.webp"
      else if(type!=="post") return isDark?"/error-placeholders/userErr-dark.webp": "/error-placeholders/userErr-light.webp"
   },[isDark])
  
  return (
    <div className={`flex w-100p justify-center text-1.1vw mt-4vw flex-col items-center ${classNameCont}`}>
      <img 
        className={`h-16vw p-1vw ${classNameImg}`}
        src={type=="post" ? getImage(type) : getImage(type)} 
        alt={type=="post" ? "No posts from followed users" : "No followed users"} 
      />
      <h1 className={` mt-1vw text-center text-footer_text_light dark:text-footer_text ${classNameText}`}>
        {type=="post" 
          ? customErrMsg?customErrMsg:postErrMsg
          : customErrMsg?customErrMsg:userErrMsg
        }
      </h1>
    </div>
  );
}

export default ErrorPlaceHolderImage;
