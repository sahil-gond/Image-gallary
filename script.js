const accessKey = "1nF19SGKuWqCmdklwaRKkR4b_4r5ypJhTXqDE7-lOFo";
const form1 = document.querySelector("form")
const input1 = document.getElementById("search-input")
const searchResult = document.querySelector(".search-result")
const showMore = document.getElementById("show-more-button")

let inputData = "";
let page = 1;

async function searchImages(){
  inputData = input1.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1){
    searchResult.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result-box")
    const image = document.createElement('img')
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResult.appendChild(imageWrapper);
});

  page++;
  if (page > 1){
    showMore.style.display = "block";
  }
}

form1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
})