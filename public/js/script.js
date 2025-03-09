// Fetch order status counts from the backend
fetch("/ordersCount")
    .then(response => response.json())
    .then(data => {
        // Create Chart Data
        const orderData = {
            labels: data.labels,
            datasets: [{
                data: data.data,
                backgroundColor: ["#FF6384", "#4BC0C0",  "#36A2EB", "#FFCE56"],
                hoverOffset: 4
            }]
        };

        // Chart Config
        const config = {
            type: 'pie',
            data: orderData,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allows custom sizing
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Order Status Overview' }
                }
            }
        };

        // Wait a moment before rendering (fixes size issues)
        setTimeout(() => {
            const ctx = document.getElementById('orderChart').getContext('2d');
            const orderChart = new Chart(ctx, config);
            
            // Force Resize after Chart Renders
            setTimeout(() => {
                orderChart.resize();
            }, 500);
        }, 200);

        // Display Status Counts
        const statusCounts = document.getElementById('statusCounts');
        const statusColors = ["#FF6384", "#4BC0C0",  "#36A2EB", "#FFCE56"];

        statusCounts.innerHTML = ''; // Clear old counts
        orderData.labels.forEach((label, index) => {
            const count = orderData.datasets[0].data[index];
            const color = statusColors[index];

            const statusItem = document.createElement('div');
            statusItem.className = 'status-item';
            statusItem.innerHTML = `<span class="status-color" style="background-color: ${color};"></span> ${label}: ${count}`;
            statusCounts.appendChild(statusItem);
        });
    })
    .catch(error => {
        console.error("Error fetching order status counts: ", error);
    });



// Sales Line Chart
const salesCtx = document.getElementById('salesChart2').getContext('2d');
new Chart(salesCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Sales ($)',
            data: [1200, 1900, 3000, 2500, 3200, 4000, 3700, 4200, 4800, 5000, 5300, 6000],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#4bc0c0',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: '#4bc0c0',
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true, grid: { color: '#eee' } },
            x: { grid: { display: false } }
        }
    }
});
