
const itemInput = document.querySelector("#item");
const findButton = document.querySelector("#find");
const status = document.querySelector("#status");
const cardName = document.querySelector("#card-name");
const cardPrice = document.querySelector("#card-price");
const slip = document.querySelector("#slip");
const found = document.querySelector("#found");
const dearest = document.querySelector("#dearest");

const items = {};

function drawSlip() {
  slip.innerHTML = "";

  for (const name of Object.keys(items)) {
    const row = document.createElement("tr");

    for (const value of [
      name,
      "Rs " + items[name].price,
      items[name].times
    ]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }

    slip.appendChild(row);
  }

  found.textContent = Object.keys(items).length;

  const prices = Object.values(items).map(function (item) {
    return item.price;
  });

  dearest.textContent = prices.length ? Math.max(...prices) : 0;
}

findButton.addEventListener("click", async function () {
  const item = itemInput.value.trim().toLowerCase();

  status.textContent = "Loading...";
  findButton.disabled = true;
  cardName.textContent = "";
  cardPrice.textContent = "";
  if (item === "") {
  status.textContent = "undefined";
  cardName.textContent = "";
  cardPrice.textContent = "";
  return;
}

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

    if (!items[data.item]) {
      items[data.item] = { price: data.price, times: 1 };
    } else {
      items[data.item].times++;
    }

    drawSlip();
  } catch (error) {
    status.textContent = "The server is not answering";
  } finally {
    findButton.disabled = false;
  }
});
