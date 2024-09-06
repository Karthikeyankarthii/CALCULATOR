document.addEventListener("DOMContentLoaded", function () {
  const entriesTable = document
    .getElementById("entriesTable")
    .getElementsByTagName("tbody")[0];
  const totalIncomeElem = document.getElementById("totalIncome");
  const totalExpenseElem = document.getElementById("totalExpense");
  const balanceElem = document.getElementById("balance");

  let entries = [];

  document.getElementById("addEntry").addEventListener("click", function () {
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value) || 0;

    if (!description || amount <= 0) {
      alert("Please provide valid description and amount.");
      return;
    }

    const entry = {
      id: Date.now(),
      type,
      description,
      amount,
    };

    entries.push(entry);
    renderEntries();
    updateSummary();
    clearInputs();
  });

  function renderEntries() {
    entriesTable.innerHTML = "";

    entries.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${
                  entry.type.charAt(0).toUpperCase() + entry.type.slice(1)
                }</td>
                <td>${entry.description}</td>
                <td>$${entry.amount.toFixed(2)}</td>
                <td class="actions">
                    <button onclick="editEntry(${entry.id})">Edit</button>
                    <button onclick="deleteEntry(${entry.id})">Delete</button>
                </td>
            `;
      entriesTable.appendChild(row);
    });
  }

  function updateSummary() {
    const totalIncome = entries
      .filter((e) => e.type === "income")
      .reduce((sum, e) => sum + e.amount, 0);
    const totalExpense = entries
      .filter((e) => e.type === "expense")
      .reduce((sum, e) => sum + e.amount, 0);
    const balance = totalIncome - totalExpense;

    totalIncomeElem.textContent = `Total Income: $${totalIncome.toFixed(2)}`;
    totalExpenseElem.textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
    balanceElem.textContent = `Balance: $${balance.toFixed(2)}`;
  }

  function clearInputs() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
  }

  window.editEntry = function (id) {
    const entry = entries.find((e) => e.id === id);
    if (entry) {
      document.getElementById("type").value = entry.type;
      document.getElementById("description").value = entry.description;
      document.getElementById("amount").value = entry.amount;
      deleteEntry(id);
    }
  };

  window.deleteEntry = function (id) {
    entries = entries.filter((e) => e.id !== id);
    renderEntries();
    updateSummary();
  };
});
