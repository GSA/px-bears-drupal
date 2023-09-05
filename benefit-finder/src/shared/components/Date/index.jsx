import PropTypes from 'prop-types'
// import parseDate from '../../utils/parseDate'
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
  const { labelDay, labelMonth, labelYear, monthOptions } = date
  const { dateDefaultValue } = select

  // Note: when we break each input into functional components they trigger unwanted rerenders

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
          value={(value && value.month) || ''}
          onChange={onChange}
        >
          <option value="" key="default" disabled>
            {dateDefaultValue}
          </option>
          {monthOptions.map((option, i) => (
            <option value={i} key={`${option.label}-${i}`}>
              {option.label}
            </option>
          ))}
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
          value={(value && value.day) || ''}
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
          value={(value && value.year) || ''}
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