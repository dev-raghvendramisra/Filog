import React from 'react';
import { ColorRing } from 'react-loader-spinner';

function Button({
  children = "Button",
  onClick = () => {},
  className = '',
  wide = false,
  disabled = false,
  disabledBg = "bg-gray-100 dark:bg-darkPrimary_grays",
  type = 'button',
  primary = false,
  danger = false,
  outline = false,
  loading = false,
  ...props
}) {
  const baseClasses = `
    text-1vw flex justify-center transition-all overflow-hidden items-center gap-1 border-2 rounded-full
    ${wide ? "py-0.5vw" : "py-0.7vw"} px-2vw
    ${className}
  `;

  const disabledClasses = disabled
    ? `border-gray-300 text-gray-400 border-transparent pointer-events-none ${disabledBg}`
    : "";

  const primaryClasses = primary
    ? "bg-primary dark:bg-primary_darkMode border-primary dark:border-primary_darkMode text-white active:bg-opacity-70 active:scale-110 active:bg-primary/60 dark:active:bg-primary_darkMode/60"
    : "";

  const dangerClasses = danger
    ? "bg-red-500 border-red-500 text-white active:bg-opacity-70"
    : "";

  const outlineClasses = outline
    ? "bg-transparent hover:hoverAnim border-gray-700 text-gray-700 dark:border-gray-400 dark:text-gray-400"
    : "";

  const loaderColor = `#9ca3af`
   
  return (
    <button
      style={{ opacity: "1", transform: "translateY(0)" }}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${disabledClasses} ${primaryClasses} ${dangerClasses} ${outlineClasses}`}
      {...props}
    >
      {loading  &&
        <ColorRing
          visible={true}
          height="1.5vw"
          width="1.5vw"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={new Array(5).fill(loaderColor)}
        />
       }
       {children}
    </button>
  );
}

export default Button;
