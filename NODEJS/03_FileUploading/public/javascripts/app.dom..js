
async function loadHTMLFile(filename='form1', container){
    try {
        const response = await fetch(`./components/${filename}.html`);

        if(!response.ok){
            throw new Error(`Could not fetch ${fileName}: ${response.statusText}`);
        }

        const file = await response.text();

        container.innerHTML = file;

    } catch (error) {
        console.error("Error loading HTML:", error);
        container.innerHTML = "<p style='color: red;'>Error loading content.</p>";
    }
}



window.addEventListener("DOMContentLoaded", () => {

    const selector = document.getElementById("upload-version-selector");
    const formContainer = document.getElementById("form-attacher");

    selector.addEventListener("change", (e) => {
        if(e.target.value === 'version1'){
            loadHTMLFile('form1', formContainer);
        }else if(e.target.value === 'version2'){
            loadHTMLFile('form2', formContainer);
        }else if(e.target.value === 'version3'){
            loadHTMLFile('form3', formContainer);
        }else if(e.target.value === 'version4'){
            loadHTMLFile('form4', formContainer);
        }
        
    })

});