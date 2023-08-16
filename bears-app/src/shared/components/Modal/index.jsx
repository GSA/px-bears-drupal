import { useEffect, useState } from 'react'
import NavModal from 'react-modal'
import PropTypes from 'prop-types'
import Close from './assets/close.svg'
import { ObfuscatedLink } from '../index'

import './_index.scss'

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    borderRadius: '8px',
  },
}

/**
 * a functional component that renders a trigger, that when clicked opens a dialog
 * @component
 * @param {string} id - matches to modal control
 * @param {React.ReactNode} children - inherited children
 * @param {string} triggerLabel - passed to button for triggering modal
 * @param {string} modalHeading - heading value
 * @param {string} navItemOneLabel - passed to button for nav item in modal
 * @param {string} navItemTwoLabel - passed to button for nav item in modal
 * @return {html} returns html for seting up a usa-modal component
 */
const Modal = ({
  id,
  children,
  triggerLabel,
  modalHeading,
  navItemOneLabel,
  navItemOneFunction,
  navItemTwoLabel,
  navItemTwoFunction,
  handleCheckRequriedFields,
}) => {
  // state
  const [modalIsOpen, setIsOpen] = useState(false)

  // handlers
  /**
   * a function that checks for errors and then triggers the modal to open state
   * @function
   */
  const handleOpenModal = () => {
    handleCheckRequriedFields() === true && setIsOpen(true)
  }

  /**
   * a function that triggers the modal to a closed state
   * @function
   */
  const handleCloseModal = () => {
    // clear the hash
    window.location.hash = ''
    setIsOpen(false)
  }

  // effects
  useEffect(() => {
    // set our application root id here
    NavModal.setAppElement('#usagov-bears-app')
  }, [])

  /**
   * a functional component that renders a link as a button for launching our dialog
   * @component
   * @param {string} id - matches to modal control
   * @param {string} triggerLabel - passed to button for triggering modal
   * @return {html} returns an obfustacted anchor element
   */
  const Trigger = ({ id, triggerLabel, onClick }) => {
    return (
      <ObfuscatedLink href={`#${id}`} onClick={onClick} noCarrot>
        {triggerLabel}
      </ObfuscatedLink>
    )
  }

  /**
   * a functional component that renders a two links as a buttons for navigating out of the dialog
   * @component
   * @param {string} navItemOneLabel - passed to button for nav item in modal
   * @param {func} navItemOneFunction - passed to button for nav item in modal
   * @param {string} navItemOneLabel - passed to button for nav item in modal
   * @param {func} navItemTwoFunction - passed to button for nav item in modal
   * @return {html} returns an obfustacted anchor element
   */
  // similar to ButtonGroup but we need links for uswds to close modal, this item is default and conditional
  const GroupNavigation = ({
    navItemOneLabel,
    navItemOneFunction,
    navItemTwoLabel,
    navItemTwoFunction,
  }) => {
    return (
      <ul className="modal usa-button-group width-full">
        <li className="usa-button-group__item width-full">
          <ObfuscatedLink
            id="navItemOneBtn"
            className="nav-item-one width-full"
            onClick={() => navItemOneFunction()}
            noCarrot
          >
            {navItemOneLabel}
          </ObfuscatedLink>
        </li>
        <li className="usa-button-group__item width-full">
          <ObfuscatedLink
            id="navItemTwoBtn"
            className="nav-item-two width-full"
            onClick={() => navItemTwoFunction()}
            noCarrot
          >
            {navItemTwoLabel}
          </ObfuscatedLink>
        </li>
      </ul>
    )
  }

  return (
    <div className="benefit-modal-group">
      <Trigger
        id={id}
        triggerLabel={triggerLabel}
        onClick={() => handleOpenModal()}
      ></Trigger>
      <NavModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel={modalHeading}
      >
        <button
          type="button"
          className="modal-button"
          onClick={() => handleCloseModal()}
        >
          <img src={Close} alt="a plus icon" />
        </button>
        {children || (
          <GroupNavigation
            navItemOneLabel={navItemOneLabel}
            navItemOneFunction={navItemOneFunction}
            navItemTwoLabel={navItemTwoLabel}
            navItemTwoFunction={navItemTwoFunction}
          />
        )}
        {/* child example: <ul className="usa-button-group">
          <li className="usa-button-group__item">
            <button type="button" className="usa-button" data-close-modal>
              Continue without saving
            </button>
          </li>
          <li className="usa-button-group__item">
            <button
              type="button"
              className="usa-button padding-105 text-center"
              data-close-modal
            >
              Go back
            </button>
          </li>
        </ul> */}
      </NavModal>
    </div>
  )
}

Modal.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  triggerLabel: PropTypes.string,
  modalHeading: PropTypes.string,
  navItemOneLabel: PropTypes.string,
  navItemOneFunction: PropTypes.func,
  navItemTwoLabel: PropTypes.string,
  navItemTwoFunction: PropTypes.func,
}

export default Modal
