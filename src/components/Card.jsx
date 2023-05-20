import React, { useState } from 'react';
import classes from '../scss/Card.module.css'
import downArrow from '../assets/downArrow.svg'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Card = () => {

    const defaultResult = "- - ";

    const { register, formState, control, handleSubmit } = useForm();
    const { errors, isValid } = formState;

    const onSubmit = formValues => {
        console.log(formValues);
    }
    // console.log(register('month'));
    // console.log(formState);
    // console.log(errors);
    console.log("isValid:", isValid);

    const [dayResult, setDayResult] = useState(defaultResult);
    const [monthResult, setMonthResult] = useState(defaultResult);
    const [yearResult, setYearResult] = useState(defaultResult);




    const resetResult = () => {
        setDayResult(defaultResult);
        setMonthResult(defaultResult);
        setYearResult(defaultResult);
    }

    const calculateAgeHandler = (event) => {
        event.preventDefault();
        const button = event.target;

        // Disable button to prevent countUp() from being called multiple times
        button.disabled = true;

        // Clear previous results
        resetResult();

        // Validate input and return if invalid
        // if (anyFieldsEmpty() || anyInvalidValues() || invalidDate()) {
        if (anyFieldsEmpty()) {
            button.disabled = false;
            return;
        }
    }




    return <article className={classes.card}>
        <section className={classes['card-body']}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={`${classes['form-group']} ${errors.day ? classes['error'] : ''}`}>
                <label htmlFor="day">DAY</label>
                <input id="day"
                        type="number"
                        className="fields"
                        {...register("day", {
                                required: "This field is required",
                                validate: {
                                    outsideDayRange: (value) => {
                                        return (
                                            !(value < 1 || value > 31) || "Must be a valid day"
                                        )
                                    }
                                }
                            }
                        )}
                        placeholder="DD" />
                <p>{errors.day?.message}</p>
            </div>

            <div className={`${classes['form-group']} ${errors.month ? classes['error'] : ''}`}>
                <label htmlFor="month">MONTH</label>
                <input id="month"
                        className={classes.fields}
                        type="number"
                        {...register("month", {
                                required: "This field is required",
                                validate: {
                                    outsideMonthRange: (value) => {
                                        return (
                                            !(value < 1 || value > 12) || "Must be a valid month"
                                        )
                                    }
                                }
                            }
                        )}
                        placeholder="MM" />
                <p>{errors.month?.message}</p>
            </div>

            <div className={`${classes['form-group']} ${errors.year ? classes['error'] : ''}`}>
                <label htmlFor="year">YEAR</label>
                <input id="year"
                        className={classes.fields}
                        type="number"
                        {...register("year", {
                                required: "This field is required",
                                validate: {
                                    outsideYearRange: (value) => {
                                        const currentYear = new Date().getFullYear();
                                        return (
                                            !(value > currentYear) || "Must be a valid year"
                                        )
                                    }
                                }
                            }
                        )}
                        placeholder="YYYY" />
                <p>{errors.year?.message}</p>
            </div>

            {/* <button id={classes.btnCalculateAge} onClick={calculateAgeHandler} disabled={false}> */}
            <button id={classes.btnCalculateAge} disabled={false}>
                <img src={downArrow} />
            </button>

        </form>
        </section>

        <section className={classes['card-results']}>
            <h1 className={classes['result-calculation']}><span id="yearResult">{dayResult}</span>years</h1>
            <h2 className={classes['result-calculation']}><span id="monthResult">{monthResult}</span>months</h2>
            <h3 className={classes['result-calculation']}><span id="dayResult">{yearResult}</span>days</h3>
        </section>
        <DevTool control={control} />
    </article>
}

export default Card;