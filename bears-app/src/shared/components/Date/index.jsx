import PropTypes from 'prop-types'
import './_index.scss'

/**
 * a parse our date object
 * @component
 * @param {func} onChange - inherited change handler
 * @param {string} required - inherited string value to manage required state
 * @param {object} value - inherited state values
 * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
 */
const Date = ({ onChange, value, required, ui }) => {
  const { date, select } = ui
  const { labelDay, labelMonth, labelYear } = date
  const { defaultValue } = select
  /**
   * a parse our date object
   * @function
   * @param {object} value - { day, month, year }
   * @return {Date} returns a tandard format Date ie 1995-12-17T03:24:00
   */
  const parseDate = value => {
    const d = value && new window.Date(value.year, value.month, value.day)
    return d
  }

  return (
    <div className="usa-memorable-date">
      <div className="usa-form-group usa-form-group--month usa-form-group--select">
        <label className="usa-label" htmlFor="date_of_birth_month">
          {labelMonth}
        </label>
        <select
          className={`usa-select ${
            required === 'TRUE' ? 'required-field' : ''
          }`}
          id="date_of_birth_month"
          name="date_of_birth_month"
          aria-describedby="mdHint"
          required="required"
          value={
            new window.Date(parseDate(value)).getMonth() ||
            (value && value.month) ||
            ''
          }
          onChange={onChange}
        >
          <option value>{defaultValue}</option>
          <option value="0">01 - January</option>
          <option value="1">02 - February</option>
          <option value="2">03 - March</option>
          <option value="3">04 - April</option>
          <option value="4">05 - May</option>
          <option value="5">06 - June</option>
          <option value="6">07 - July</option>
          <option value="7">08 - August</option>
          <option value="8">09 - September</option>
          <option value="9">10 - October</option>
          <option value="10">11 - November</option>
          <option value="11">12 - December</option>
        </select>
      </div>
      <div className="usa-form-group usa-form-group--day">
        <label className="usa-label" htmlFor="date_of_birth_day">
          {labelDay}
        </label>
        <input
          className={`usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby="mdHint"
          id="date_of_birth_day"
          name="date_of_birth_day"
          maxLength="2"
          pattern="[0-9]*"
          inputMode="numeric"
          value={
            new window.Date(parseDate(value)).getDate() ||
            (value && value.day) ||
            ''
          }
          onChange={onChange}
        />
      </div>
      <div className="usa-form-group usa-form-group--year">
        <label className="usa-label" htmlFor="date_of_birth_year">
          {labelYear}
        </label>
        <input
          className={`usa-input ${required === 'TRUE' ? 'required-field' : ''}`}
          aria-describedby="mdHint"
          id="date_of_birth_year"
          name="date_of_birth_year"
          minLength="4"
          maxLength="4"
          pattern="[0-9]*"
          inputMode="numeric"
          value={
            (value?.year?.length === 4 &&
              new window.Date(parseDate(value)).getFullYear()) ||
            (value && value.year) ||
            ''
          }
          onChange={onChange}
        />
      </div>
    </div>
  )
}

Date.propTypes = {
  onChange: PropTypes.func,
  required: PropTypes.string,
  value: PropTypes.object,
}

export default Date
