document.addEventListener("DOMContentLoaded", async () => {
    const newsContainer = document.getElementById("news-list");

    if (!newsContainer) return;

    try {
        const response = await fetch("./assets/news/news.json");

        if (!response.ok) {
            throw new Error(`Failed to load news: ${response.status}`);
        }

        const newsItems = await response.json();

        if (!Array.isArray(newsItems) || newsItems.length === 0) {
            newsContainer.innerHTML = "<p>No news available at the moment.</p>";
            return;
        }

        newsContainer.innerHTML = newsItems
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(item => {
                const formattedDate = new Date(item.date).toLocaleDateString("en-PH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                return `
                    <article class="news-card">
                        <a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="news-card-anchor">
                            <div class="news-card-media">
                                <img src="${item.image}" alt="${item.title}" class="news-card-image">
                                <div class="news-card-overlay">
                                    <p class="news-card-description">${item.summary}</p>
                                </div>
                            </div>

                            <div class="news-card-body">
                                <p class="news-card-date">${formattedDate}</p>
                                <h3 class="news-card-title">${item.title}</h3>
                                <p class="news-card-meta">
                                    <strong>Source:</strong> ${item.source}<br>
                                    <strong>Author:</strong> ${item.author}<br>
                                    <strong>Photo Credit:</strong> ${item.photoCredit}<br>
                                    <strong>Caption by:</strong>${item.caption}
                                </p>
                                <span class="news-card-link">View Original Post</span>
                            </div>
                        </a>
                    </article>
                `;
            })
            .join("");
    } catch (error) {
        console.error("News loading error:", error);
        newsContainer.innerHTML = "<p>Unable to load news at the moment.</p>";
    }
});