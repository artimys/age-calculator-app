import classes from '../scss/NumberInput.module.css'
import { useFormContext } from 'react-hook-form'

const NumberInput = (props) => {

    // retrieve all hook methods
    const { register, formState: { errors } } = useFormContext();

    return <>
        <div className={`${classes['form-group']} ${errors[props.name] ? classes['error'] : ''}`}>
            <label htmlFor={props.name}>{props.name}</label>

            <input type="number"
                    id={props.name}
                    className={classes.fields}
                    placeholder={props.placeholder}
                    onInput={props.moveFocusHandler}
                    aria-invalid={errors[props.name] ? "true" : "false"}

                    {...register(props.name, {
                                        ...props.validation,
                                        valueAsNumber: true
                                    })
                    }

                    // event has to come after register
                    onBlur={props.twoDigitBlurHandler}
                    // onBlur={(e) => {
                    //     // props.blurHandler
                    //     console.log('touch');
                    // }}
            />

            <p role="alert">{errors[props.name]?.message}</p>
        </div>

    </>
}

export default NumberInput;