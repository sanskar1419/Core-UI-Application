import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { getError, getMessage, notificationAction } from '../redux/slices/notification.slice'
import toast from 'react-hot-toast'

const DefaultLayout = () => {
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
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
