import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import React from "react";
import {collection, limit, orderBy, query, getDocs, writeBatch, setDoc, doc, serverTimestamp} from "firebase/firestore";

function Account({ currentUser, db }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const FIRST_MSG = "Hello, I am Chef Marcus, I will be helping you cook today! Please provide me your personal goals for this meal."

    const clearChatHistory = async() => {
        const messagesPath = "users/" + currentUser.uid + "/messages"
        const messagesRef = collection(db, messagesPath)
        const q = query(messagesRef, orderBy("createdAt"), limit(25));
        const snapshot = await getDocs(q)

        const batch = writeBatch(db)

        snapshot.docs.forEach((msg) => {
            batch.update(msg.ref, {hidden: true})
        })

        await batch.commit()

        await setDoc(doc(messagesRef), {
            author: "ai",
            type: "chat",
            text: FIRST_MSG,
            createdAt: serverTimestamp()
        })
        await setDoc(doc(messagesRef), {
            type: "what_to_cook",
            createdAt: serverTimestamp(),
        })
    }

    return <>
        <Tooltip title="Account settings">
            <IconButton onClick={handleClick}>
                <Avatar
                    alt={currentUser.displayName}
                    src={currentUser.photoURL}
                    className="account-avatar"
                />
            </IconButton>
        </Tooltip>
        <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={clearChatHistory}>Clear Chat History</MenuItem>
        </Menu>
    </>
}

export default Account