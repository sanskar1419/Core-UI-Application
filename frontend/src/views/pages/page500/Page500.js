import React, { useEffect } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getError, getMessage, notificationAction } from '../../../redux/slices/notification.slice'

const Page500 = () => {
  const dispatch = useDispatch()
  const error = useSelector(getError)
  const message = useSelector(getMessage)

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
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <span className="clearfix">
              <h1 className="float-start display-3 me-4">500</h1>
              <h4 className="pt-3">Houston, we have a problem!</h4>
              <p className="text-body-secondary float-start">
                The page you are looking for is temporarily unavailable.
              </p>
            </span>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page500
