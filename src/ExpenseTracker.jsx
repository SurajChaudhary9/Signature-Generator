import React, { useState } from 'react';
import './expenseTracker.css';
function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (description.trim() !== '' && amount !== '') {
      const newExpense = {
        id: Math.random().toString(),
        description: description,
        amount: parseFloat(amount)
      };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
    } else {
      alert('Please enter both description and amount.');
    }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              <span>{expense.description}</span>
              <span>${expense.amount}</span>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total Expenses: ${totalExpense}</h2>
      </div>
    </div>
  );
}

export default ExpenseTracker;
