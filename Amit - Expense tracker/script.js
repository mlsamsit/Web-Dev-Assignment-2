const no_expense = document.querySelector(".no_expenses_yet");
const add = document.querySelector(".add")
const box = document.querySelector(".box")
const main = document.querySelector(".content")
const categoryInput = document.getElementById("category")
const amountInput = document.getElementById("amount");
const addBtn = document.querySelector(".add_expense");
const dateInput = document.getElementById("date")
const total = document.querySelector(".total_amount")
const list = document.createElement("div");
const list_expense = document.querySelector(".list_expense")

list_expense.appendChild(list)


add.addEventListener("click",function(){
    no_expense.classList.add("hidden");
    box.classList.toggle("hidden")
});

let expenses = []
addBtn.addEventListener("click", () => {
    const Category = categoryInput.value;
    const amount = amountInput.value;
    const date = dateInput.value;

    console.log(amount);
    console.log(Category);
    console.log(date);
    
   const expense = {
        category: Category,
        amount: amount,
        date: date
    };

    expenses.push(expense);
    
    console.log(expenses); 

    list.innerHTML = expenses.map(item => `
      <div style="display: flex; gap: 10px; margin: 0 0 50px 0; border-bottom: 1px solid #ddd; padding-bottom: 8px; text-align: left; font-size: 23px; border: 2px solid black; padding: 20px; border-radius: 31px;justify-content: space-between;align-items: center;">
        <div>
          <p style="margin:0;font-weight:600;">${item.category}</p>
          <p style="margin:0;color: #2803af; font-weight: 700;">₹${item.amount}</p>
          <p style="margin:0;color:#333;">date: ${item.date}</p>
        </div>
        <button class="delete_btn" style="background: red;">
            Delete
        </button>
      </div>
    `).join("");

    let len = expenses.length
    let i = 0
    let sum = 0
    while(i<len){
        sum = sum + Number(expenses[i].amount);
        i++
    }
    total.textContent = sum;
    box.classList.add("hidden");
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete_btn")) {

    const index = [...list.querySelectorAll(".delete_btn")].indexOf(e.target);

    expenses.splice(index, 1);

    list.innerHTML = expenses.map(item => `
      <div style="display: flex; gap: 10px; margin: 0 0 50px 0; border-bottom: 1px solid #ddd; padding-bottom: 8px; text-align: left; font-size: 23px; border: 2px solid black; padding: 20px; border-radius: 31px; justify-content: space-between; align-items: center;">
        <div>
          <p style="margin:0;font-weight:600;">${item.category}</p>
          <p style="margin:0;color: #2803af; font-weight: 700;">₹${item.amount}</p>
          <p style="margin:0;color:#333;">date: ${item.date}</p>
        </div>
        <button class="delete_btn" style="background:red;">Delete</button>
      </div>
    `).join("");

    let len = expenses.length
    let i = 0
    let sum = 0
    while(i<len){
        sum = sum + Number(expenses[i].amount);
        i++
    }
    total.textContent = sum;
  }
});