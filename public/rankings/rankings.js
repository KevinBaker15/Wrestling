document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/rankings")
    .then((res) => res.json())
    .then((data) => {
      // Group by weight class
      const grouped = {};

      data.forEach((row) => {
        const weight = row.weight_class;
        if (!grouped[weight]) {
          grouped[weight] = [];
        }
        grouped[weight].push(row);
      });

      // Loop through each weight class
      Object.keys(grouped).forEach((weight) => {
        const listId = `rankings-${weight}`;
        const ul = document.getElementById(listId);

        if (!ul) {
          console.warn(`No UL found for weight class ${weight}`);
          return;
        }

        grouped[weight]
          .sort((a, b) => a.rank_order - b.rank_order)
          .forEach((wrestler) => {
            const li = document.createElement("li");
            li.textContent = `${wrestler.rank}. ${wrestler.name} - ${wrestler.school}`;
            ul.appendChild(li);
          });
      });
    })
    .catch((err) => {
      console.error("Failed to load rankings:", err);
    });
});
