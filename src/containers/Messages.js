import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actionsDialogs, actionsMessage } from '../redux/actions'
import { MessagesComponent } from '../components'
import socket from '../core/socket'

const Messages = ({
  id,
  fetchMessages,
  messages,
  createMessage,
  userId,
  user,
  users,
  leaveDialog,
  setActiveDialog,
}) => {
  const [newMessage, setNewMessage] = useState('')
  const [typingObj, setTyping] = useState(null)
  const onChangeInputMessage = (event) => {
    if (event.target.value.length > 0) {
      socket.emit('DIALOGS:TYPING', id, 'messages', user)
    }
    setNewMessage(event.target.value)
  }
  let typingTimeoutId = null

  const onSendMessage = () => {
    createMessage(newMessage, id)
    setNewMessage('')
  }

  useEffect(() => {
    socket.on(
      'MESSAGE:SEND',
      ({ dialogId, component }) =>
        component === 'messages' && fetchMessages(dialogId)
    )

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setTyping(null)
  }, [id])

  const toggleIsTyping = (user) => {
    setTyping(user)
    clearInterval(typingTimeoutId)
    typingTimeoutId = setTimeout(() => {
      setTyping(null)
    }, 3000)
  }

  useEffect(() => {
    socket.on(
      'DIALOGS:TYPING',
      ({ dialogId, component, user }) =>
        component === 'messages' && toggleIsTyping(user, dialogId)
    )
  })

  const handleLeaveDialog = () => {
    leaveDialog(id)
    setActiveDialog('')
  }

  return (
    <MessagesComponent
      leaveDialog={handleLeaveDialog}
      typingObj={typingObj}
      userId={userId}
      items={messages}
      onChangeInputMessage={onChangeInputMessage}
      valueInput={newMessage}
      onClickSend={onSendMessage}
      users={users}
    />
  )
}

const mapStateToProps = (state) => ({
  messages: state.message.messages,
  userId: state.user.id,
  user: state.user,
  users: state.message.users,
  activeDialog: state.dialog.activeDialog,
})
const mapDispatchToProps = (dispatch) => ({
  fetchMessages: (id) => {
    dispatch(actionsMessage.fetchMessages(id))
  },
  createMessage: (text, id) => {
    dispatch(actionsMessage.createMessage(text, id))
  },
  leaveDialog: (dialogId, history) =>
    dispatch(actionsDialogs.leaveDialog(dialogId, history)),
  setActiveDialog: (id) => {
    dispatch(actionsDialogs.setActiveDialog(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
