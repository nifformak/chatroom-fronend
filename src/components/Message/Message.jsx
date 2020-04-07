import React from 'react';
import classNames from 'classnames'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ruLocale from 'date-fns/locale/ru'

import './Message.scss'

const Message = ({creatorName, updatedAt, text, isMe, className, isTyping}) => {
    return (
        <div className={classNames('Message', className, isMe && 'Message_me', isTyping && 'Message_is-typing')}>
            <div className="Message__content">
                {text &&<p className={'Message__text'}>
                    {text}
                </p>}
                {isTyping &&
                <div className="Message__loading">
                    <div className={'dot'}/>
                    <div className={'dot'}/>
                    <div className={'dot'}/>
                </div>}
                <div className="Message__info">
                    <span className={'Message__username'}>{creatorName}</span>
                    {updatedAt &&<span className={'Message__date'}>{formatDistanceToNow(Date.parse(updatedAt), {
                        addSuffix: true,
                        locale: ruLocale
                    })}</span>}
                </div>
            </div>
        </div>
    );
};

export default Message;