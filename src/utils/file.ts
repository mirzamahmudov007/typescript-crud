export const base64ToBlob = (base64String: string, type: string) => {
  const byteCharacters = window.atob(base64String)
  const byteArray = new Uint8Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArray[i] = byteCharacters.charCodeAt(i)
  }
  const blob = new Blob([byteArray], { type })
  return blob
}

export const blobToFile = (blob: Blob, fileName: string) => {
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
}

export const downloadBase64 = (content: string, fileName: string) => {
  const link = document.createElement('a')
  link.href = content
  link.download = fileName
  link.click()
}
