---
title: 'OpenHW Group Downloads'
date: 2018-11-28T15:14:39+10:00
---
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>


<div id="vapp">

<div class="table-responsive" v-for="m in messages">

# [[ m.title ]]

<table class="table-sm table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Last Modified</th>
      <th scope="col">Size</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="k in m.downloads">
      <td><a :href="[[ base + m.id + '/' + k.Key ]]">[[ k.Key ]]</a></td>
      <td>[[ k.LastModified ]]</td>
      <td>[[ k.Size ]]</td>
    </tr>
  </tbody>
</table>
</div>
</div>

<script type="text/javascript" src="bundle.js"></script>
