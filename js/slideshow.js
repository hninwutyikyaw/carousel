const photoUpload = document.querySelector("#photoUpload");
const uploadBox = document.querySelector("#uploadBox");
const photos = document.querySelector("#photos");
const createSlideshow = document.querySelector("#createSlideshow");

uploadBox.addEventListener("click", () => {
  photoUpload.click();
});
photoUpload.addEventListener("change", (event) => {
  [...event.target.files].forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.classList.add("photo", "me-2");
      photos.append(image);
    });
    reader.readAsDataURL(file);
  });
});

const createCarousel = (photoLists) => {
  let id = "carouselId";

  const carousel = document.createElement("div");
  carousel.id = id;
  carousel.className = "carousel slide";

  let slides = "";
  let indicators = "";

  photoLists.forEach((photoList, index) => {
    slides += `
      <div class="carousel-item ${index === 0 && "active"}">
        <img src="${photoList}" class="d-block w-100" alt="...">
      </div>
    `;
    indicators += `
    <button
    type="button"
    data-bs-target="#${id}"
    data-bs-slide-to="${index}"
    ${index === 0 && 'class="active"'} 
    aria-current="true"
    aria-label="Slide 1"
  ></button>`;
  });

  carousel.innerHTML = `
  <div class="carousel-indicators">
  ${indicators}
</div>
  <div class="carousel-inner">
  ${slides}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  document.body.append(carousel);
};

createSlideshow.addEventListener("click", () => {
  const allPhoto = [...document.querySelectorAll(".photo")];
  createCarousel(allPhoto.map((el) => el.src));
});
