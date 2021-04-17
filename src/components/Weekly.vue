<template>

<div class="container mt-3 mb-3 table-responsive">
  <center><h1>Haftalık Namaz Vakitleri</h1></center>
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
    <router-link to="/" class="btn btn-outline-success mb-2">Anasayfa</router-link>
  </center>
  <div class="fixed-bottom"><center>Furkan Meclis &copy; 2021</center></div>
</div>

</template>

<script>
import axios from "axios";
export default {
  name: 'Weekly',
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
          .then(response => (this.posts = response.data))
          .catch(error => {
            this.errors.push(error);
          });
    }
  }
}
</script>

