
export default async function getProfileMetatags(profileData) {
    const {jsFile, cssFile} = (()=>({jsFile:"/assets/index.js",cssFile:"/assets/index.css"}))()
    if(profileData, jsFile, cssFile){
        return (
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="title" content="${profileData.title}">
    <meta name="description" content="Filog is a blogging platform where users can create accounts, write articles, and share their blogs with the world. Join Filog and start blogging today! Crafting Narratives, Lighting the Way Forward.">

    <!-- Open Graph / Facebook Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${profileData.siteUrl}">
    <meta property="og:title" content="${profileData.title} • Filogger">
    <meta property="og:description" content="${profileData.description}">
    <meta property="og:image" content="${profileData.imgUrl}">
    <meta property="og:site_name" content="Filog">

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${profileData.siteUrl}">
    <meta name="twitter:title" property="twitter:title" content="${profileData.title} • Filogger">
    <meta name="twitter:description" property="twitter:description" content="${profileData.description}">
    <meta name="twitter:image" property="twitter:image" content="${profileData.imgUrl}">

    <!-- Additional Meta Tags -->
    <meta name="keywords" content="blogging, articles, write blogs, share blogs, create account, Filog, blogging platform">
    <meta name="author" content="Your Name or Your Company Name">
    <meta name="robots" content="index, follow">
    <meta name="title" content="Filog-blogging app">

    <meta name="description" content="filog is a blogging app which makes user create their account and write articles and share them there ">
    <meta name="keywords" content="blog, filog, blogging app">
    <link rel="icon" type="image/png" sizes="192x192" href="/meta/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png">
    <link rel="manifest" href="/meta/site.webmanifest">
    <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${profileData.title} • Filogger</title>
    <script type="module" crossorigin src="${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="${cssFile}">
  </head>
  <body class="dark:bg-darkPrimary min-h-screen">
    <div id="root" ></div>
  </body>
</html>`
        )
        
    }
    else return null;
}
