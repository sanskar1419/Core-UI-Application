import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLoadingState, userActions } from '../../../redux/slices/user.slice'
import { getError, getMessage, notificationAction } from '../../../redux/slices/notification.slice'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(getError)
  const message = useSelector(getMessage)
  const userLoading = useSelector(getUserLoadingState)

  useEffect(() => {
    if (message != null) {
      toast.success(message)
      dispatch(notificationAction.resetMessage())
    }
    if (error != null) {
      toast.error(error)
      dispatch(notificationAction.resetError())
    }
  }, [message, error])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      dispatch(userActions.signInStart())
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        if (data.statusCode === 404) {
          navigate('/404')
          return
        } else if (data.statusCode === 500) {
          navigate('/500')
          return
        } else {
          dispatch(userActions.signInError(data.message))
          return
        }
      }
      dispatch(userActions.signInSuccess(data))
      localStorage.setItem('logged-in-user', JSON.stringify(data))
      navigate('/')
    } catch (error) {
      dispatch(userActions.signInError(error.message))
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed} />
                      </CInputGroupText>
                      <CFormInput
                        id="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={handleChange}
                        type="email"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
