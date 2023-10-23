const navbar = {
    template: `
        <div id="nav">
            <div class="very-top-nav">
                <div class="search-bar">
                    <img class="search-icon" src="img/icon/search.png" alt="search-icon">
                    <input class="search-field" type="search" placeholder="Search for Recipe...">
                </div>
                <button type="button" class="decide-btn" @click="showHideModal">Can't decide?</button>
                <img src="img/icon/profile.png" class="profile" />
            </div>
            <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
            <div class="nav-main">
                <a href="home.html">Home</a>
                <a href="allRecipe.html">Browse Recipe</a>
                <a href="grocer.html">Nearby Grocers</a>
                <a href="submit.html">Submit Recipe</a>
                <a href="favourites.html">Favourites</a>
            </div>
        </div>
    `,
};
