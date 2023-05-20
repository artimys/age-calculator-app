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

    const invalidDate = (year, month, day) => {
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

        // Is a valid date
        return false;
    }

    const calculateAge = (start, end) => {
        const startYear = start.getFullYear();
        const startMonth = start.getMonth();
        const startDateOfMonth = start.getDate();

        const endYear = end.getFullYear();
        const endMonth = end.getMonth();
        const endDateOfMonth = end.getDate();

        let years = endYear - startYear;
        let months = endMonth - startMonth;
        let days = endDateOfMonth - startDateOfMonth;

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months += 12;
        }

        if (days < 0) {
            const lastMonthStartDate = new Date(endYear, endMonth - 1, 1);
            const lastMonthEndDate = new Date(endYear, endMonth, 0);
            const lastMonthDays = lastMonthEndDate.getDate();
            days = lastMonthDays - startDateOfMonth + endDateOfMonth;
            months--;
        }

        return {
            years: years,
            months: months,
            days: days
        }
    }

    const countUp = (element, target, duration) => {
        return new Promise((resolve) => {
            let count = 0;
            const interval = Math.ceil(duration / target);

            const countInterval = setInterval(() => {
                count++;
                element.innerText = count;

                if (count >= target) {
                    clearInterval(countInterval);
                    resolve();
                }
            }, interval);
        });
    }

    const calculateAgeHandler = async (formValues) => {
        console.log(formValues);

        // Clear previous results
        resetResult();

        // Parse values to integer
        const year = parseInt(formValues.year);
        const month = parseInt(formValues.month)-1;
        const day = parseInt(formValues.day);

        if (invalidDate(year, month, day)) {
            console.log('has invalid date');
            return;
        }

        // Calculate age
        const inputDate = new Date(year, month, day);
        const currentDate = new Date();
        const results = calculateAge(inputDate, currentDate);
        console.log('results', results);


        // Display results
        try {
            // await countUp(yearResult, results.years, 1000);
            // await countUp(monthResult, results.months, 200);
            // await countUp(dayResult, results.days, 400);
            setYearResult(results.years);
            setMonthResult(results.months);
            setDayResult(results.days);

            // this.disabled = false;
        } catch (error) {
            console.error("CountUp Error:", error);
            // this.disabled = false;
        }
    }




    return <article className={classes.card}>
        <section className={classes['card-body']}>
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
            <button id={classes.btnCalculateAge}
                    disabled={isSubmitting}
                    onClick={handleSubmit(calculateAgeHandler)}>
                <img src={downArrow} />
            </button>

        </section>

        <section className={classes['card-results']}>
            <h1 className={classes['result-calculation']}><span id="yearResult">{yearResult}</span>years</h1>
            <h2 className={classes['result-calculation']}><span id="monthResult">{monthResult}</span>months</h2>
            <h3 className={classes['result-calculation']}><span id="dayResult">{dayResult}</span>days</h3>
        </section>
        <DevTool control={control} />
    </article>
}

export default Card;