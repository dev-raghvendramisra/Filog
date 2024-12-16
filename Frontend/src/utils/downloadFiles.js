export default async function downloadFiles(res){
   const blob = await res.blob();
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = "log.zip";
   document.body.appendChild(a);
   a.click();
   window.URL.revokeObjectURL(url);
   a.remove();
}