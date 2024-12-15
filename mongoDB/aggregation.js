{
    "_id": ObjectId("1"),
    "customer": "John",
    "amount": 150,
    "status": "Completed",
    "date": ISODate("2024-12-15")
  }
  // Filtering and Grouping by status
  db.orders.aggregate([
    { $match: { status: "Completed" } },       // Filters completed orders
    { $group: { _id: "$status", totalAmount: { $sum: "$amount" } } } // Groups by status and calculates total amount
  ]);

//output
  [
    { "_id": "Completed", "totalAmount": 1000 }
  ]
  
// Pipeline Example 2: Sorting, Limiting, and Projecting
  db.orders.aggregate([
    { $sort: { amount: -1 } },              // Sort by amount in descending order
    { $limit: 5 },                         // Limit to the top 5 documents
    { $project: { customer: 1, amount: 1 } } // Only include customer and amount fields
  ]);

// ouput
  [
    { "customer": "Alice", "amount": 2000 },
    { "customer": "Bob", "amount": 1800 },
    { "customer": "John", "amount": 1500 },
    { "customer": "Eve", "amount": 1200 },
    { "customer": "Jack", "amount": 1100 }
  ]
  
  //Using $lookup (Join Operation)
  db.orders.aggregate([
    { $lookup: { 
      from: "customers", 
      localField: "customer", 
      foreignField: "name", 
      as: "customerDetails" 
    }}
  ]);

 // output
 [
    {
      "_id": ObjectId("1"),
      "customer": "John",
      "amount": 150,
      "status": "Completed",
      "date": ISODate("2024-12-15"),
      "customerDetails": [{ "name": "John", "email": "john@example.com", "age": 30 }]
    }
  ]
   