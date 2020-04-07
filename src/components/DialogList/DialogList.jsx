import React from 'react'
import './Dialogs.scss'
import orderBy from 'lodash/orderBy'
import Dialog from '../Dialog/Dialog'
import { Form, Input, Button } from 'antd'
const DialogList = ({
  dialogs,
  values,
  handleChange,
  handleSubmit,
  isLoaded,
  errors,
  activeDialogId,
  onSelect,
}) => {
  return (
    <ul className={'Dialogs'}>
      <div className={'Dialogs__adder'}>
        <Form name="addDialogForm" layout="inline" onSubmit={handleSubmit}>
          <Form.Item validateStatus={errors.name && 'error'}>
            <Input
              id="name"
              value={values.name}
              onChange={handleChange}
              type={'string'}
              placeholder={'chat name'}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              +
            </Button>
          </Form.Item>
        </Form>
      </div>
      {dialogs.length ? (
        orderBy(dialogs, ['updatedAt'], ['desc']).map((dialog) => (
          <Dialog
            key={dialog._id}
            {...dialog}
            onSelect={onSelect}
            active={dialog._id === activeDialogId}
          />
        ))
      ) : (
        <>{isLoaded && <span>create your first chat</span>}</>
      )}
    </ul>
  )
}

export default DialogList
