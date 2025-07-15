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

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const response = await fetch("/rankings/rankings.json");
//     const data = await response.json();

//     const groupedByWeight = {};

//     data.forEach((entry) => {
//       const weight = entry.weight_class.toString();
//       if (!groupedByWeight[weight]) {
//         groupedByWeight[weight] = [];
//       }
//       groupedByWeight[weight].push(entry);
//     });

//     for (const weightClass in groupedByWeight) {
//       const rankingsList = document.getElementById(`rankings-${weightClass}`);
//       if (!rankingsList) continue;

//       groupedByWeight[weightClass].forEach((entry) => {
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

  // Path to your grouped JSON file
  const JSON_PATH = "/rankings.json";

  try {
    // Fetch the JSON and verify the response
    const response = await fetch(JSON_PATH);
    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    // Parse the JSON into an object like { "125": [ … ], "133": [ … ], … }
    const data = await response.json();

    // Iterate over each weightClass → entries array
    Object.entries(data).forEach(([weightClass, entries]) => {
      // Find the <ul> whose id matches "rankings-<weightClass>"
      const listEl = document.getElementById(`rankings-${weightClass}`);
      if (!listEl) return;  // Skip if no matching element

      // Create and append an <li> for each wrestler
      entries.forEach(({ rank, name, school }) => {
        const li = document.createElement("li");
        li.textContent = `${rank}. ${name} – ${school}`;
        listEl.appendChild(li);
      });
    });

  } catch (err) {
    console.error("❌ Failed to load rankings:", err);
  }

});



  

