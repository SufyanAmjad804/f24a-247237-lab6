
const itemInput = document.querySelector("#item");
const findButton = document.querySelector("#find");
const status = document.querySelector("#status");

findButton.addEventListener("click", function () {
  const item = itemInput.value.trim().toLowerCase();

  status.textContent = "Loading...";
  findButton.disabled = true;

  console.log("Find:", item);
});
