import { onSnapshot, query, where, Timestamp } from 'firebase/firestore';
import { taskCollection } from "../assets/firebase";

export default async function readTasks(setStore, selectedDate) {
    try {
        // Convert the selected date to a Firestore Timestamp
        // Ensure the time is set to the start of the day (00:00:00)
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const selectedTimestamp = Timestamp.fromDate(startOfDay);
        console.log(selectedTimestamp);
        
        // Create a query to filter documents based on the date field
        // Use the 'startOfDay' timestamp for comparison
        const q = query(taskCollection, where("date", ">=", selectedTimestamp), where("date", "<", Timestamp.fromMillis(selectedTimestamp.toMillis() + 86400000))); // Adding 86400000 milliseconds (1 day) to get the next day

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            console.log("Fetched Tasks:", docs);
            setStore(docs);
            console.log("Filtered tasks:", docs);
        });

        // Return the unsubscribe function to stop listening for updates
        return unsubscribe;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}
