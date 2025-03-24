import { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const { target } = e;

  const delay = Number(target.delay.value);
  const step = Number(target.step.value);
  const amount = Number(target.amount.value);

  resultPromise(delay, step, amount);
}

function resultPromise(delay, step, amount) {
  for (let i = 0; i < amount; i += 1) {
    const delayWithStep = Number(delay) + i * step;

    createPromise(i + 1, delayWithStep)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', handleFormSubmit);
