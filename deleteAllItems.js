import { collection, getDocs, query, where, deleteDoc ,Timestamp } from 'firebase/firestore';
import { taskCollection } from "../assets/firebase";

export default async function deleteAllItems(selectedDate) {
  try {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const selectedTimestamp = Timestamp.fromDate(startOfDay);
  
    
    // Create a query to filter documents based on the date field
    // Use the 'startOfDay' timestamp for comparison
    const q = query(taskCollection, where("date", ">=", selectedTimestamp), where("date", "<", Timestamp.fromMillis(selectedTimestamp.toMillis() + 86400000))); // Adding 86400000 milliseconds (1 day) to get the next day

    // Create a query to fetch tasks for the selected date
   

    // Get all documents based on the query
    const querySnapshot = await getDocs(q);

    // Iterate over each document and delete it if it's not completed
    querySnapshot.forEach(async (doc) => {
      const taskData = doc.data();
      if (taskData.completed) {
        await deleteDoc(doc.ref);
      } else {
        console.log("Task not completed:");
      }
      
    });

  } catch (error) {
    console.error("Error deleting tasks:", error);
  }
}
