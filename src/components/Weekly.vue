<template>

<div class="container mt-3 mb-3 table-responsive">
  <center><h1>Haftalık Namaz Vakitleri</h1></center>
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
    <table class="table table-striped table-hover table-bordered">

      <thead>
      <tr class="table-warning">
        <th scope="col">Tarih</th>
        <th scope="col">İmsak</th>
        <th scope="col">Güneş</th>
        <th scope="col">Öğle</th>
        <th scope="col">İkindi</th>
        <th scope="col">Akşam</th>
        <th scope="col">Yatsı</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="post of posts.slice(0,7)" :key="post.MiladiTarihKisa">
        <td> <img :src="post.AyinSekliURL" width="20" height="20" :alt="post.MiladiTarihUzun"> | {{ post.MiladiTarihUzun }}</td>
        <td>{{ post.Imsak }}</td>
        <td>{{ post.Gunes }}</td>
        <td>{{ post.Ogle }}</td>
        <td>{{ post.Ikindi }}</td>
        <td>{{ post.Aksam }}</td>
        <td>{{ post.Yatsi }}</td>


      </tr>

      </tbody>

    </table>
  <center>

    <router-link to="/" class="btn btn-outline-success mb-3">Anasayfa</router-link>
  </center>
  <div class="fixed-bottom" style="background-color: white;width: 100%"><center>Furkan Meclis &copy; 2021</center></div>
</div>

</template>

<script>
import axios from "axios";
export default {
  name: 'Weekly',
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

