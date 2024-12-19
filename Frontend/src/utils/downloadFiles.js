export default async function downloadFiles(res) {
   const blob = await res.blob();
   const contentDisposition = res.headers.get('Content-Disposition');
   let fileName = 'file';
   if (contentDisposition && contentDisposition.includes('filename=')) {
      fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
   }

   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = fileName;
   document.body.appendChild(a);
   a.click();
   window.URL.revokeObjectURL(url);
   a.remove();
}
