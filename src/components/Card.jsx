import React, { useState } from 'react';
import classes from '../scss/Card.module.css'
import downArrow from '../assets/downArrow.svg'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

const Card = () => {

    const defaultResult = "- - ";

    const { register, formState, control, handleSubmit, setError, trigger } = useForm();
    const { errors, isValid, isSubmitting } = formState;

    // console.log(register('month'));
    // console.log(formState);
    // console.log(errors);
    // console.log("isValid:", isValid);
    // console.log("isSubmitting:", isSubmitting);

    const [dayResult, setDayResult] = useState(defaultResult);
    const [monthResult, setMonthResult] = useState(defaultResult);
    const [yearResult, setYearResult] = useState(defaultResult);

    const resetResult = () => {
        setDayResult(defaultResult);
        setMonthResult(defaultResult);
        setYearResult(defaultResult);
    }

    const invalidDate = (formValues) => {
        const year = parseInt(formValues.year);
        const month = parseInt(formValues.month)-1;
        const day = parseInt(formValues.day);
        const inputDate = new Date(year, month, day);

        if (!(inputDate.getFullYear() == year &&
            inputDate.getMonth() == month &&
            inputDate.getDate() == day)) {

            setError("day", {
                type: "invalidDate",
                message: "Must be a valid date"
            });
            setError("month", {
                type: "invalidDate",
                message: ""
            });
            setError("year", {
                type: "invalidDate",
                message: ""
            });

            return true;
        }

        // Is valid date
        return false;
    }

    const calculateAgeHandler = (formValues) => {
        console.log(formValues);

        // Clear previous results
        resetResult();

        if (invalidDate(formValues)) {
            console.log('has invalid date');
            return;
        }

        console.log('valid date, able to calculate');
    }




    return <article className={classes.card}>
        <section className={classes['card-body']}>
        <form onSubmit={handleSubmit(calculateAgeHandler)} noValidate>
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
                                            !(value > currentYear) || "Must be in the past"
                                        )
                                    }
                                }
                            }
                        )}
                        placeholder="YYYY" />
                <p>{errors.year?.message}</p>
            </div>

            {/* <button id={classes.btnCalculateAge} onClick={calculateAgeHandler} disabled={false}> */}
            <button id={classes.btnCalculateAge} disabled={isSubmitting}>
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