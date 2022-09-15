(async function () {
  let arrayOfCharacters = [];
  const positionInitial = 0;
  const title = document.getElementsByClassName("Gallery__title")[0];
  const mainImage = document.getElementsByClassName("Gallery__mainImage")[0];
  const caption = document.getElementsByClassName(
    "Gallery__mainImageCaptionText"
  )[0];
  const imageList = document.getElementsByClassName("Gallery__imagesList")[0];
  const requestAPI = async function () {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    return response.json();
  };

  try {
    //Desestructuración de objetos
    const { results } = await requestAPI();
    arrayOfCharacters = results;
    title.innerHTML = arrayOfCharacters[positionInitial].name;
    mainImage.src = arrayOfCharacters[positionInitial].image;
    caption.innerHTML = `<span>${arrayOfCharacters[positionInitial].status} - ${arrayOfCharacters[positionInitial].species}</span>`;

    arrayOfCharacters.forEach((character) => {
      const div = document.createElement("div");
      div.classList.add("Gallery__imageItem");
      div.innerHTML = `<img class="Gallery__imageItem__image" src="${character.image}" alt="${character.name}" />`;
      div.addEventListener("click", () => {
        title.innerHTML = character.name;
        mainImage.src = character.image;
        caption.innerHTML = `<span>${character.status} - ${character.species}</span>`;
      });
      imageList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
})();
