<template>
  <FullCalendar ref="fullCalendar" class='demo-app-calendar' :options="calendarOptions" />

  <!-- Модальное окно для создания, редактирования, удаления записи -->
  <div class="modal fade" id="recordModal" tabindex="-1" aria-labelledby="recordModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="recordModal">Редактировние записи</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form class="needs-validation" id="eventForm" novalidate>
            <!-- Нельзя менять вид записи, иначе будете бебе с бэдэ (разные таблицы) -->
            <div class="mb-3" v-if="currentModal.isNewRecord">
              <label for="data-type" class="col-form-label">Вид записи:</label>
              <select v-model="currentModal.dataType" id="data-type" class="form-select" required>
                <option value="health-record">Состояние здоровья</option>
                <option value="event">Событие/напоминание</option>
              </select>
              <div class="invalid-feedback">
                Пожалуйста, выберите значение!
              </div>
            </div>

            <div v-if="currentModal.dataType == 'health-record'">
              <div class="mb-3">
                <label for="health-indicator" class="col-form-label">Показатель:</label>
                <select v-model="currentModal.hr.health_indicator" id="health-indicator" class="form-select" required>
                  <option v-for="indicator in health_indicators" v-text="indicator.data_type" v-bind:value="indicator"
                    v-bind:key="indicator.id">
                  </option>
                </select>
                <div class="invalid-feedback">
                  Пожалуйста, выберите значение!
                </div>
              </div>
              <div class="mb-3">
                <label for="hr_value" class="col-form-label">Значение:</label>
                <input type="number" class="form-control" id="hr_value" v-model="currentModal.hr.value" required
                  min="0" />
                <span v-if="currentModal.hr.health_indicator.unit" class="form-text"
                  v-text="currentModal.hr.health_indicator.unit"></span>
                <div class="invalid-feedback">
                  Введите число больше 0!
                </div>
              </div>
            </div>

            <div v-if="currentModal.dataType == 'event'">
              <div class="mb-3">
                <label for="event-name" class="col-form-label">Название:</label>
                <input type="text" class="form-control" id="event-name" v-model="currentModal.event.name" required>
                <div class="invalid-feedback">
                  Название не может быть пустым!
                </div>
              </div>
              <div class="mb-3">
                <label for="event-tag" class="col-form-label">Тег:</label>
                <select v-model="currentModal.event.tag" id="event-tag" class="form-select" required>
                  <option v-for="tag in hr_tags" v-text="tag.name" v-bind:value="tag" v-bind:key="tag.id">
                  </option>
                </select>
                <div class="invalid-feedback">
                  Пожалуйста, выберите значение!
                </div>
              </div>
              <div class="mb-3">
                <label for="event-description" class="col-form-label">Описание:</label>
                <textarea class="form-control" id="event-description" v-model="currentModal.event.description"
                  required></textarea>
                <div class="invalid-feedback">
                  Описание не может быть пустым!
                </div>
              </div>
            </div>

          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
          <button type="button" class="btn btn-danger" id="modal-delete" @click="handleDelete()">Удалить</button>
          <button type="button" class="btn btn-primary" id="modal-save" v-on:click="handleSave()">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multimonthPlugin from '@fullcalendar/multimonth'
import bootstrap from 'bootstrap/dist/js/bootstrap'
import erService from '../services/events_records.service'

var modal;

function eventToFCEvent(event) {
  var res = {
    obj: event,
    type: 'event',
    title: event.name,
    start: event.datetime,
    color: event.tag.color,
  }
  return res;
}
function hrToFCEvent(healthRecord) {
  console.log(healthRecord.health_indicator)
  var res = {
    obj: healthRecord,
    type: 'health-record',
    title: healthRecord.health_indicator.data_type,
    start: healthRecord.datetime,
    // indicator: healthRecord.health_indicator,
    color: 'red',
  }
  return res;
}

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [multimonthPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        locale: ruLocale,
        dayMaxEventRows: true,
        selectable: true,
        weekends: true,
        editable: true,
        navLinks: true,
        nowIndicator: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
      },
      hr_tags: [],
      health_indicators: [],
      currentModal: {
        dataType: '',
        isNewRecord: true,
        hr: { health_indicator: {} },
        event: {}
      },
      selectInfo: null, //Для связи с календарём. Определяется каждый раз по нажатию на дату/ивент в календаре
      clickInfo: null,
    }
  },
  methods: {
    //Выбор даты (открывает диалоговое окно на создание ивента)
    handleDateSelect(selectInfo) {
      this.currentModal.isNewRecord = true;
      modal.show();
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.selectInfo = selectInfo;
    },
    //Сохранение
    handleSave() {
      const form = document.getElementById('eventForm');
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return null;
      }

      let calendarApi = this.selectInfo.view.calendar;
      var obj = null;
      //Новый ивент
      if (this.currentModal.isNewRecord) {
        var color = '';
        var title = '';
        if (this.currentModal.dataType == "event") {
          obj = this.currentModal.event;
          color = this.currentModal.event.tag.color;
          title = this.currentModal.event.name;
        }
        if (this.currentModal.dataType == "health-record") {
          obj = this.currentModal.hr;
          color = 'red';
          title = this.currentModal.hr.health_indicator.data_type;
        }

        obj.datetime = this.selectInfo.start;
        this.save(obj).then((res) => {
          console.log(res);
          obj.id = res.data;
          calendarApi.addEvent({
            obj: obj,
            type: this.currentModal.dataType,

            title: title,
            start: this.selectInfo.startStr,
            end: this.selectInfo.endStr,
            allDay: this.selectInfo.allDay,
            color: color
          })
          modal.hide();
        });

      } else { //Редактируется существующий ивент
        var event = this.clickInfo.event;
        event.setExtendedProp('type', this.currentModal.dataType);

        if (this.currentModal.dataType == 'health-record') {
          event.setProp('title', this.currentModal.hr.health_indicator.data_type);
          event.setProp('color', 'red');
          obj = this.currentModal.hr
        }
        if (this.currentModal.dataType == 'event') {
          event.setProp('title', this.currentModal.event.name);
          event.setProp('color', this.currentModal.event.tag.color);
          obj = this.currentModal.event;
        }
        obj.datetime = this.clickInfo.start;
        this.save(obj).then((res) => {
          console.log(res)
          obj.id = res.data;
          event.setExtendedProp('obj', obj);
          modal.hide();
        });
      }
    },
    //По нажатию на ивент всплывает диалоговое окно для редактирования
    handleEventClick(clickInfo) {
      this.currentModal.isNewRecord = false;

      modal.show();
      const event = clickInfo.event.extendedProps;
      if (event.type == 'event') {
        this.currentModal.dataType = 'event';
        this.currentModal.event = event.obj;
      }
      if (event.type == 'health-record') {
        this.currentModal.dataType = 'health-record';
        this.currentModal.hr = event.obj;
      }
      this.clickInfo = clickInfo;
    },
    //Обрабатываем нажатие кнопки удаления
    handleDelete() {
      this.delete(this.clickInfo.event.extendedProps.obj).then(() => {
        this.clickInfo.event.remove();
        modal.hide();
      })
    },
    getHRTags() {
      return this.$store.getters.getDefaultData.tags;
    },
    getHealthIndicators() {
      return this.$store.getters.getDefaultData.health_indicators;
    },
    getEvents() {
      return this.$store.getters.getEvents;
    },
    getHealthRecords() {
      return this.$store.getters.getHealthRecords;
    },
    async save(obj) {
      if (this.currentModal.dataType == 'event') {
        return await this.saveEvent(obj);
      }
      if (this.currentModal.dataType == 'health-record') {
        return await this.saveHealthRecord(obj);
      }
    },
    async saveEvent(obj) {
      return await erService.saveEvent(obj);
    },
    async saveHealthRecord(obj) {
      return await erService.saveHealthRecord(obj);
    },
    async delete(obj) {
      if (this.currentModal.dataType == 'event') {
        await this.deleteEvent(obj);
      }
      if (this.currentModal.dataType == 'health-record') {
        await this.deleteHealthRecord(obj);
      }
    },
    async deleteEvent(obj) {
      await erService.deleteEvent(obj).then(data => {
        console.log(data);
      })
    },
    async deleteHealthRecord(obj) {
      await erService.deleteHealthRecord(obj).then(data => {
        console.log(data);
      })
    }
  },
  mounted: function () {
    this.hr_tags = this.getHRTags();
    this.health_indicators = this.getHealthIndicators();

    let calendarApi = this.$refs.fullCalendar.getApi();

    var events = [];
    var hrs = [];
    for (var item of this.getEvents()) {
      events.push(eventToFCEvent(item));
    }
    var hr = this.getHealthRecords()
    for (let i = 0; i < hr.length; i++) {
      hrs.push(hrToFCEvent(hr[i]));
    }
    calendarApi.addEventSource(events);
    calendarApi.addEventSource(hrs);
    //})

    var mt = document.querySelector('#recordModal');
    modal = bootstrap.Modal.getOrCreateInstance(mt);
    mt.addEventListener('hidden.bs.modal', () => {
      this.currentModal.hr = { health_indicator: {} };
      this.currentModal.event = {};
      this.clickInfo = null;
    })

  }
}

</script>
<style>
a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: black
}
</style>
