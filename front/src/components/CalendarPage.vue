<template>
  <FullCalendar class='demo-app-calendar' :options="calendarOptions" />

  <!-- Modal -->
  <div class="modal fade" id="recordModal" tabindex="-1" aria-labelledby="recordModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="recordModal">Редактировние записи</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form>
            <div class="mb-3">
              <label for="data-type" class="col-form-label">Вид записи:</label>
              <select v-model="currentModal.dataType" id="data-type" class="form-select">
                <option value="health-record">Состояние здоровья</option>
                <option value="event">Событие/напоминание</option>
              </select>
            </div>

            <div v-if="currentModal.dataType == 'health-record'">
              <div class="mb-3">
                <label for="health-indicator" class="col-form-label">Показатель:</label>
                <select v-model="currentModal.hr.indicator" id="health-indicator" class="form-select">
                  <option v-for="indicator in health_indicators" v-text="indicator.data_type" v-bind:value="indicator"
                    v-bind:key="indicator.id">
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="hr_value" class="col-form-label">Значение:</label>
                <input type="text" class="form-control" id="hr_value" v-model="currentModal.hr.value" />
                <span v-if="currentModal.hr.indicator.unit" class="form-text"
                  v-text="currentModal.hr.indicator.unit"></span>
              </div>
            </div>

            <div v-if="currentModal.dataType == 'event'">
              <div class="mb-3">
                <label for="event-name" class="col-form-label">Название:</label>
                <input type="text" class="form-control" id="event-name" v-model="currentModal.event.name">
              </div>
              <div class="mb-3">
                <label for="event-tag" class="col-form-label">Тег:</label>
                <select v-model="currentModal.event.tag" id="event-tag" class="form-select">
                  <option v-for="tag in hr_tags" v-text="tag.name" v-bind:value="tag" v-bind:key="tag.id">
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="event-description" class="col-form-label">Описание:</label>
                <textarea class="form-control" id="event-description" v-model="currentModal.event.description"></textarea>
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

var modal;

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
        // eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
                eventAdd:
                eventChange:
                eventRemove:
                */
      },
      hr_tags: [],
      health_indicators: [],
      currentModal: {
        dataType: '',
        isNewRecord: true,
        hr: { indicator: {} },
        event: {}
      },
      selectInfo: null, //Для связи с календарём. Определяется каждый раз по нажатию на дату/ивент в календаре
      clickInfo: null,
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      modal.show();
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.selectInfo = selectInfo;
    },
    handleSave() {
      let calendarApi = this.selectInfo.view.calendar;
      //Новый ивент
      if (!this.clickInfo) {
        if (this.currentModal.dataType == "event") {
          calendarApi.addEvent({
            obj: this.currentModal.event,
            type: 'event',

            title: this.currentModal.event.name,
            start: this.selectInfo.startStr,
            end: this.selectInfo.endStr,
            allDay: this.selectInfo.allDay,
            color: this.currentModal.event.tag.color
          })
        }
        if (this.currentModal.dataType == "health-record") {
          calendarApi.addEvent({
            obj: this.currentModal.hr,
            type: 'health-record',

            title: this.currentModal.hr.indicator.data_type,
            start: this.selectInfo.startStr,
            end: this.selectInfo.endStr,
            allDay: this.selectInfo.allDay,
            color: 'red'
          })
        }
      } else { //Редактируется существующий ивент
        var event = this.clickInfo.event;

        event.setExtendedProp('type', this.currentModal.dataType);
        if (this.currentModal.dataType == 'health-record') {
          event.setExtendedProp('obj', this.currentModal.hr);
          event.setProp('title', this.currentModal.hr.indicator.data_type);
          event.setProp('color', 'red');

        }
        if (this.currentModal.dataType == 'event') {
          event.setExtendedProp('obj', this.currentModal.event);
          event.setProp('title', this.currentModal.event.name);
          event.setProp('color', this.currentModal.event.tag.color);
        }

      }
      modal.hide();
    },
    handleEventClick(clickInfo) {
      modal.show();
      const event = clickInfo.event.extendedProps;
      console.log(event)
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
    handleDelete() {
      this.clickInfo.event.remove();
      modal.hide();
    },
    getHRTags() {
      return this.$store.getters.getDefaultData.tags;
    },
    getHealthIndicators() {
      return this.$store.getters.getDefaultData.health_indicators;
    }
  },
  mounted: function () {
    this.hr_tags = this.getHRTags();
    this.health_indicators = this.getHealthIndicators();

    var mt = document.querySelector('#recordModal');
    modal = bootstrap.Modal.getOrCreateInstance(mt);
    mt.addEventListener('hidden.bs.modal', (/*event*/) => {
      this.currentModal.hr = { indicator: {} };
      this.currentModal.event = {};
      this.clickInfo = null;
    })

  }
}

</script>
