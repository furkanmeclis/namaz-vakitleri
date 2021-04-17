<template>

  <div class="container mt-3 mb-3">
   <div >
     <center><h1>Günlük Namaz Vakitleri</h1></center>
     <ul  class="list-group text-center" v-for="post in posts.slice(0,1)" :key="post.MiladiTarihKisa">
       <li class="list-group-item list-group-item-warning">Tarih <b>{{ post.MiladiTarihUzun }} </b></li>
       <li class="list-group-item">İmsak : <b>{{ post.Imsak }}</b></li>
       <li class="list-group-item">Güneş : <b>{{ post.Gunes }}</b></li>
       <li class="list-group-item">Öğle : <b>{{ post.Ogle }}</b></li>
       <li class="list-group-item">İkindi : <b>{{ post.Ikindi }}</b></li>
       <li class="list-group-item">Akşam : <b>{{ post.Aksam }}</b></li>
       <li class="list-group-item">Yatsı : <b>{{ post.Yatsi }}</b></li>
       <li class="list-group-item">Ayın Şekli <img :src="post.AyinSekliURL" width="25" height="25" :alt="post.MiladiTarihUzun"></li>

     </ul>
     <center><p class="p-1">Haftalık Namaz Vakitleri İçin <router-link to="/haftalik" class="btn btn-warning btn-sm">Tıkla</router-link></p>
     </center>
     <div class="fixed-bottom"><center>Furkan Meclis &copy; 2021</center></div>
   </div>

  </div>

</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  created() {
    this.getPosts();
  },
  data() {
    return {
      posts: [],

      errors: []
    };
  },
  methods: {
    getPosts() {
      axios
          .get("https://ezanvakti.herokuapp.com/vakitler/9146")
          .then(response => (
              this.posts = response.data

            ))
          .catch(error => {
            this.errors.push(error);
          });
    }
  }
}
</script>

