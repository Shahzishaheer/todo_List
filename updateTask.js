import { doc, getDoc, setDoc } from "firebase/firestore";
import { taskCollection } from "../assets/firebase";

export default async function updateTask(taskId, newData,  selectedDate) {
    try {
        // Retrieve the existing document
        const docRef = doc(taskCollection, taskId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Merge the existing data with the updated data and selected date
            const updatedData = { ...docSnap.data(),  ...newData, date: selectedDate };

            // Save the merged data back to Firestore
            await setDoc(docRef, updatedData);

            return true;
        } else {
            console.error("Document does not exist");
            return false;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    }
}
