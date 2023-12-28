import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FIRST_MSG } from "../../data/constants";

export function getMessageRef(db, uid) {
    let messagesPath= "users/" + uid + "/messages"
    return collection(db, messagesPath)
}


export async function addInitialMessages(db, uid) {
    const messagesRef = getMessageRef(db, uid)
    await setDoc(doc(messagesRef), {
        author: "ai",
        type: "chat",
        text: FIRST_MSG,
        createdAt: serverTimestamp(),
        hidden: false
    })
    await setDoc(doc(messagesRef), {
        type: "what_to_cook",
        createdAt: serverTimestamp(),
        hidden: false
    })
}
