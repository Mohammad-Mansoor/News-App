const API_KEY = "256bfe4799d24d719f9225470f320906";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("afghanistan"));
function reload() {
  window.location.reload();
}
async function fetchNews(query) {
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}
// const div = document.querySelector(".card-template");
// console.log(div);

function bindData(articles) {
  const div_container = document.querySelector(".div-container");
  const card_template = document.querySelector(".card-template");
  div_container.innerHTML = "";

  articles &&
    articles.forEach((article) => {
      if (!article.urlToImage) return;
      const card_clone = card_template.content.cloneNode(true);
      fillCard(card_clone, article);
      div_container.appendChild(card_clone);
      // div_container.addEventListener("click", () => {
      //   window.open(article.url, "_blank");
      // });
    });
}

function fillCard(card_clone, article) {
  const newsImg = card_clone.querySelector(".img");
  const newsTitle = card_clone.querySelector(".news-title");
  const newsDate = card_clone.querySelector(".news-date");
  const newsDesc = card_clone.querySelector(".news-desc");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "asia/kabul",
  });
  newsDate.innerHTML = `${article.source.name} - ${date}`;
  card_clone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

const navItemClick = (a) => {
  fetchNews(a);
};

const searchText = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  const q = searchText.value;
  fetchNews(q);
  searchText.value = "";
});
