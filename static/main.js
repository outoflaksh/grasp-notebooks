const addBlockBtn = document.querySelector(".add-btn");
var currId = 1;

addBlockBtn.addEventListener("click", () => {
  const blockList = document.querySelector(".block-list");

  const newId = ++currId;

  blockList.innerHTML += `
   <div class="block">
   <textarea name="block${newId}-textarea" id="block${newId}-textarea" class="block-textarea"></textarea>
   <button class="btn exec-btn" id="block${newId}" onclick="executeQuery(this.id)">Run block</button>
   <p id="block${newId}-output">Output: </p>
    </div>
   `;
});

function executeQuery(blockId) {
  const blockArea = document.getElementById(`${blockId}-textarea`);
  const blockOutput = document.getElementById(`${blockId}-output`);

  console.log("button clicked");

  const requestBody = JSON.stringify({ query: blockArea.value });

  console.log(requestBody);

  const response = fetch("http://localhost:8000/run/", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  })
    .then((response) => response.json())
    .then((data) => {
      data.result.forEach((r) => {
        blockOutput.innerHTML += `<p>${JSON.stringify(r)}</p>`;
      });
    });
}
