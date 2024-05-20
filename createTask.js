import { taskCollection } from "../assets/firebase";
import {addDoc} from "firebase/firestore";

export default async function createTask(data) {
    try{
    const doc = await addDoc(taskCollection,data)
    console.log(doc);

} catch(err) {
    console.log(err)
}

}