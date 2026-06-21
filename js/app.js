let articles = [
    { id: 1, title: "Grok 4 Major Advances", content: "Detailed analysis of Grok 4 capabilities and benchmarks...", isPremium: false },
    { id: 2, title: "xAI's Next Big Project", content: "Exclusive insights into xAI's future roadmap from City of London correspondents...", isPremium: true }
];

let isSubscribed = localStorage.getItem('subscribed') === 'true';

function renderArticles() {
    const list = document.getElementById('article-list');
    list.innerHTML = '';
    articles.forEach(article => {
        const div = document.createElement('article');
        div.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content.substring(0, 120)}...</p>
            ${article.isPremium ? '<span class="paywall">Premium • $1/mo</span>' : ''}
            <button onclick="readArticle(${article.id})">Read Full Article</button>
        `;
        list.appendChild(div);
    });
}

window.readArticle = function(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    if (article.isPremium && !isSubscribed) {
        if (confirm('This article requires $1/mo subscription. Subscribe now?')) {
            subscribe(true);
        }
        return;
    }
    
    alert(`📖 ${article.title}\n\n${article.content}\n\n(Full article view - in production this would be a proper page)`);
};

window.subscribe = function(fromPaywall = false) {
    isSubscribed = true;
    localStorage.setItem('subscribed', 'true');
    document.getElementById('sub-status').textContent = '✅ Subscribed! Premium unlocked.';
    if (!fromPaywall) alert('Thank you! You now have full access for $1/mo (demo).');
    renderArticles();
};

window.publishArticle = function() {
    const title = document.getElementById('new-title').value;
    const content = document.getElementById('new-content').value;
    const isPremium = document.getElementById('new-premium').checked;
    
    if (!title || !content) {
        alert('Please fill title and content');
        return;
    }
    
    articles.unshift({
        id: Date.now(),
        title: title,
        content: content,
        isPremium: isPremium
    });
    
    renderArticles();
    alert('Article published successfully! (Demo)');
    
    // Clear form
    document.getElementById('new-title').value = '';
    document.getElementById('new-content').value = '';
};

document.addEventListener('DOMContentLoaded', () => {
    renderArticles();
    if (isSubscribed) document.getElementById('sub-status').textContent = '✅ Premium Active';
});