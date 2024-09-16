import classNames from 'classnames'
import React from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { ImCross } from 'react-icons/im'

export default function Notification() {
  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              minWidth: '400px',
              background: '#101820FF',
              color: '#adbbda',
              fontFamily: 'cursive',
              fontSize: '0.8rem',
              // boxShadow: 'inset 0 4px 6px 0 black , inset 0 6px 8px 0 #5adbb5',
              textAlign: 'center',
            },
          },
          error: {
            style: {
              minWidth: '400px',
              background: '#101820FF',
              color: '#adbbda',
              fontFamily: 'cursive',
              fontSize: '0.8rem',
              // boxShadow: 'inset 0 4px 6px 0 black , inset 0 6px 8px 0 #ff0033',
              textAlign: 'center',
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <ImCross onClick={() => toast.dismiss(t.id)} color="#adbbda" />
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  )
}
