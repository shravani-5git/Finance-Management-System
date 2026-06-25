// Protect Dashboard Page
if (
    window.location.pathname.includes("dashboard.html") &&
    !localStorage.getItem("currentUser")
) {
    window.location.href = "index.html";
}// Check if user is logged in

// ======================
// USER LOGIN SYSTEM
// ======================

// Show / Hide password
function togglePassword() {
    let pass = document.getElementById("password");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

// Register User
function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let user = {
        username: username,
        password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("msg").innerText = "Registered successfully!";
}

// Login User
function login() {
   
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        document.getElementById("msg").innerText = "No user found. Please Sign Up first.";
        return;
    }

    if (username === storedUser.username && password === storedUser.password) {

    localStorage.setItem("currentUser", username);
    alert("Login successful!");
    window.location.href = "dashboard.html";

    }else {
        document.getElementById("msg").innerText = "Invalid credentials!";
    }
     localStorage.setItem("currentUser", username);
     if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
}
}


// ======================
// CATEGORY DROPDOWN
// ======================

function toggleDropdown() {
    let box = document.getElementById("dropdownBox");

    if (box.style.display === "block") {
        box.style.display = "none";
    } else {
        box.style.display = "block";
    }
}

function setCategory(value) {
    document.getElementById("category").value = value;
    document.getElementById("category").readOnly = true;
    document.getElementById("dropdownBox").style.display = "none";
}

function enableOther() {
    let input = document.getElementById("category");
    input.value = "";
    input.placeholder = "Type your category...";
    input.readOnly = false;
    input.focus();

    document.getElementById("dropdownBox").style.display = "none";
}

// close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('#category')) {
        let box = document.getElementById("dropdownBox");
        if (box) box.style.display = "none";
    }
};


// ======================
// EXPENSE TRACKER
// ======================

// IMPORTANT: initialize array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Load data on page open
window.onload = function () {
    displayExpenses();
};

// Add Expense
function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    // VALIDATION
    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (!category || category.trim() === "") {
        alert("Please select a category");
        return;
    }

    if (!date) {
        alert("Please select a date");
        return;
    }

    // CREATE OBJECT
    let expense = {
        amount: parseFloat(amount),
        category: category,
        date: date,
        description: description
    };

    // STORE
    expenses.unshift(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // UPDATE UI
    displayExpenses();

    // CLEAR INPUTS
    clearInputs();
}


// Display Expenses
function displayExpenses() {

    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((exp, index) => {

        total += exp.amount;

        list.innerHTML += `
        <div class="expense-item">

            <div class="expense-left">
                <h4>${exp.category}</h4>
                <p>${exp.date}</p>
                <p>${exp.description || "No Description"}</p>
            </div>

            <div class="expense-right">
                <h3>₹${exp.amount}</h3>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${index})">
                    Delete
                </button>
            </div>

        </div>
        `;
    });

    document.getElementById("total").innerText =
        total.toFixed(2);

    document.getElementById("expenseCount").innerText =
        expenses.length;
}

// Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    displayExpenses();
}


// Clear All
function clearAll() {
    expenses = [];
    localStorage.removeItem("expenses");
    displayExpenses();
}


// Clear Inputs
function clearInputs() {
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
}

function logout() {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
// Load saved budget
let budget = localStorage.getItem("budget") || 0;

window.onload = function () {
    displayExpenses();
    document.getElementById("budgetDisplay").innerText = budget;
};

// Set Budget
function setBudget() {
    let budgetValue = document.getElementById("budgetInput").value;

    if (!budgetValue || budgetValue <= 0) {
        alert("Enter a valid budget amount");
        return;
    }

    budget = budgetValue;

    localStorage.setItem("budget", budget);

    document.getElementById("budgetDisplay").innerText = budget;

    document.getElementById("budgetInput").value = "";
}

window.onload = function () {

    displayExpenses();

    let user = localStorage.getItem("currentUser");

    if (document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerText =
            "Welcome, " + user;
    }
};
