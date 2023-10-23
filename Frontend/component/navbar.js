const navbar = {
    template: `
        <div id="nav">
            <div class="very-top-nav">
                <div class="search-bar">
                    <img class="search-icon" src="img/icon/search.png" alt="search-icon">
                    <input class="search-field" type="search" placeholder="Search for Recipe...">
                </div>
                <button type="button" class="decide-btn">Can't decide?</button>
                <img src="img/icon/profile.png" class="profile" />
            </div>
            <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
            <div class="nav-main">
                <a href="./home.html">Home</a>
                <a href="./allRecipe.html">Browse Recipe</a>
                <!-- <div class="dropdown">
                    <p>Browse Recipe</p>
                    <div class="dropdown-content">
                        <ul>
                            <li><a href="/home">lorem ipsum</a></li>
                            <li><a href="/home">lorem ipsum</a></li>
                            <li><a href="/home">lorem ipsum</a></li>
                        </ul>
                    </div>
                </div> -->
                <a href="./grocer.html">Nearby Grocers</a>
                <a href="./submit.html">Submit Recipe</a>
                <a href="./favourites.html">Favourites
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                        <path d="M2.46085 2.18753C0.173202 4.47518 0.173212 8.18417 2.46085 10.4718L10.0548 18.0657C10.436 18.447 11.0542 18.447 11.4355 18.0657L19.0294 10.4718C21.317 8.18415 21.317 4.47517 19.0294 2.18753C16.7418 -0.100103 13.0328 -0.100114 10.7451 2.18753C8.45748 -0.100103 4.74849 -0.100114 2.46085 2.18753Z" fill="#DE352A"/>
                    </svg> -->
                </a>
            </div>
        </div>
    `,
};
  