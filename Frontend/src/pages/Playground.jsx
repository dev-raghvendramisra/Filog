import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Image from '@editorjs/image'
import List from '@editorjs/list';
import { ImageSelectionCard } from '../components';
import { getWebpImage } from '../utils'; // Utility to process images to WebP format
import InlineCode from '@editorjs/inline-code';
import editorToolConf from '../conf/editorToolConf';

const Playground = () => {
 

  React.useEffect(()=>{
    const editor = new EditorJS({
      holder:'editorHolder',
      data:'',
      placeholder:'Start writing whats in your mind',
      tools:editorToolConf
    })
  },[])

  return (
    <div className="h-100vh w-full flex justify-center items-center">
      <div  id="editorHolder" className="editor-holder"></div>
    </div>
  );
}

export default Playground;
