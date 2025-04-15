// // import React, { useEffect, useRef, useState } from 'react';
// // import EditorJS from '@editorjs/editorjs';
// // import Header from '@editorjs/header';
// // import List from '@editorjs/list';
// // import { ImageSelectionCard } from '../components';
// // import { getWebpImage } from '../utils'; // Utility to process images to WebP format

// // const Playground = () => {
// //   const editorHolder = React.useRef(null); // Hold the editor instance
// //   const [imageData, setImageData] = useState({}); // Track image URLs for each block
  
// //   const handleImageSelect = async (imageFile, blockId) => {
// //     // Use the utility to convert to WebP or handle the image as needed
// //     const finalFile = await getWebpImage(imageFile);
// //     setImageData(prevData => ({
// //       ...prevData,
// //       [blockId]: finalFile // Store the image URL for the specific block ID
// //     }));
  
// //     // Add the selected image to the editor data
// //     const data = await editor.save();
// //     const blockIndex = data.blocks.findIndex(block => block.id === blockId);
// //     if (blockIndex !== -1) {
// //       data.blocks[blockIndex].data.file.url = finalFile; // Update the image URL for the correct block
// //     }
  
// //     // You can optionally re-set the data in the editor
// //     editor.blocks.render(data);
// //   };
  
// //   // Custom Image Tool Class for integrating ImageSelectionCard
// //   class CustomImageTool {
// //     render() {
// //       // Generate a unique block ID for each instance
// //       const blockId = `image-block-${Math.random().toString(36).substr(2, 9)}`;
// //       return (
// //         <ImageSelectionCard 
// //           message="Click to upload your image"
// //           setFile={(file) => handleImageSelect(file, blockId)} 
// //           imgsrc={imageData[blockId] || null} // Set image URL from state
// //         />
// //       );
// //     }
// //   }
  


// //   const editor = new EditorJS({
// //     holder: editorHolder.current,
// //     placeholder: "Start your blog from here!",
// //     tools: {
// //       header: {
// //         class: Header,
// //         inlineToolbar: ['link']
// //       },
// //       list: {
// //         class: List,
// //         inlineToolbar: true
// //       },
// //       image: {
// //         class: CustomImageTool,
// //         inlineToolbar: true,
        
// //       }
// //     },
// //     data: {},
// //     onReady: () => {
// //       ;
// //     },
// //     onChange: async() => {
// //       const data = await editor.save();
// //       ;
// //       // Update the data (you can send it to your server here)
// //     }
// //   });


// //   // Function to handle image selection and store image in editor data

// //   return (
// //     <div className="h-100vh w-full flex justify-center items-center">
// //       <div ref={editorHolder} id="editorHolder" className="editor-holder"></div>
// //     </div>
// //   );
// // }

// // export default Playground;


// const encoded = `https://api.example.com/search?query=`+encodeURIComponent(`${JSON.stringify({name:"John Doe",age:25})}`)

// 
// ) // https://api.example.com/search?query={"name":"John Doe","age":25}