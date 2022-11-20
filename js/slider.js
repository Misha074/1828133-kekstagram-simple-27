const image = document.querySelector('.img-upload__preview img');
const form = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    start: 50,
    step: 1
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let choosenEffect = DEFAULT_EFFECT;

const isDefault = () => choosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: choosenEffect.min,
      max: choosenEffect.max
    },
    step: choosenEffect.step,
    start: choosenEffect.start
  });
  if (isDefault()) {
    sliderContainer.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  choosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = `${choosenEffect.style}(${sliderValue}${choosenEffect.unit})`;
  image.classList.add(`effects__preview--${choosenEffect.name}`);
  effectLevel.value = sliderValue;
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max
    },
    step: DEFAULT_EFFECT.step,
    start: DEFAULT_EFFECT.start,
    connect: 'lower'
  });
  updateSlider();
};

createSlider();
sliderElement.noUiSlider.on('update', onSliderUpdate);
form.addEventListener('change', onFormChange);

const resetEffects = () => {
  choosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

export {resetEffects};
