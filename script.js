// 1. Your Apps Script Web App URL
const API_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

// 2. Function to fetch data
async function loadMarketplace() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Update the store title
        document.getElementById('store-name').innerText = data.storeName;

        // Logic: Check if the store is "Locked" (The Shame Lock)
        if (data.status === "Locked") {
            displayShameLock();
            return;
        }

        renderProducts(data.items);
    } catch (error) {
        console.error("Error cooking the website:", error);
    }
}

// 3. Function to draw the products on the screen
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ""; // Clear loader

    products.forEach(item => {
        // Create a card for each item
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:100%">
            <h3>${item.name}</h3>
            <p>RM ${item.price.toFixed(2)}</p>
            <button onclick="orderWhatsApp('${item.name}')">Order via WhatsApp</button>
        `;
        grid.appendChild(card);
    });
}

loadMarketplace();
