import {
  aiMockData
}
from "../data/aiMockData";





export function generateAIResponse(question){


const query =
question.toLowerCase();






if(
query.includes("sales")
||
query.includes("revenue")
){


return `

📈 Sales Intelligence

Today's Sales:
₹${aiMockData.sales.today.toLocaleString()}

Monthly Revenue:
₹${aiMockData.sales.monthly.toLocaleString()}

Growth:
${aiMockData.sales.growth}%

Sales are performing above previous month.

`;



}








if(
query.includes("stock")
||
query.includes("inventory")
){


return `

📦 Inventory Intelligence


Total Products:
${aiMockData.inventory.totalProducts}


Low Stock:
${aiMockData.inventory.lowStockItems}


Out Of Stock:
${aiMockData.inventory.outOfStockItems}


Recommendation:

Restock low inventory products immediately.

`;



}








if(
query.includes("order")
){


return `

🛒 Order Intelligence


Today's Orders:
${aiMockData.orders.totalToday}


Pending:
${aiMockData.orders.pending}


Completed:
${aiMockData.orders.completed}


`;



}








if(
query.includes("customer")
){


return `

👥 Customer Intelligence


Total Customers:
${aiMockData.customers.total}


Active Customers:
${aiMockData.customers.active}


New Customers This Month:
${aiMockData.customers.newThisMonth}

`;



}








return `

🤖 Xllent AI Assistant


I can help you with:

• Sales analysis
• Revenue reports
• Inventory alerts
• Order status
• Customer insights


Try asking:

"How are sales today?"

"Which products are low stock?"

"Show order status"


`;



}