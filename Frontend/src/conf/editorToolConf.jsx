import React from 'react';
import ReactDOM from 'react-dom';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { ImageSelectionCard } from "../components"; // Assuming this is your custom component

class CustomImageTool {
  constructor({ data, api, config }) {
    this.data = data || {};
    this.api = api;
    this.config = config || {};
    this.imageUrl = this.data.imageUrl || ''; // If there's an imageUrl saved in data, use it
    this.imageSrc = this.imageUrl; // Initialize imageSrc to the saved value (or empty string)
  }

  render() {
    const container = document.createElement('div'); // Create a container for React component

    // Render ImageSelectionCard component into the container div
    ReactDOM.render(
      <ImageSelectionCard
        setFile={(file) => {
          // Update the imageSrc when a file is selected
          this.imageSrc = URL.createObjectURL(file); // Create an object URL for the image
          this.data.imageUrl = file; // Store the file in the data for saving
        }}
        imgsrc={this.imageSrc} // Pass the current imageSrc to ImageSelectionCard for display
      />,
      container
    );

    return container; // Return the container that holds the React component
  }

  save() {
    // Return the image URL (or file object if needed) in the saved data
    return {
      imageUrl: this.data.imageUrl, // Save the file object or URL, depending on your requirement
    };
  }
}

// Define the editor tool configuration
const editorToolConf = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Type your heading . . .",
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  image:  CustomImageTool, // Use the custom image tool for handling image selection
  
};

export default editorToolConf;
