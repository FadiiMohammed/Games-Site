import { UI } from "./ui.js";
let Ui = new UI();
export class Games {
  constructor() {
    this.links = document.querySelectorAll(".nav-link");
    this.loading = document.querySelector(".loading");

    this.getCategory();
  }

  getCategory() {
    for (let i = 0; i < this.links.length; i++) {
      this.links[i].addEventListener("click", (e) => {
        let category = e.target.getAttribute("data-code");
        this.loading.classList.replace("d-none", "d-flex");
        $(".games").ready(() => {
          this.loading.classList.replace("d-flex", "d-none");
        });
        Ui.displayData(category);
      });
    }
  }
}
