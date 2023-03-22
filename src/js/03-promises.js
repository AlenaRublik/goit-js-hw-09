import Notiflix from 'notiflix';

const refs = { 
form: document.querySelector('.form'),
delay: document.querySelector("input[name=delay]"),
step: document.querySelector("input[name=step]"),
amount: document.querySelector("input[name=amount]"),
}

refs.form.addEventListener("submit", handleFormSubmit);

// const position = null;

function handleFormSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);
  
  if (delay < 0 || step < 0 || amount < 1) {
    Notiflix.Report.failure(
      'Incorrect value',
      'Enter correct values',
      'Continue');
    return;
  }
  
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
  } else {
        reject({ position, delay });
  }
  }, delay)
  }) 
}
