// // document.addEventListener("DOMContentLoaded", () => {
// //   fetch("/api/rankings")
// //     .then((res) => res.json())
// //     .then((data) => {
// //       // Group by weight class
// //       const grouped = {};

// //       data.forEach((row) => {
// //         const weight = row.weight_class;
// //         if (!grouped[weight]) {
// //           grouped[weight] = [];
// //         }
// //         grouped[weight].push(row);
// //       });

// //       // Loop through each weight class
// //       Object.keys(grouped).forEach((weight) => {
// //         const listId = `rankings-${weight}`;
// //         const ul = document.getElementById(listId);

// //         if (!ul) {
// //           console.warn(`No UL found for weight class ${weight}`);
// //           return;
// //         }

// //         grouped[weight]
// //           .sort((a, b) => a.rank - b.rank)
// //           .forEach((wrestler) => {
// //             const li = document.createElement("li");
// //             li.textContent = `${wrestler.rank}. ${wrestler.name} - ${wrestler.school}`;
// //             ul.appendChild(li);
// //           });
// //       });
// //     })
// //     .catch((err) => {
// //       console.error("Failed to load rankings:", err);
// //     });
// // });

// // const resp = await fetch("/api/rankings");
// // const text = await resp.text();
// // console.log(text);

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("/api/rankings");
//     const data = await response.json();

//     for (const weightClass in data) {
//       const rankingsList = document.getElementById(`rankings-${weightClass}`);
//       if (!rankingsList) continue; // Skip if the section isn't in the HTML

//       data[weightClass].forEach((entry) => {
//         const li = document.createElement("li");
//         li.textContent = `${entry.rank}. ${entry.name} - ${entry.school}`;
//         rankingsList.appendChild(li);
//       });
//     }
//   } catch (err) {
//     console.error("❌ Failed to load rankings:", err);
//   }
// });

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/data/rankings.json");
    const data = await response.json();

    for (const weightClass in data) {
      const rankingsList = document.getElementById(`rankings-${weightClass}`);
      if (!rankingsList) continue;

      data[weightClass].forEach((entry) => {
        const li = document.createElement("li");
        li.textContent = `${entry.rank}. ${entry.name} - ${entry.school}`;
        rankingsList.appendChild(li);
      });
    }
  } catch (err) {
    console.error("❌ Failed to load rankings:", err);
  }
});

