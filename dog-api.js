let doggos = document.querySelector(".doggos");
let spinner = document.querySelector(".spinner");
let dogBreed = document.querySelector(".dog-selector");


function addNewDoggo() {

  spinner.removeAttribute('hidden');

  let breedName = dogBreed.options[dogBreed.selectedIndex].value;
  let breedSplit = breedName.substring(0, breedName.indexOf('-'));


  if (!breedSplit) {
    fetchURL(breedName);
  } else {
    fetchURL(breedSplit);
  }

}

function fetchURL(breedSplit) {

  const DOG_URL = "https://dog.ceo/api/breed/" + breedSplit + "/images/random";

  showDoggo(DOG_URL);

  while (doggos.firstChild) {
    doggos.removeChild(doggos.firstChild);
  }


}


function showDoggo(DOG_URL) {

  const promise = fetch(DOG_URL);

  promise
    .then(function (response) {
      if (response.ok) {
        const processingPromise = response.json();
        return processingPromise;
      } else {
        spinner.setAttribute('hidden', '');
        throw new Error('Something went wrong');
      }

    })
    .then(function (processedResponse) {
      spinner.setAttribute('hidden', '');
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    })
    .catch(function (error) {
      spinner.setAttribute('hidden', '');
      console.error(error);
    });

}

document.querySelector(".add-doggo").addEventListener("click", addNewDoggo);