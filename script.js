async function fetchCryptoPrices() {
            try {
                let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
                let data = await response.json();

                let cryptoHTML = '';
                data.slice(0, 10).forEach(coin => {
                    let priceChange = coin.price_change_percentage_24h.toFixed(2);
                    let priceClass = priceChange >= 0 ? 'green' : 'red';

                    cryptoHTML += `
                        <div class="crypto-card">
                            <img src="${coin.image}" alt="${coin.name}">
                            <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
                            <p> <i class="fa-solid fa-dollar-sign"></i> ${coin.current_price.toFixed(2)}</p>
                            <p class="${priceClass}">📈 ${priceChange}%</p>
                        </div>
                    `;
                });

                document.getElementById("cryptoList").innerHTML = cryptoHTML;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCryptoPrices();
        setInterval(fetchCryptoPrices, 30000); // Refresh every 30 seconds