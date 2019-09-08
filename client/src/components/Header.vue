<template>
  <header class="header">
    <div class="container">
      <a href="/" class="grid-4">
        <img src="../assets/potato-svgrepo-com.svg" alt="OPTV" />
      </a>
      <nav class="grid-12 header-menu">
        <ul>
          <li>
            <router-link to="/Item">Item</router-link>
          </li>
          <li>
            <router-link to="/Tag">Tag</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

img {
  width: 5em;
  height: 5em;
}

a {
  float: left;
}

.header {
  position: fixed;
  top: 0;
  width: 100%;
  background: beige;
  z-index: 10;
}

.header-menu {
  text-align: right;
}

.header-menu ul li {
  display: inline-block;
  margin-top: 15px;
  margin-left: 20px;
}

.header-menu ul li a {
  cursor: pointer;
  color: #000000;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 0;
}

.header-menu ul li a:hover {
  color: #d4af37;
}
</style>