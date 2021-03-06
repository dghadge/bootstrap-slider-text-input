/* global $ */

function SliderTextInput (slider) {
  var textInputLeft = $(slider).closest('.form-group').find('.slider-input-left input[type="text"]').get().shift()
  var textInputRight = $(slider).closest('.form-group').find('.slider-input-right input[type="text"]').get().shift()
  var textInputBottom = $(slider).closest('.form-group').find('.slider-input-bottom input[type="text"]').get().shift()
  var textInput = textInputLeft || textInputRight || textInputBottom

  var sliderValueToTextInput = function () {
    var value = $(slider).slider('getValue')

    if (Array.isArray(value)) {
      if ($(textInputLeft).val() !== value[0]) {
        $(textInputLeft).val(value[0])
      }

      if ($(textInputRight).val() !== value[1]) {
        $(textInputRight).val(value[1])
      }
    } else {
      if ($(textInput).val() !== value) {
        $(textInput).val(value)
      }
    }
  }

  var textInputValueToSlider = function (element) {
    var sliderValue = $(slider).slider('getValue')
    var value = parseFloat($(element).val())

    if (Array.isArray(sliderValue)) {
      if (element === textInputLeft) {
        sliderValue[0] = value
      } else if (element === textInputRight) {
        sliderValue[1] = value
      }
    } else {
      sliderValue = value
    }

    $(slider).slider('setValue', sliderValue)
  }

  var validateValues = function () {
    var valueLeft = parseFloat($(textInputLeft).val())
    var valueRight = parseFloat($(textInputRight).val())

    if (valueLeft > valueRight) {
      var tmp = valueLeft
      $(textInputLeft).val(valueRight)
      $(textInputRight).val(tmp)
      $(slider).slider('setValue', [valueRight, valueLeft])
    }

    sliderValueToTextInput()
  }

  $(slider).change(function () {
    sliderValueToTextInput()
  })

  $(textInputLeft).on('input', function (event) {
    textInputValueToSlider(event.target)
  })

  $(textInputLeft).on('blur', function (event) {
    validateValues()
  })

  $(textInputRight).on('input', function (event) {
    textInputValueToSlider(event.target)
  })

  $(textInputRight).on('blur', function (event) {
    validateValues()
  })

  $(textInputBottom).on('input', function (event) {
    textInputValueToSlider(event.target)
  })

  $(textInputBottom).on('blur', function (event) {
    validateValues()
  })

  sliderValueToTextInput()
}

$.bridget('sliderTextInput', SliderTextInput)
