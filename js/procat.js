// состояния додано - додати на прокате

function toggleState(btn, active) {
  btn = $(btn);

  btn.toggleClass(active);

  let is = btn.hasClass(active);
  // checkbox ищем среди соседних элементов
  btn.siblings('input[type="checkbox"]').attr('checked', is);
  btn.find('span').text(is ? btn.data('end') : btn.data('start'));

  CountDaysAndSum();
}

function changeStateBuy(btn, active) {
  $(document).on('click', btn, function() {
    toggleState(this, active);
  })
}

changeStateBuy('.equipment__btn', 'equipment__btn--check');

changeStateBuy('.buy__btn', 'buy__btn--check');

function formdat(d) {
  if (d == undefined) return;
  let dt = d.split('.');
  return dt[dt.length - 1].length > 2 ? dt = dt.reverse().join('-') : dt = '20' + d.split('.').reverse().join('-');
}

function calcDate(date1, date2) {
  var diff = Math.floor(date1.getTime() - date2.getTime());
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff / day);
  let message = '';


  message = days;

  return message;
}

function CountDaysAndSum() {
  let dateStart = $('#date_start').val();
  let dateEnd = $('#date_end').val();
  let date2 = new Date(formdat(dateStart));
  let date1 = new Date(formdat(dateEnd));
  let days = calcDate(date1, date2)
  $('.js-days').val(days).text(days);

  let typeData = "cost";
  if ($('.js-complect:checked').length) {
    typeData = "cost-complete"
  }

  let cost = counter(parser('.js-data-cost', typeData), days)
  $('.js-other:checked').each((i, check) => {
    cost += counter(parser(check, "cost"), days)
  })


  $('.js-cost').val(cost).text(cost);


  function counter(costs, days) {
    let cost = 0;
    for (let i = 0; i < days; i++) {
      cost += costs[Math.min(i, costs.length - 1)]
    }
    return cost;
  }

  function parser(node, key) {
    let data = $(node).data(key);
    console.log(data);
    let costs = (data || "").split(",").map(parseFloat);
    if (costs.includes(NaN)) throw `No valid data: "${data}", key: "${key}"`;
    return costs;
  }
}

function parseDate(date) {
  const [d, m, y] = date.split('.');
  return Date.parse(`${y}-${m}-${d}`);
}

// --------
function correctDate(date) {
  return date.replace(/^\d{2}(?=\.)/, (dd) => +dd + 1);
}

//datapicker



if ($('.rcard__block').length > 0) {

  let localeUa = {
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    monthsShort: ['Січ', 'Лют', 'Бер', 'Кв', 'Трав', 'Черв', 'Лип', 'Сер', 'Сен', 'Жовт', 'Лист', 'Груд'],
    dateFormat: 'dd.MM.yyyy',
    firstDay: 1
  };

  let date_start = new AirDatepicker('#date_start', {
    autoClose: false,
    toggleSelected: false,
    multipleDatesSeparator: ' - ',
    locale: localeUa,
    minDate: (() => {
      let d = new Date();
      return d;
    })(),
    selectedDates: [new Date()],
    onShow(isFinished) {
      if (isFinished) {
        // запоминаем значение при открытии,
        // чтобы использовать в кнопке Отмена
        date_start.customOpenDate = date_start.lastSelectedDate
      }
    },
    onHide(isFinished) {
      if (isFinished) {
        // удаляем значение
        delete date_start.customOpenDate
      }
    },
    onSelect({
      date
    }) {
      let startD = parseDate(date_start.$el.value);
      let endD = parseDate(date_end.$el.value);

      let newMinDateEnd = new Date(startD)
      newMinDateEnd.setDate(newMinDateEnd.getDate() + 1);

      if (startD >= endD) {
        date_end.clear()
        date_end.selectDate(newMinDateEnd);
      }

      // не переносить выше .selectDate(new)!
      date_end.update({
        minDate: newMinDateEnd
      })

      CountDaysAndSum();
    }
  });

  let date_end = new AirDatepicker('#date_end', {
    autoClose: false,
    toggleSelected: false,
    multipleDatesSeparator: ' - ',
    locale: localeUa,
    minDate: (() => {
      // минимальная дата на единицу больше сегодняшней,
      // которая указана по умолчанию в date_start
      let d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    })(),
    selectedDates: (() => {
      // минимальная дата на единицу больше сегодняшней,
      // которая указана по умолчанию в date_start
      let d = new Date();
      d.setDate(d.getDate() + 1);
      return [d];
    })(),
    onShow(isFinished) {
      if (isFinished) {
        // запоминаем значение при открытии,
        // чтобы использовать в кнопке Отмена
        date_end.customOpenDate = date_end.lastSelectedDate
      }
    },
    onHide(isFinished) {
      if (isFinished) {
        // удаляем значение
        delete date_end.customOpenDate
      }
    },
    onSelect({
      date
    }) {
      CountDaysAndSum();
    },
  });


  // требуется задержка
  setTimeout(CountDaysAndSum, 0)

}

$(document).on('change', '.equipment__wrap .size__select', function(e) {

  let wrap = $(e.target).parents('.equipment__holder');
  console.log(wrap)
  let btn = wrap.find('.equipment__btn');
  wrap.find('.equipment__btn').removeAttr('disabled').addClass('equipment__btn--check').find('span').text(btn.data('end'));
  $(e.target).parents('.equipment__item').find('.js-complect').attr('checked', true);
  CountDaysAndSum();
});

$(document).on('change', '.buy .buy__box', function(e) {
  let wrap = $(e.target).parents('.buy__box');
  let btn = wrap.find('.buy__btn');
  wrap.find('.buy__btn').removeAttr('disabled').addClass('buy__btn--check').find('span').text(btn.data('end'));
  $(e.target).parents('.buy__box').find('.js-other').attr('checked', true);
  CountDaysAndSum();
});
