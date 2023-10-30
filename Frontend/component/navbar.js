const navbar = {
    data() {
        return {
            searchQuery: "",
            profileImage: "img/icon/profile.png",
            isChanged: true
        }
    },
    emits: ['search'],
    template: `
        <div id="nav" class="d-none d-lg-block">
            <div class="very-top-nav">
                <!-- <div class="very-top-nav-flex"> -->
                    <div class="search-bar">
                        <img class="search-icon" src="img/icon/search.png" alt="search-icon">
                        <input v-model="searchQuery" class="search-field" type="search" placeholder="Search for Recipe..." @keyup.enter="this.$emit('search', searchQuery)">
                    </div>
                    <button type="button" class="decide-btn" @click="showHideModal">Can't decide?</button>
                <!-- </div>
                <div class="very-top-nav-flex"> -->
                    <div class="dropdown">
                        <img :src=profileImage class="profile" />
                        <div class="dropdown-content">
                            <a :class="{active:active === 'profile'}" class="nav-link" href="./profile.html">View Profile</a>
                            <a class="nav-link"  @click="logout">Log out</a>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
                <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
                <div class="nav-main">
                    <a :class="{ active: active === 'home' }" class="nav-link" href="./home.html">Home</a>
                    <a :class="{active:active === 'allRecipe'}" class="nav-link" href="./allRecipe.html">Browse Recipe</a>
                    <a :class="{active:active === 'grocer'}" class="nav-link" href="./grocer.html">Nearby Grocers</a>
                    <a :class="{active:active === 'submit'}" class="nav-link" href="./submit.html">Submit Recipe</a>
                    <a :class="{active:active === 'mealprep'}" class="nav-link" href="./mealprep.html">Meal Prep</a>
                    <a class="nav-link" href="./favourites.html">
                        <svg v-if="active === 'favourites'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                            <g clip-path="url(#clip0_278_1363)">
                                <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                            </g>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                            <g clip-path="url(#clip0_278_1357)">
                                <path d="M22.0003 4C19.6803 4 17.4537 5.08 16.0003 6.78667C14.547 5.08 12.3203 4 10.0003 4C5.89366 4 2.66699 7.22667 2.66699 11.3333C2.66699 16.3733 7.20033 20.48 14.067 26.72L16.0003 28.4667L17.9337 26.7067C24.8003 20.48 29.3337 16.3733 29.3337 11.3333C29.3337 7.22667 26.107 4 22.0003 4ZM16.1337 24.7333L16.0003 24.8667L15.867 24.7333C9.52033 18.9867 5.33366 15.1867 5.33366 11.3333C5.33366 8.66667 7.33366 6.66667 10.0003 6.66667C12.0537 6.66667 14.0537 7.98667 14.7603 9.81333H17.2537C17.947 7.98667 19.947 6.66667 22.0003 6.66667C24.667 6.66667 26.667 8.66667 26.667 11.3333C26.667 15.1867 22.4803 18.9867 16.1337 24.7333Z" fill="#DE352A"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_278_1357">
                                <rect width="32" height="32" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
        </div> 

        <nav class="navbar navbar-expand-lg bg-light d-lg-none">
            <div class="container-fluid" style="padding-right: 21px;">
                <a href="home.html"><img src="img/logo.png" alt="logo" class="logo" /></a>
                <div class="menu-bar" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                </div>
                <div class="collapse navbar-collapse" id="navbarToggler">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        <li class="nav-item">
                            <a :class="{ active: active === 'home' }" class="nav-link" aria-current="page" href="./home.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a :class="{ active: active === 'allRecipe' }" class="nav-link" href="./allRecipe.html">Browse Recipe</a>
                        </li>
                        <li class="nav-item">
                            <a :class="{ active: active === 'grocer' }" class="nav-link" href="./grocer.html">Nearby Grocers</a>
                        </li>
                        <li class="nav-item">
                            <a :class="{ active: active === 'submit' }" class="nav-link" href="./submit.html">Submit Recipe</a>
                        </li>
                        <li class="nav-item">
                            <a :class="{ active: active === 'mealprep' }" class="nav-link" href="./mealprep.html">Meal Prep</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="./favourites.html">
                                <svg v-if="active === 'favourites'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                    <g clip-path="url(#clip0_278_1363)">
                                        <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                                    </g>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                                    <g clip-path="url(#clip0_278_1357)">
                                        <path d="M22.0003 4C19.6803 4 17.4537 5.08 16.0003 6.78667C14.547 5.08 12.3203 4 10.0003 4C5.89366 4 2.66699 7.22667 2.66699 11.3333C2.66699 16.3733 7.20033 20.48 14.067 26.72L16.0003 28.4667L17.9337 26.7067C24.8003 20.48 29.3337 16.3733 29.3337 11.3333C29.3337 7.22667 26.107 4 22.0003 4ZM16.1337 24.7333L16.0003 24.8667L15.867 24.7333C9.52033 18.9867 5.33366 15.1867 5.33366 11.3333C5.33366 8.66667 7.33366 6.66667 10.0003 6.66667C12.0537 6.66667 14.0537 7.98667 14.7603 9.81333H17.2537C17.947 7.98667 19.947 6.66667 22.0003 6.66667C24.667 6.66667 26.667 8.66667 26.667 11.3333C26.667 15.1867 22.4803 18.9867 16.1337 24.7333Z" fill="#DE352A"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_278_1357">
                                        <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </a>
                        </li>

                        <div class="d-flex align-items-center">
                            <button type="button" class="decide-btn" @click="showHideModal">Can't decide?</button>
                        </div>
                        
                        <div class="d-flex">
                            <a href="./profile.html"><img :src=profileImage class="profile" /></a>
                            <button type="button" class="decide-btn" @click="logout">Log out</button>
                        </div>
                        
                        <div class="w-75 search-bar">
                            <img class="search-icon" src="img/icon/search.png" alt="search-icon">
                            <input v-model="searchQuery" class="search-field" type="search" placeholder="Search for Recipe..." @keyup.enter="this.$emit('search', searchQuery)">
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    `,
    methods: {
        logout(){
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            window.location.href='./index.html';
        }
    }
};
