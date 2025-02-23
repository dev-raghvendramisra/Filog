const getMaxLength = (fontSize, height, width, unit, string) => {
  // Create a temporary element to measure text dimensions
  const elem = document.createElement("p");
  Object.assign(elem.style, {
    fontSize: `${fontSize}${unit}`,
    width: `${width}${unit}`,
    height: `${height}${unit}`,
    whiteSpace: "normal",
    margin: "0",
    padding: "0",
    visibility: "hidden",
    position: "absolute",
  });

  document.body.appendChild(elem);

  const words = string.split(" ");
  let maxLength = 0;

  for (let i = 0; i < words.length; i++) {
    const testText = words.slice(0, i + 1).join(" ");
    elem.innerHTML = testText;

    if (elem.scrollHeight > elem.clientHeight) {
      break;
    }

    maxLength = testText.length;
  }
  height
  document.body.removeChild(elem); // Clean up the DOM
  return maxLength;
};

export default getMaxLength;
