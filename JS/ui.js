import { Details } from "./details.js";
let details = new Details();
export class UI {
  constructor() {
    this.displayData("mmorpg");
    this.loading = document.querySelector(".loading");
  }

  async getApi(category) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bbc708ee28msh51754fb4a2ec989p1634abjsn1ebf12953663",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    let response = await api.json();
    $(response).ready(() => {
      this.loading.classList.replace("d-flex", "d-none");
    });
    return response;
  }

  async displayData(category) {
    const cardRow = document.querySelector("#cardRow");
    let api = await this.getApi(category);
    let cartona = "";
    for (let i = 0; i < api.length; i++) {
      cartona += `
          <div class="gameCard col-sm-12 col-md-4 col-lg-3 " >
          <div data-id="${api[i].id}" class="card  bg-transparent h-100" name="card"  role="button" >
            <div class="card-body p-3">
              <img class="w-100" src="${api[i].thumbnail}" alt="" />
              <div class="card-header d-flex justify-content-between px-0">
                <h3 class="small">${api[i].title}</h3>
                <span class="badge text-bg-primary p-2">Free</span>
              </div>
              <p class="card-text small text-center opacity-50">${api[i].short_description}</p>
            </div>
            <div class="card-footer d-flex justify-content-between">
              <span class="badge badge-color">${api[i].genre}</span>
              <span class="badge badge-color">${api[i].platform}</span>
            </div>
          </div>
        </div>
          `;
    }
    cardRow.innerHTML = cartona;
    this.getCardId();
  }

  getCardId() {
    this.cards = Array.from(document.getElementsByName("card"));
    for (var i = 0; i < this.cards.length; i++) {
      this.cards[i].addEventListener("click", (e) => {
        let id = e.currentTarget.getAttribute("data-id");

        details.displayDetails(id);
      });
    }
  }
}
