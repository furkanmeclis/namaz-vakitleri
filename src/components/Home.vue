<template>

  <div class="container mt-3 mb-3">
   <div >
     <center><h1>Günlük Namaz Vakitleri</h1></center>
     <div class="form-group border border-info p-2 rounded border-2 mb-3">
       <form onsubmit="return false">
         <label for="" class="form-label">Ülke Seçin</label>
         <select class="form-control" @change="ulke($event)">
           <option  selected disabled hidden value="">Ülke Seçiniz</option>
           <option v-for="sehir in ulkeler" :key="sehir.UlkeID" :value="sehir.UlkeID">{{sehir.UlkeAdi}}</option>
         </select>
         <label for="" class="form-label">Şehir Seçin</label>
         <select class="form-control" @change="il($event)">
           <option  selected disabled hidden value="">Şehir Seçiniz</option>
           <option v-for="sehir in sehirler" :key="sehir.SehirID" :value="sehir.SehirID">{{sehir.SehirAdi}}</option>
         </select>
         <label for="" class="form-label">İlçe Seçin</label>
         <select class="form-control" v-if="ilceler" @change="ilce($event)">
           <option  selected disabled hidden value="">İlçe Seçiniz</option>
           <option v-for="ilce in ilceler" :key="ilce.IlceID" :value="ilce.IlceID">{{ilce.IlceAdi}}</option>
         </select><br>

         <button type="reset" class="btn btn-danger">Sıfırla</button>
       </form>
     </div>
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

    this.getUlke();
    this.getPosts();
  },
  data() {
    return {
      posts: [],
      sehirler:[],
      ilceler:[],
      ulkeler:[],
      errors: []
    };
  },
  methods: {
    il(event){
      this.getIlce(event.target.value)
    },
    ulke(event){
      this.getSehir(event.target.value)

    },
    ilce(event){
      this.getPosts(event.target.value)
    },
    getIlce(id){
      axios.get("https://ezanvakti.herokuapp.com/ilceler/"+id).then(response => ( this.ilceler = response.data)).catch(error => {
        this.errors.push(error);
      });
    },
    getPosts(id=9146) {

      axios.get("https://ezanvakti.herokuapp.com/vakitler/"+id).then(response => ( this.posts = response.data)).catch(error => {
            this.errors.push(error);
          });
    },
    getUlke() {
      axios.get("https://ezanvakti.herokuapp.com/ulkeler/").then(response => ( this.ulkeler = response.data)).catch(error => {
        this.errors.push(error);
      });
    },
    getSehir(id) {
      axios.get("https://ezanvakti.herokuapp.com/sehirler/"+id).then(response => ( this.sehirler = response.data)).catch(error => {
        this.errors.push(error);
      });
    }
  }
}
</script>

