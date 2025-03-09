// Function to update the header based on authentication status
function updateHeader(isAuthenticated, message = '') {
    const loginSignupSection = document.getElementById('loginSignupSection');
    const logoutSection = document.getElementById('logoutSection');
    const messageElement = document.getElementById('message');

    if (isAuthenticated) {
        // Hide login/signup and show logout
        if (loginSignupSection) loginSignupSection.style.display = 'none';
        if (logoutSection) logoutSection.style.display = 'block';
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.color = 'green';
        }
    } else {
        // Show login/signup and hide logout
        if (loginSignupSection) loginSignupSection.style.display = 'block';
        if (logoutSection) logoutSection.style.display = 'none';
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.style.color = 'red';
        }
    }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function () {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    updateHeader(isAuthenticated);
});

document.getElementById('logoutButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Send a logout request to the backend
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear authentication status from localStorage
                localStorage.removeItem('isAuthenticated');

                // Update the header
                updateHeader(false, data.message);

                // Redirect to the homepage or login page
                window.location.href = "index.html";
            } else {
                document.getElementById('message').textContent = data.message;
                document.getElementById('message').style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'An error occurred. Please try again.';
            document.getElementById('message').style.color = 'red';
        });
});

setInterval(() => {
    fetch('/check-session')
        .then(response => response.json())
        .then(data => {
            if (!data.isAuthenticated) {
                localStorage.removeItem('isAuthenticated');
                updateHeader(false);
            }
        });
}, 60000); // Check every 60 seconds


document.getElementById('logoutButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link behavior

    // Send a logout request to the backend
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear authentication status from localStorage
                localStorage.removeItem('isAuthenticated');

                // Update the header
                updateHeader(false, data.message);

                // Redirect to the homepage or login page
                window.location.href = "index.html";
            } else {
                document.getElementById('message').textContent = data.message;
                document.getElementById('message').style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'An error occurred. Please try again.';
            document.getElementById('message').style.color = 'red';
        });
});

setInterval(() => {
    fetch('/check-session')
        .then(response => response.json())
        .then(data => {
            if (!data.isAuthenticated) {
                localStorage.removeItem('isAuthenticated');
                updateHeader(false);
            }
        });
}, 60000); // Check every 60 seconds