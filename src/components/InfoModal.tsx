import React from 'react'

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-stone-900/60 dark:bg-gray-900/80 transition-opacity"
          onClick={onClose}
        />
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-5 pt-6 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-semibold text-stone-900 dark:text-white"
                  id="modal-title"
                >
                  {title}
                </h3>
                <div className="mt-4 text-stone-700 dark:text-gray-200">{children}</div>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 dark:bg-gray-700 px-5 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-5 py-2.5 bg-stone-800 dark:bg-stone-600 text-base font-medium text-white hover:bg-stone-700 dark:hover:bg-stone-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm transition"
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
