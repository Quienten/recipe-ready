import {Avatar, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import React from "react";
import { limit, orderBy, query, getDocs, writeBatch } from "firebase/firestore";
import {addInitialMessages, getMessageRef} from "../features/authentication/auth";

function Account({ currentUser, db }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const clearChatHistory = async() => {
        const messagesRef = getMessageRef(db, currentUser.uid)
        const q = query(messagesRef, orderBy("createdAt", "desc"), limit(25));
        const snapshot = await getDocs(q)

        const batch = writeBatch(db)

        snapshot.docs.forEach((msg) => {
            batch.update(msg.ref, {hidden: true})
        })

        await batch.commit()

        await addInitialMessages(db, currentUser.uid)
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