<template>
    <form @submit.prevent="addevent">
      <h2 class="label-wrapper">
        <label for="new-todo-input" class="label__lg">
            Add Event
        </label>
      </h2>
        <input
            v-model="neweventcontent"
            type="text"
            id="event"
            name="add-event"
            placeholder="Add event"
            autocomplete="off"
            class="event-style"
        />
      <button 
        :disabled="!neweventcontent"
        type="submit" 
        class="btn btn__primary btn__lg">
        
        Add
      </button>
      <div v-for="event in events" v-bind:key="event.id">
        <div class="event-content">
            {{ event.content }}
        </div>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button 
                    @click="deleteEvent(event.id)"
                    type="button" 
                    class="btn btn-danger"
                    >Delete
                </button>
        </div>
    </div>
    </form>
  </template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy} from 'firebase/firestore'
import { db } from  '@/firebase'

const eventref = collection(db, 'Event')

const eventarr = query(eventref, orderBy('date', 'desc'))

const events = ref ([
    // {
    // id:'id1',
    // content: 'Ga-ap Event'
    // },
    // { 
    // id:'id2',
    // content: 'vent'
    // }
])

onMounted(() => {
    // const querySnapshot = await getDocs(collection(db, 'Event'))
    // let getevent = []
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    //   const event = {
    //     id: doc.id,
    //     content: doc.data().eventname
    //   }
    //   getevent.push(event)
    //   events.value = getevent

      onSnapshot(eventarr, (querySnapshot) => {
        const getevent = [];
        querySnapshot.forEach((doc) => {
        const event = {
          id: doc.id,
          content: doc.data().eventname
        }
        getevent.push(event)
      })
      events.value = getevent
    })

})

const neweventcontent = ref ('')

const addevent = () => {
    // const newevents = {
    //     id: uuidv4(),
    //     content: neweventcontent.value
    // }
    // events.value.unshift(newevents)
  addDoc(eventref, {
    eventname: neweventcontent.value,
    date: Date.now()
  })
    neweventcontent.value = ''
}

const deleteEvent = id => {
    // events.value = events.value.filter(event => event.id !==id)
    deleteDoc(doc(eventref, id))
}



</script>

<style>

</style>