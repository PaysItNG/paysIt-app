


export const base64ToFile=(base64:string | null, fileName:string, mimeType:string): File=>{
    if (!base64) {
      throw new Error("Base64 string cannot be null");
    }
    const byteString = atob(base64.split(',')[1]); // Decode base64 string
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new File([ab], fileName, { type: mimeType });
  }
  