<template>
    <form @submit.prevent="addstudent">
      <h2 class="label-wrapper">
        <label for="new-todo-input" class="label__lg">
            Add student
        </label>
      </h2>
        <input
            v-model="newstudentcontent"
            type="text"
            id="student"
            name="add-student"
            placeholder="Add student"
            autocomplete="off"
            class="student-style"
        />
      <button 
        :disabled="!newstudentcontent"
        type="submit" 
        class="btn btn__primary btn__lg">
        Add
      </button>
      <div v-for="student in students" v-bind:key="student.id">
        <div class="student-content">
            {{ student.content }}
        </div>
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button 
                    @click="toggleattendance(student.id)"
                    type="button" 
                    :class= "student.attendance ? 'btn btn-success' : 'btn btn-outline-secondary'"
                    >Attendance
                </button>
                <button 
                    @click="deletestudent(student.id)"
                    type="button" 
                    class="btn btn-danger"
                    >Delete
                </button>
        </div>
    </div>
    <!-- <ImageBarcodeReader @decode="onDecode" @loaded="onLoaded"></ImageBarcodeReader> -->
   
    
    </form>

    <div>
      <ImageBarcodeReader @decode="onDecode"></ImageBarcodeReader>
      <h2>The decoded value in QR/barcode is</h2>
      <p>{{ decodedText }}</p>
    </div>

  </template>



<script setup>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, doc, deleteDoc, query, orderBy} from 'firebase/firestore'
import { db } from  '@/firebase'
import { ImageBarcodeReader } from 'vue-barcode-reader'


const decodedText = ref('');

// function onDecode (result){
//   console.log (result)
// }

const onDecode = (text) => {
  decodedText.value = text;
  console.log(decodedText)
};

// const onError = () => {
//   console.log("loaded");
// };



const studentref = collection(db, 'Student')

const studentarr = query(studentref, orderBy('date', 'desc'))

const students = ref ([
    // {
    // id:'id1',
    // content: 'Ga-ap student'
    // },
    // { 
    // id:'id2',
    // content: 'event'
    // }
])

onMounted(() => {

      onSnapshot(studentarr, (querySnapshot) => {
        const getstudent = [];
        querySnapshot.forEach((doc) => {
        const student = {
          id: doc.id,
          content: doc.data().studentname,
          attendance: doc.data().attendance
        }
        getstudent.push(student)
      })
      students.value = getstudent
    })
})


const newstudentcontent = ref ('')

const addstudent = () => {
    // const newstudents = {
    //     id: uuidv4(),
    //     content: newstudentcontent.value
    // }
    // students.value.unshift(newstudents)
  addDoc(studentref, {
    studentname: newstudentcontent.value,
    attendance: false,
    date: Date.now()
  })
    newstudentcontent.value = ''
}

const deletestudent = id => {
    // students.value = students.value.filter(student => student.id !==id)
    deleteDoc(doc(studentref, id))
}

const toggleattendance = id => {
    const index = students.value.findIndex(student => student.id === id)
    console.log('index' , index)
    students.value[index].attendance = !students.value[index].attendance
    console.log ('toggleattendance', id)
}



</script>

<style>

</style>