async function getPresignedUrl(file: { ext: string }) {
  const res = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `mutation imageUploadMutation($ext: String!) {
                 createUploadURL(ext: $ext) {
                   url
                   key
                 }
               }`,
      variables: {
        ext: file.ext
      }
    })
  });

  const { data } = await res.json();

  return data.createUploadURL.url;
}

export async function uploadFile(file: File): Promise<string> {
  const signedUrl = await getPresignedUrl({
    ext: file!.name.split('.').pop()!
  });

  await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type!
    }
  });

  return signedUrl.split('?')[0];
}
