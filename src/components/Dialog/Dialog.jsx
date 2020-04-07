import React from 'react'
import "./Dialog.scss"
import classNames from 'classnames'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'

const Dialog = ({ _id, name, userName, text, updatedAt, active, onSelect, last_message }) => {
  return (
    <div className={classNames("Dialog", active && "Dialog_active")} onClick={() => onSelect(_id)}>
      <div className="Dialog__content">
        <div className="Dialog__name">
          <span>{name}</span>
        </div>
        <div className="Dialog__info">
            {last_message && <span>{last_message.creatorName}</span> }
            <span className="Dialog__date">{formatDistanceToNow(Date.parse(updatedAt), {
            addSuffix: true,
            locale: ruLocale
          })}</span>
        </div>
        {<div className="Dialog__text">
            {last_message ? <p>{last_message.text}</p>: <p>Диалог создан</p>}
        </div>}
      </div>
    </div>
  )
}

export default Dialog
