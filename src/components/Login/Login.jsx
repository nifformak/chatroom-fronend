import React from 'react'
import { Button, Form, Input, Icon } from 'antd'
import './Login.scss'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Login = ({
  values,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isLoading,
}) => {
  return (
      <div className={'login'}>
        {isLoading ? <div><Spin  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div> :
        <div className={'login__form'}>
          <Form layout="inline" onSubmit={handleSubmit}>
            <Form.Item
              validateStatus={errors.login && 'error'}
              help={errors.login}
            >
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Login"
                id="login"
                value={values.login}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>}
      </div>
  )
}

export default Login
