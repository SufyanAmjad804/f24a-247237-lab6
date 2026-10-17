
const itemInput = document.querySelector("#item");
const findButton = document.querySelector("#find");
const status = document.querySelector("#status");
const cardName = document.querySelector("#card-name");
const cardPrice = document.querySelector("#card-price");

findButton.addEventListener("click", async function () {
  const item = itemInput.value.trim().toLowerCase();

  status.textContent = "Loading...";
  findButton.disabled = true;
  cardName.textContent = "";
  cardPrice.textContent = "";

  try {
    const response = await fetch(
      "/api/price?item=" + encodeURIComponent(item)
    );

    const data = await response.json();

    if (!response.ok) {
      status.textContent = item + ": not in the shop";
      return;
    }

    cardName.textContent = data.item;
    cardPrice.textContent = "Rs " + data.price;
    status.textContent = data.item + ": Rs " + data.price;
  } catch (error) {
    status.textContent = "The server is not answering";
  } finally {
    findButton.disabled = false;
  }
});
