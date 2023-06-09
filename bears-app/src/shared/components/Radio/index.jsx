import { Label } from '../index'
import PropTypes from 'prop-types'

/**
 * a functional component that renders an input of radio type
 * @component
 * @param {string} label - displayed in ui
 * @param {string} value - assigned to value param in html
 * @param {boolean} defaultChecked - determines if the radio is default selected
 * @return {html} returns a semantic input as type radio element
 */

const Radio = ({ label, value, defaultChecked }) => {
  return (
    <>
      <div className="usa-radio">
        <input
          className="usa-radio__input"
          id={label}
          type="radio"
          name={label}
          value={value || label}
          defaultChecked={defaultChecked || false}
        />
        <Label className="usa-radio__label" htmlFor={label} label={label} />
      </div>
    </>
  )
}

Radio.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  defaultChecked: PropTypes.bool,
}

export default Radio
