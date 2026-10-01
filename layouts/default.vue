<template>
  <div class="font-sans text-white antialiased selection:bg-flame-500 selection:text-white">
    <IntroLoader />
    <AmbientBackground />
    <ScrollProgress />
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-flame-500 focus:px-4 focus:py-2 focus:text-white">
      Skip to content
    </a>
    <SiteHeader />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
