"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const resultsList = document.getElementById("results-list");
  const noResultsMessage = document.getElementById("no-results-message");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm.length > 0) {
      fetchResults(searchTerm);
    } else {
      resultsList.innerHTML = "";
      noResultsMessage.style.display = "none";
    }
  });

  const fetchResults = async (term) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayResults(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const displayResults = (results) => {
    resultsList.innerHTML = "";
    if (results.length > 0) {
      noResultsMessage.style.display = "none";
      results.forEach((result) => {
        const li = document.createElement("li");
        const artistSpan = document.createElement("span");
        const trackSpan = document.createElement("span");
        artistSpan.textContent = result.artistName;
        trackSpan.textContent = result.trackName;
        li.appendChild(artistSpan);
        li.appendChild(trackSpan);
        resultsList.appendChild(li);
      });
    } else {
      noResultsMessage.textContent = "Nema rezultata za traženi pojam.";
      noResultsMessage.style.display = "block";
    }
  };
});
