import { withFormik } from 'formik'
import { LoginComponent } from '../../components'

import store from '../../redux/store'
import { actionsUser } from '../../redux/actions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  isLoading: state.user.loading,
})

const Login = connect(mapStateToProps)(
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      login: '',
    }),
    validate: (values) => {
      let errors = {}
      if (!values.login) {
        errors.login = 'Please input your login!'
      }
      return errors
    },
    handleSubmit: (values ) => {
      store.dispatch(actionsUser.createUser(values.login))
    },
    displayName: 'LoginForm',
  })(LoginComponent)
)

export default Login
