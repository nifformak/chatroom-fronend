import constants from '../constants/message'
import messageApi from "../../utils/api/message";
import {actionsDialogs} from "./index";
import socket from '../../core/socket';

const actions = {
    setMessages: (messages) => ({
        type:constants.SET_MESSAGES,
        payload: messages
    }),
    setUsers: (users) => ({
        type:constants.SET_USERS,
        payload: users
    }),
    fetchMessages: (id) => async (dispatch) => {
        const {data} = await messageApi.fetchMessages(id);
        if(data.messages){
        dispatch(actions.setMessages(data.messages))
        dispatch(actions.setUsers(data.users))
        }
        else if(data.message === "User not found") {
            await dispatch(actionsDialogs.addUserToDialog(id))
        }
    },
    createMessage: (text, dialogId) => async (dispatch) => {
        await messageApi.createMessage(text, dialogId);
        socket.emit('MESSAGE:SEND', dialogId, 'dialogs');
        socket.emit('MESSAGE:SEND', dialogId, 'messages');
        dispatch(actions.fetchMessages(dialogId));
        dispatch(actionsDialogs.fetchDialogs())
    },
}

export default actions
