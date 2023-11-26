const { ipcRenderer } = require('electron');

window.onload = () => {
  document.getElementById('submitBtn').addEventListener('click', () => {
    const sourcePath = document.getElementById('sourcePath').value;
    const filePath = document.getElementById('filePath').value;
    document.getElementById("main").innerHTML = "hello omarika";

    ipcRenderer.send('user-inputs', sourcePath, filePath);
  });

  ipcRenderer.on('echo-user-inputs', (event,html) => {
    // Handle echoed user inputs
    // Function to style JSX code within the user input
function styleJSXCode(userInput) {
  const jsxRegex = /```jsx((.|\n)*?)```/g; // Regex to match JSX code within ```jsx ``` markers
  const styledContent = userInput.replace(jsxRegex, (match, jsxCode) => {
    // Style the JSX code block
    return `<div class="jsx-block">
              <pre>
                <code class="language-jsx">${jsxCode}</code>
              </pre>
              <button class="copy-button">Copy</button>
            </div>`;
  });

  return styledContent;
}

// Function to render the styled content
function renderStyledContent(userInput) {
  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = styleJSXCode(userInput);

  // Optional: Add event listeners or further functionality for the copy button
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const codeBlock = button.previousElementSibling.querySelector('code');
      const codeText = codeBlock.textContent;
      navigator.clipboard.writeText(codeText)
        .then(() => {
          alert('Code copied to clipboard!');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    });
  });
}

// Example user input
const userInput = `hi i am john doe bla bla 
\`\`\`jsx 
function App(){return <div> hi</div>)}
\`\`\`
This is some regular text`;

// Render the styled content
renderStyledContent(html);

  });
};
