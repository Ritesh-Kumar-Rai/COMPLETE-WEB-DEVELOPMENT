async function fetchMultipleResourceTypes() {
  try {
      // JSON Request
      const jsonResponse = await fetch('https://api.example.com/data.json');
      const jsonData = await jsonResponse.json();
      console.log('JSON Data:', jsonData);

      // Text Request
      const textResponse = await fetch('https://api.example.com/data.txt');
      const textData = await textResponse.text();
      console.log('Text Data:', textData);

      // Blob (Binary) Request
      const imageResponse = await fetch('https://api.example.com/image.png');
      const imageBlob = await imageResponse.blob();
      
      // Create image URL for display
      const imageUrl = URL.createObjectURL(imageBlob);
      console.log('Image Blob URL:', imageUrl);

      // FormData Request
      const formData = new FormData();
      formData.append('username', 'john_doe');
      formData.append('file', imageBlob, 'profile.png');

      const formResponse = await fetch('https://api.example.com/upload', {
          method: 'POST',
          body: formData
      });
      const uploadResult = await formResponse.json();
      console.log('Upload Result:', uploadResult);
  } catch (error) {
      console.error('Fetch error:', error);
  }
};



/*
AJAX with XMLHttpRequest (Legacy Approach)
AJAX (Asynchronous JavaScript and XML) was traditionally implemented using the XMLHttpRequest object to send and receive data from servers asynchronously without refreshing the page.
*/

function makeXHRRequest(url) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('GET', url, true);
      
      xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
          } else {
              reject({
                  status: xhr.status,
                  statusText: xhr.statusText
              });
          }
      };
      
      xhr.onerror = function() {
          reject({
              status: xhr.status,
              statusText: xhr.statusText
          });
      };
      
      xhr.send();
  });
}

/*
Drawbacks of XMLHttpRequest

1. Verbosity: The code is verbose and harder to read.

2. Lack of Promises: Doesn't support promises natively, making error handling and chaining difficult.

3. Inconsistent APIs: Requires different methods to access headers, response, etc.

4. Modern Features Missing: Doesn't support newer JavaScript features like async/await.
*/


// axios
// import axios from 'axios';

// axios.get('https://jsonplaceholder.typicode.com/posts')
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error:', error));