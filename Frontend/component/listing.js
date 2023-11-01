const listing = {
    template: `
        <a :href="'recipeDetail.html?id=' + r.recipeId" class="col-sm-6 col-xl-4 container-listing" v-for="r in recipeData" >
            <!-- <div class="recipe-img" :style="{ backgroundImage: 'url(' + (r.image ? r.image : r.image2) + ')' }"> -->
            <div class="recipe-img">
                <img :src="(r.image ? r.image : r.image2)" class="img-fluid" />
                <!-- favourited -->
                <svg v-if="r.fav == 1" @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <g clip-path="url(#clip0_278_1363)">
                    <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_278_1363">
                    <rect width="32" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

                <!-- not favourited -->
                <svg v-else @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <g clip-path="url(#clip0_278_1357)">
                        <path d="M22.0003 4C19.6803 4 17.4537 5.08 16.0003 6.78667C14.547 5.08 12.3203 4 10.0003 4C5.89366 4 2.66699 7.22667 2.66699 11.3333C2.66699 16.3733 7.20033 20.48 14.067 26.72L16.0003 28.4667L17.9337 26.7067C24.8003 20.48 29.3337 16.3733 29.3337 11.3333C29.3337 7.22667 26.107 4 22.0003 4ZM16.1337 24.7333L16.0003 24.8667L15.867 24.7333C9.52033 18.9867 5.33366 15.1867 5.33366 11.3333C5.33366 8.66667 7.33366 6.66667 10.0003 6.66667C12.0537 6.66667 14.0537 7.98667 14.7603 9.81333H17.2537C17.947 7.98667 19.947 6.66667 22.0003 6.66667C24.667 6.66667 26.667 8.66667 26.667 11.3333C26.667 15.1867 22.4803 18.9867 16.1337 24.7333Z" fill="#DE352A"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_278_1357">
                        <rect width="32" height="32" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
            <div class="listing-subdesc">
                <div class="subdesc">
                    <img src="../img/prepTime.png" width="22" />
                    <span class="p-14">{{(r.readyInMinutes===-1 ? "Unknown" : r.readyInMinutes)}} Minutes</span>
                </div>
                <div class="subdesc">
                    <img src="../img/serving.png" width="24" />
                    <!-- <span class="p-14">{{ r.dishtypes && r.dishtypes.length > 0 ? r.dishtypes[0] : 'Snack' }}</span> -->
                    <span class="p-14">{{ r.servings }} People</span>
                </div>
                </div>
                <h6>{{r.title}} {{ r.ind }}</h6>
            
        </a>
    `,
    favtemplate: `
        <a :href="'recipeDetail.html?id=' + r.recipeId" class="col-sm-6 col-md-4 col-lg-3 container-listing" v-for="r in recipeData" >
            <!-- <div class="recipe-img" :style="{ backgroundImage: 'url(' + (r.image ? r.image : r.image2) + ')' }"> -->
            <div class="recipe-img">
                <img :src="(r.image ? r.image : r.image2)" class="img-fluid" />
                <div v-if="select">
                    <!-- not selected -->
                    <svg v-if="this.selectedListings.indexOf(r.recipeId) <= -1" @click.prevent="toggleSelect(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_285_1392)">
                        <path d="M19.4997 4.5H6.49967C5.30801 4.5 4.33301 5.5125 4.33301 6.75V20.25C4.33301 21.4875 5.30801 22.5 6.49967 22.5H19.4997C20.6913 22.5 21.6663 21.4875 21.6663 20.25V6.75C21.6663 5.5125 20.6913 4.5 19.4997 4.5ZM19.4997 20.25H6.49967V6.75H19.4997V20.25Z" fill="#DE352A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_285_1392">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                    <!-- selected -->
                    <svg v-else @click.prevent="toggleSelect(r.recipeId)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_278_1385)">
                        <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#DE352A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_278_1385">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                </div>

                <div v-else>
                    <!-- favourited -->
                    <svg v-if="r.fav == 1" @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <g clip-path="url(#clip0_278_1363)">
                        <path d="M16.0003 28.4667L14.067 26.7067C7.20033 20.48 2.66699 16.3733 2.66699 11.3333C2.66699 7.22667 5.89366 4 10.0003 4C12.3203 4 14.547 5.08 16.0003 6.78667C17.4537 5.08 19.6803 4 22.0003 4C26.107 4 29.3337 7.22667 29.3337 11.3333C29.3337 16.3733 24.8003 20.48 17.9337 26.72L16.0003 28.4667Z" fill="#DE352A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_278_1363">
                        <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>

                    <!-- not favourited -->
                    <svg v-else @click.prevent="changeColor(r)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <g clip-path="url(#clip0_278_1357)">
                            <path d="M22.0003 4C19.6803 4 17.4537 5.08 16.0003 6.78667C14.547 5.08 12.3203 4 10.0003 4C5.89366 4 2.66699 7.22667 2.66699 11.3333C2.66699 16.3733 7.20033 20.48 14.067 26.72L16.0003 28.4667L17.9337 26.7067C24.8003 20.48 29.3337 16.3733 29.3337 11.3333C29.3337 7.22667 26.107 4 22.0003 4ZM16.1337 24.7333L16.0003 24.8667L15.867 24.7333C9.52033 18.9867 5.33366 15.1867 5.33366 11.3333C5.33366 8.66667 7.33366 6.66667 10.0003 6.66667C12.0537 6.66667 14.0537 7.98667 14.7603 9.81333H17.2537C17.947 7.98667 19.947 6.66667 22.0003 6.66667C24.667 6.66667 26.667 8.66667 26.667 11.3333C26.667 15.1867 22.4803 18.9867 16.1337 24.7333Z" fill="#DE352A"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_278_1357">
                            <rect width="32" height="32" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
            <div class="listing-subdesc">
                <div class="subdesc">
                    <img src="../img/prepTime.png" width="22" />
                    <span class="p-14">{{(r.readyInMinutes===-1 ? "Unknown" : r.readyInMinutes)}} Minutes</span>
                </div>
                <div class="subdesc">
                    <img src="../img/serving.png" width="24" />
                    <!-- <span class="p-14">{{ r.dishtypes && r.dishtypes.length > 0 ? r.dishtypes[0] : 'Snack' }}</span> -->
                    <span class="p-14">{{ r.servings }} People</span>
                </div>
                </div>
                <h6>{{r.title}} {{ r.ind }}</h6>
            
        </a>
    `,
    templatetwo:`
        <a :href="'recipeDetail.html?id=' + r.recipeId" class="col-sm-6 col-xl-3 top-recipe" v-for="r in recipeData">
            <div class="img" :style="{ backgroundImage: \`url(\${r.image})\` }"></div>
            <h5>{{r.title}}</h5>
            <p>{{r.summary}}...</p>
        </a>
    `,
    single: `
        <div class="container-listing" >
            <div class="recipe-img" :style="{ backgroundImage: 'url(' + random.image + ')' }">

            </div>
            <div class="listing-subdesc">
                <div class="subdesc">
                    <img src="../img/prepTime.png" width="22" />
                    <span class="p-14">{{random.readyInMinutes}} Minutes</span>
                </div>
                <div class="subdesc">
                    <img src="../img/serving.png" width="24" />
                    <!-- <span class="p-14">{{ random.dishtypes && random.dishtypes.length > 0 ? random.dishtypes[0] : 'Snack' }}</span> -->
                    <span class="p-14">{{ random.servings }} People</span>
                </div>
            </div>
            <h6>{{random.title}} {{ random.ind }}</h6>
        </div>
    `,
    methods: {
        changeColor(recipe) {
            console.log(recipe)
            recipe.fav = recipe.fav === 0 ? 1 : 0;
            if (recipe.fav === 1){
                axios.post(`https://leaptron2.dscloud.me:3000/api/user/${userId}/recipe/${recipe.recipeId}`, null, {headers})
                .then(response => {
                    console.log("success")
                }).catch( error => {

                });
            } else {
                axios.delete(`https://leaptron2.dscloud.me:3000/api/user/${userId}/recipe/`, 
                {
                    headers, 
                    data: {
                        recipeIds: recipe.recipeId.toString()
                    }
                })
                .then(response => {
                    console.log("success")
                }).catch( error => {

                });
            }
        }
    }
};
   
