const navbar = {
    template: `
        <div id="nav">
            <div class="very-top-nav">
                <div class="search-bar">
                    <img class="search-icon" src="img/search.png" alt="search-icon">
                    <input class="search-field" type="search" placeholder="Search for Recipe...">
                </div>
                <button type="button" class="decide-btn">Can't decide?</button>
                <img src="img/profile.png" class="profile" />
            </div>
            <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
            <div class="nav-main">
                <a href="home.html">Home</a>
                <a href="allRecipe.html">Browse Recipe</a>
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
                <a href="/">Nearby Grocers</a>
                <a href="/">Submit Recipe</a>
            </div>
        </div>
    `,
};
  