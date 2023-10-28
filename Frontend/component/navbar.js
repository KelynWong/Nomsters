const navbar = {
    data() {
        return {
            searchQuery: ""
        }
    },
    emits: ['search'],
    template: `
        <div id="nav">
            <div class="very-top-nav">
            <div class="search-bar">
                    <img class="search-icon" src="img/icon/search.png" alt="search-icon">
                    <input v-model="searchQuery" class="search-field" type="search" placeholder="Search for Recipe..." @keyup.enter="this.$emit('search', searchQuery)">
                    </div>
                    <button type="button" class="decide-btn" @click="showHideModal">Can't decide?</button>
                    <a href="./profile.html"><img src="img/icon/profile.png" class="profile" /></a>
                    <button type="button" class="decide-btn" @click="logout">Log out</button>
            </div>
            <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
            <div class="nav-main">
                <a href="./home.html">Home</a>
                <a href="./allRecipe.html">Browse Recipe</a>
                <a href="./grocer.html">Nearby Grocers</a>
                <a href="./submit.html">Submit Recipe</a>
                <a href="./mealprep.html">Meal Prep</a>
                <a href="./favourites.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                        <g clip-path="url(#clip0_278_1363)">
                            <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                        </g>
                    </svg>
                </a>
            </div>
        </div>
    `,
    methods: {
        logout(){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            window.location.href='./index.html';
        }
    }
};
