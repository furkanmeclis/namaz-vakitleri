<template>

  <div class="container mt-3 mb-3">
   <div >
     <center><h1>Günlük Namaz Vakitleri</h1></center>
     <div v-if="errors && errors.length" class="alert alert-danger">
       Günlük Sorgu Limitine Ulaştınız
     </div>
     <ul v-else  class="list-group text-center" v-for="post in posts.slice(0,1)" :key="post.MiladiTarihKisa">
       <li class="list-group-item list-group-item-warning">Tarih <b>{{ post.MiladiTarihUzun }} </b></li>
       <li class="list-group-item">İmsak : <b>{{ post.Imsak }}</b></li>
       <li class="list-group-item">Güneş : <b>{{ post.Gunes }}</b></li>
       <li class="list-group-item">Öğle : <b>{{ post.Ogle }}</b></li>
       <li class="list-group-item">İkindi : <b>{{ post.Ikindi }}</b></li>
       <li class="list-group-item">Akşam : <b>{{ post.Aksam }}</b></li>
       <li class="list-group-item">Yatsı : <b>{{ post.Yatsi }}</b></li>

       <li class="list-group-item">Ayın Şekli <img :src="post.AyinSekliURL" width="25" height="25" :alt="post.MiladiTarihUzun"></li>
       <li class="list-group-item">{{ ilce }} / {{ sehir }} / {{ ulke }}</li>
     </ul>
     <center><p class="p-1">Aylık Namaz Vakitleri İçin <router-link to="/aylik" class="btn btn-warning btn-sm">Tıkla</router-link></p>
     </center>

     <div class="fixed-bottom"  style="background-color: white;width: 100%"><center>Furkan Meclis &copy; 2021 </center></div>
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
      ilce:this.$cookies.get("Ilce"),
      sehir:this.$cookies.get("Sehir"),
      ulke:this.$cookies.get("Ulke"),
      errors: []

    };
  },
  methods: {

    getPosts() {
      let id = this.$cookies.get("IlceID") || 9146;
      axios.get("https://ezanvakti.herokuapp.com/vakitler/"+id).then(response => ( this.posts = response.data)).catch(error => {
            this.errors.push(error);
          });
    }
  }
}
</script>

