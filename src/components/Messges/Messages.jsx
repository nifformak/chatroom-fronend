import React from 'react'
import Message from '../Message/Message'
import './Messages.scss'
import { Input, Button } from 'antd'

const Messages = ({
  items,
  onChangeInputMessage,
  valueInput,
  onClickSend,
  userId,
  typingObj,
  users,
  leaveDialog,
}) => {
  return (
    <div className={'Messages'}>
      <div className={'Messages__header'}>
        Участники: <>{users.map((user) => user.login + ' ')}</>
      </div>
      <Button onClick={leaveDialog}>Выйти из диалога</Button>
      <div className={'Messages__content'}>
        {items.length ? (
          <>
            {items.map((item, index) => (
              <Message
                isMe={userId === item.creator}
                key={index}
                name={item.creatorName}
                {...item}
              />
            ))}
            {typingObj && (
              <Message
                isMe={false}
                creatorName={typingObj.name}
                isTyping={true}
              />
            )}
          </>
        ) : (
          <span>not messages</span>
        )}
      </div>
      <div className={'Messages__input'}>
        <Input.TextArea
          value={valueInput}
          onChange={onChangeInputMessage}
          autoSize={true}
        />
        <div className={'Messages__input-button'}>
          <Button
            disabled={!valueInput.length}
            type="primary"
            onClick={() => onClickSend()}
          >
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Messages
