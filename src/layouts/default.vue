<template>
  <div id="app">
    <Header :page-scroll="$route.meta.pageScroll" />

    <Page>
      <slot />
    </Page>

    <Footer />
  </div>
</template>
