export class Details {
  constructor() {
    this.closeDetails();
    this.loading = document.querySelector(".loading");
  }

  async getDetailsAPI(id) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bbc708ee28msh51754fb4a2ec989p1634abjsn1ebf12953663",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let detailsAPI = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
      options
    );
    let detailsResponse = await detailsAPI.json();
    this.loading.classList.replace("d-none", "d-flex");

    $(detailsResponse).ready(() => {
      this.loading.classList.replace("d-flex", "d-none");
      document.querySelector(".details").classList.replace("d-none", "d-flex");
      document.querySelector(".games").classList.add("d-none");
    });
    return detailsResponse;
  }

  closeDetails() {
    $("#btnClose").click(() => {
      document.querySelector(".games").classList.remove("d-none");
      document.querySelector(".details").classList.replace("d-flex", "d-none");
    });
  }

  async displayDetails(id) {
    const detailsContent = document.getElementById("detailsContent");
    let api = await this.getDetailsAPI(id);
    let cartona = `
        <div class="row" id="detailsContent">
        <div class="col-md-4">
          <img src="${api.thumbnail}" class="w-100" alt="" />
        </div>
        <div class="col-md-8 text-white">
          <h3>Title: ${api.title}</h3>
          <p>Category: <span class="badge text-bg-info"> ${api.genre}</span></p>
          <p>Platform: <span class="badge text-bg-info"> ${api.platform}</span></p>
          <p>Status: <span class="badge text-bg-info"> ${api.status}</span></p>
          <p class="">
           ${api.description}
          </p>
          <a
            class="btn btn-outline-warning"
            target="_blank"
            href="${api.game_url}"
            >Show Game</a
          >
        </div>
      </div>
        `;

    detailsContent.innerHTML = cartona;
  }
}
