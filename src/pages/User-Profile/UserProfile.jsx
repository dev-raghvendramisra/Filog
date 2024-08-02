import React, { useRef } from 'react'
import { authServices, dbServices } from '../../backend-services';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function UserProfile() {
  const{userData } = useSelector((state) => state.auth);
  const author = useSelector((state)=>state.userProfile)

  

  return (
    <div className='pt-20p'>UserProfile
      // <button
  onClick={async() => {
   await authServices.logout();
    toast(`Bye, ${userData.name}`, {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        width:"fit-content",
        fontSize:"1vw",
      }
    });
    location.reload()}
  }
>
  logout
</button>

  <button onClick={()=>{
    uploadBlogs(documents)
  }
}>Upload</button>
    </div>
  )
}

export default UserProfile



// const documents = useRef( [
//   {
//     title: "The Role of Technology in Modern Healthcare: Innovations and Challenges",
//     content: "An overview of how technology is transforming healthcare and the challenges faced.",
//     createdAt: "Jul 27 2024 08:40 AM",
//     status: true,
//     coverImageId: "66ac3c1100113ea4ae66",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c1100113ea4ae66"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Technology", "Health"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   },
//   {
//     title: "Financial Literacy for Youth: Essential Knowledge for Future Success",
//     content: "Providing youth with the financial knowledge they need for future success.",
//     createdAt: "Jul 28 2024 10:55 AM",
//     status: true,
//     coverImageId: "66ac3c1a000d2a517b2b",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c1a000d2a517b2b"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Finance", "Education"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   },
//   {
//     title: "The Benefits of Outdoor Activities for Mental Health",
//     content: "Explore how engaging in outdoor activities can benefit mental health.",
//     createdAt: "Jul 29 2024 11:05 AM",
//     status: true,
//     coverImageId: "66ac3c2200154e56e599",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c2200154e56e599"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Nature", "Health"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   },
//   {
//     title: "Technological Advances in Education: Enhancing Learning Experiences",
//     content: "How technological advances are enhancing learning experiences in education.",
//     createdAt: "Jul 30 2024 09:20 AM",
//     status: true,
//     coverImageId: "66ac3c3000171834c2bd",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c3000171834c2bd"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Education", "Technology"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   },
//   {
//     title: "The Evolution of Sports: From Ancient Times to Modern Day",
//     content: "A historical look at the evolution of sports through the ages.",
//     createdAt: "Jul 31 2024 08:55 AM",
//     status: true,
//     coverImageId: "66ac3c3c000aacd59990",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c3c000aacd59990"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Sports", "Lifestyle"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   },
//   {
//     title: "Fashion Innovations: How Technology is Influencing Style",
//     content: "An exploration of how technological innovations are influencing fashion trends.",
//     createdAt: "Aug 1 2024 10:05 AM",
//     status: true,
//     coverImageId: "66ac3c450037a3ad1606",
//     coverImageUrl: dbServices.generateImgUrl("66ac3c450037a3ad1606"),
//     subImageId: [],
//     subImageUrl: [],
//     tags: ["Fashion", "Technology"],
//     authorName: author.userName,
//     userId: author.userId,
//     authorAvatar: author.userAvatar
//   }
// ])


// async function uploadBlogs({current}){
//     const results = [];

//     for (const document of current) {
//         try {
//             console.log("uploading blog",document);
//             const result = await dbServices.createBlog(document)
//             results.push(result);
//         } catch (error) {
//             console.log("Bulk creation error:", error);
//             results.push({ error: error });
//         }
//     }

//     console.log(results); 
// }