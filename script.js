
const itemInput = document.querySelector("#item");
const findButton = document.querySelector("#find");

findButton.addEventListener("click", function () {
  const item = itemInput.value.trim().toLowerCase();

  console.log("Find:", item);
});
