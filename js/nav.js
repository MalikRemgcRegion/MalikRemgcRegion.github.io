$("#myNavbar").append(
	`<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<a href="https://malikremgcregion.github.io/" class="navbar-brand">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
  </svg>
</a>
<div class="collapse navbar-collapse" id="mainNav">
  <ul class="navbar-nav ml-auto nav-fill">
    <li class="nav-item px-4 dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </a>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="servicesDropdown">
        <div class="d-md-flex align-items-start justify-content-start">
          <div>
            <div class="dropdown-header">gamescollectors</div>
            <a class="dropdown-item" href="./gc_ladder.html">GC Ladder</a>
            <!--<a class="dropdown-item" href="">Shame Ladder</a><a class="dropdown-item" href="">Suspects Ladder</a><a class="dropdown-item" href="">GC Restricted Ladder</a>-->
          </div>
          <div>
            <div class="dropdown-header">RemGC</div>
            <a class="dropdown-item" href="./ladder.html">RRGC Ladder</a>
            <a class="dropdown-item" href="./shame.html">Shame Ladder</a>
            <a class="dropdown-item" href="./suspects.html">Suspects Ladder</a>
            <a class="dropdown-item" href="./restricted.html">RRGC Restricted Ladder</a>
          </div>
          <div>
            <div class="dropdown-header">RemGCN</div>
            <a class="dropdown-item" href="./remgcn_ladder.html">RemGCN Ladder</a>
            <!--<a class="dropdown-item" href="">Shame Ladder</a><a class="dropdown-item" href="">Suspects Ladder</a><a class="dropdown-item" href="">GC Restricted Ladder</a>-->
          </div>
          <div>
            <div class="dropdown-header">club7000</div>
            <a class="dropdown-item" href="./c7k_ladder.html">C7K Ladder</a>
            <!--<a class="dropdown-item" href="">Shame Ladder</a><a class="dropdown-item" href="">Suspects Ladder</a><a class="dropdown-item" href="">GC Restricted Ladder</a>-->
          </div>
        </div>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="https://github.com/MalikRemgcRegion/MalikRemgcRegion.github.io">Github</a>
        <a class="dropdown-item" href="https://discord.gg/4X96kRjety">Discord</a>
        <a class="dropdown-item" href="https://github.com/MalikRemgcRegion/MalikRemgcRegion.github.io/raw/main/rrgc.user.js">RRGC Userscript</a>
        <a class="dropdown-item" href="./about.html">About</a>
      </div>
    </li>
  </ul>
</div>`
);
