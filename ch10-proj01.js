document.addEventListener("DOMContentLoaded", function() {
    //1.	Add an event listener for the document when DOM content is loaded that defines an
    // anonymous function that calls loadColors
    loadColors();
});

function loadColors() { //2.	Define an async function loadColors()

    // a. Set style display to block for all loader Ids.
    const loader = document.querySelector("#loader");
    loader.style.display = "block";

    // b. set display to none for the main content
    const mainContent = document.querySelector("main");
    mainContent.style.display = "none";

    // c. Set style display to none for the aside content
    const asideContent = document.querySelector("aside");
    asideContent.style.display = "none";

    const url = "https://www.randyconnolly.com/funwebdev/3rd/api/colors/sample-colors.php";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }

            // Check if the Content-Type is JSON
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Expected JSON content, but received Content-Type: ${contentType}`);
            }

            // Parse the response as JSON
            return response.json();

        })
        .then(data => {


            // g. reset styles to none, block, and block
            loader.style.display = "none";
            mainContent.style.display = "block";
            asideContent.style.display = "block";

            generateSchemeList(data);
            setupViewHandler(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch or processing of the response
            console.error('Error:', error);
        });
}

function generateSchemeList(data) {

    let schemeGroup = document.querySelector("article.scheme-group");

    for (let d of data) {
        console.log(`ID: ${d.id}`);
        console.log(`Title: ${d.title}`);

        const h3 = document.createElement("h3"); // i
        h3.textContent = d.title; // ii

        const section = document.createElement("section"); // iii
        section.classList.add('scheme'); // iv

        // PREVIEW DIV
        const previewDiv = document.createElement("div");
        previewDiv.classList.add('preview'); // vi

        const actionDiv = document.createElement("div"); // viii
        actionDiv.classList.add('actions'); // ix

        const btn = document.createElement("button"); //x
        btn.setAttribute('data-id', d.id); // xi
        btn.textContent = 'View'; // xii

        // APPEND
        schemeGroup.appendChild(h3);
        schemeGroup.appendChild(section);
        section.appendChild(previewDiv);
        section.appendChild(actionDiv);
        actionDiv.appendChild(btn);

        for (let s of d.scheme) {
            let color = s.color;
            let webRepresentation = s.web;
            let colorName = s.name;

            // Do something with the color information
            console.log(`Color: ${JSON.stringify(color)}, Web: ${webRepresentation}, Name: ${colorName}`);


            const boxDiv = document.createElement("div"); //vii.1
            boxDiv.classList.add('color-box'); //vii.2
            boxDiv.style.backgroundColor = s.web; // vii.3

            previewDiv.appendChild(boxDiv);
        }
    }

    
}

function setupViewHandler(data) {

    const main = document.querySelector("main");

    main.addEventListener("click", function (event) {
        if (event.target.nodeName === "BUTTON") {
            const id = event.target.getAttribute('data-id');

            const color = data.find(d => d.id.toString() === id);

            displaySchemeDetails(color);


        }

    });

}

function displaySchemeDetails(details) {


    const fieldset = document.querySelector("fieldset");
    fieldset.innerHTML = ""; // clear old data

    const asideH2 = document.querySelector("aside h2");
    asideH2.textContent = details.title;

    details.scheme.forEach(s => {
        const divRow = document.createElement("div");
        divRow.classList.add('colorRow');

        const divBox = document.createElement("div");
        divBox.classList.add('detailBox');
        divBox.style.backgroundColor = s.web;

        const span1 = document.createElement('span');
        span1.textContent = s.web;

        const span2 = document.createElement('span');
        span2.textContent = `rgb(${s.color.red},${s.color.green},${s.color.blue})`

        const label = document.createElement('label');
        label.textContent = s.name;

        divRow.appendChild(divBox);
        divRow.appendChild(span1);
        divRow.appendChild(span2);
        divRow.appendChild(label);

        fieldset.appendChild(divRow);

    });


}












 
