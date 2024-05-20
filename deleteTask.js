import {doc,deleteDoc} from "firebase/firestore"
import { taskCollection } from "../assets/firebase"
export default async function deleteTask(taskId) {
    try{
const ref = doc(taskCollection,taskId);
await deleteDoc(ref);
return true;
}catch(err) {
    console.log(err);
    return err;
}}