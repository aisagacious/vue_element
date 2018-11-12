<template>
    <div class="calendar">
        <full-calendar :events="fcEvents"
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick">
            <!-- <template slot="fc-event-card" scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
        </template> -->
        </full-calendar>
    </div>
</template>

<script>
import fullCalendar from 'vue-fullcalendar'
export default {
    components: {fullCalendar},
    data() {
        let demoEvents = [
            {
            title    : 'Sunny 725-727',
            start    : '2017-02-25',
            end      : '2017-02-27',
            cssClass : 'family'
            },
            {
            title : 'Lunfel 726-727',
            start : '2017-02-26',
            end : '2017-02-27',
            cssClass : ['home', 'work']
            },
            {
            title : 'Lunfel 2/27-2/28',
            start : '2017-02-27',
            end : '2017-02-28'
            },
            {
                title : 'Lunfel 2/27-2/28',
                start : '2017-02-27',
                end : '2017-02-28'
            },
            {
                title : 'Lunfel 2/27-2/28',
                start : '2017-02-27',
                end : '2017-02-28'
            },
            {
                title : 'Lunfel 2/26-3/05',
                start : '2017-02-26',
                end : '2017-03-05'
            },
            {
                title : 'Lunfel 1/27-1/28',
                start : '2017-01-27',
                end : '2017-01-28'
            },
            {
                title : 'Lunfel 1/27-2/2',
                start : '2017-01-27',
                end : '2017-02-02'
            },
            {
                title : 'Lunfel 3/27-3/28',
                start : '2017-03-27',
                end : '2017-03-28'
            }
        ];
        return {
            fcEvents : demoEvents,
            // zh : {
            //     weekNames : ['周一','周二','周三','周四','周五','周六','周日'],
            //     monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','11月','12月'],
            //     titleFormat : 'yyyy年MM月'
            // }
        }
    },
    methods: {
        changeMonth (start, end, current) {
            // console.log('changeMonth', start.format(), end.format(), current.format())
        },
        eventClick (event, jsEvent, pos) {
            console.log('eventClick', event, jsEvent, pos)
        },
        dayClick (day, jsEvent) {
            console.log('dayClick', day, jsEvent)
        },
        moreClick (day, events, jsEvent) {
            console.log('moreCLick', day, events, jsEvent)
        }
    }
}
</script>

<style>
</style>
